import React, { CSSProperties } from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

// Timeline constants
const ADI_APPEAR = 45;
const ADI_APPEAR_END = 75;
const ADI_SQUASH_START = 75;
const ADI_SQUASH_END = 105;
const TECHIE_DROP_START = 105;
const TECHIE_DROP_END = 135;
const TECHIE_PUSH_START = 135;
const TECHIE_PUSH_END = 165;
const TRANSITION_START = 165;
const TRANSITION_END = 180;

interface AnimatedTextProps {
    text: string;
    type: 'adi' | 'techie';
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, type }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Base pixel-art text style
    const baseStyle: CSSProperties = {
        fontFamily: '"Press Start 2P", "Courier New", monospace',
        fontSize: type === 'adi' ? 80 : 80,
        fontWeight: 'bold',
        color: type === 'adi' ? '#00ff88' : '#ff6b9d',
        textShadow: `
      0 0 10px ${type === 'adi' ? '#00ff88' : '#ff6b9d'},
      0 0 20px ${type === 'adi' ? '#00ff8844' : '#ff6b9d44'}
    `,
        letterSpacing: '4px',
        imageRendering: 'pixelated',
        WebkitFontSmoothing: 'none',
    };

    if (type === 'adi') {
        // Scene 2 (45-75): "Adi" appears with spring pop-in
        const appearProgress = spring({
            frame: frame - ADI_APPEAR,
            fps,
            config: {
                damping: 12,
                stiffness: 200,
                mass: 0.5,
            },
        });

        const scale = frame < ADI_APPEAR ? 0 : appearProgress;

        // Scene 3 (75-105): Squash when character lands on it
        const squashProgress = interpolate(
            frame,
            [ADI_SQUASH_START, ADI_SQUASH_START + 5, ADI_SQUASH_END],
            [0, 1, 0],
            {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
            }
        );

        const squashScaleY = 1 - squashProgress * 0.2;
        const squashScaleX = 1 + squashProgress * 0.15;

        // Screen shake on impact
        const shakeX = frame >= ADI_SQUASH_START && frame <= ADI_SQUASH_START + 3
            ? (Math.random() - 0.5) * 10
            : 0;

        const shakeY = frame >= ADI_SQUASH_START && frame <= ADI_SQUASH_START + 3
            ? (Math.random() - 0.5) * 10
            : 0;

        // Transition to final position (165-180)
        const transitionProgress = interpolate(
            frame,
            [TRANSITION_START, TRANSITION_END],
            [0, 1],
            {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
            }
        );

        const finalY = interpolate(transitionProgress, [0, 1], [50, 40]);
        const finalX = interpolate(transitionProgress, [0, 1], [0, 80]);
        const finalOpacity = interpolate(transitionProgress, [0, 0.5], [1, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
        });

        return (
            <div
                style={{
                    position: 'absolute',
                    left: '50%',
                    top: frame < TRANSITION_START ? `calc(50% + 50px)` : `calc(50% + ${finalY}px)`,
                    transform: `
            translate(calc(-50% + ${shakeX + finalX}px), calc(-50% + ${shakeY}px))
            scale(${scale * squashScaleX}, ${scale * squashScaleY})
          `,
                    opacity: frame < TRANSITION_START ? 1 : finalOpacity,
                    ...baseStyle,
                }}
            >
                {text}
            </div>
        );
    } else {
        // "Techie" animations
        // Scene 4 (105-135): Drop from top with gravity
        const dropDuration = TECHIE_DROP_END - TECHIE_DROP_START;
        const dropProgress = interpolate(
            frame,
            [TECHIE_DROP_START, TECHIE_DROP_END],
            [0, 1],
            {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
            }
        );

        // Gravity acceleration (quadratic ease-in)
        const gravity = dropProgress * dropProgress;
        const dropY = interpolate(gravity, [0, 1], [-300, -50]);

        // Small bounce on landing
        const bounceProgress = interpolate(
            frame,
            [TECHIE_DROP_END, TECHIE_DROP_END + 10],
            [0, 1],
            {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
            }
        );
        const bounce = Math.sin(bounceProgress * Math.PI) * 10;

        // Scene 5 (135-165): Push upward by character
        const pushProgress = spring({
            frame: frame - TECHIE_PUSH_START,
            fps,
            config: {
                damping: 15,
                stiffness: 100,
                mass: 1,
            },
        });

        const pushY = frame < TECHIE_PUSH_START
            ? dropY - bounce
            : interpolate(pushProgress, [0, 1], [-50, -100], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
            });

        // Transition to final position (165-180): Merge into "Techie Adi"
        const transitionProgress = interpolate(
            frame,
            [TRANSITION_START, TRANSITION_END],
            [0, 1],
            {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
            }
        );

        const finalY = interpolate(transitionProgress, [0, 1], [-100, 0]);
        const finalX = interpolate(transitionProgress, [0, 1], [0, -30]);
        const finalOpacity = interpolate(transitionProgress, [0, 0.5], [1, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
        });

        const currentY = frame < TRANSITION_START ? pushY : finalY;
        const currentOpacity = frame < TECHIE_DROP_START
            ? 0
            : frame < TRANSITION_START
                ? 1
                : finalOpacity;

        return (
            <div
                style={{
                    position: 'absolute',
                    left: '50%',
                    top: `calc(50% + ${currentY}px)`,
                    transform: `translate(calc(-50% + ${finalX}px), -50%)`,
                    opacity: currentOpacity,
                    ...baseStyle,
                }}
            >
                {text}
            </div>
        );
    }
};
