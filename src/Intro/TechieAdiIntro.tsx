import React, { CSSProperties } from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { PixelCharacter } from './PixelCharacter';
import { AnimatedText } from './AnimatedText';

// Timeline constants
const TRANSITION_START = 165;
const TRANSITION_END = 180;

export const TechieAdiIntro: React.FC = () => {
    const frame = useCurrentFrame();

    // Final scene (165-180): Combined "Techie Adi" text
    const finalTextProgress = interpolate(
        frame,
        [TRANSITION_START, TRANSITION_START + 5, TRANSITION_END],
        [0, 1, 1],
        {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
        }
    );

    const finalTextOpacity = interpolate(
        finalTextProgress,
        [0, 0.3, 1],
        [0, 1, 1],
        {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
        }
    );

    const finalTextScale = interpolate(
        finalTextProgress,
        [0, 0.5, 1],
        [0.8, 1.1, 1],
        {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
        }
    );

    // Glow effect
    const glowIntensity = interpolate(
        finalTextProgress,
        [0, 0.5, 1],
        [0, 20, 10],
        {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
        }
    );

    const finalTextStyle: CSSProperties = {
        fontFamily: '"Press Start 2P", "Courier New", monospace',
        fontSize: 90,
        fontWeight: 'bold',
        background: 'linear-gradient(135deg, #00ff88, #ff6b9d)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        letterSpacing: '6px',
        textShadow: `
      0 0 ${glowIntensity}px rgba(0, 255, 136, 0.5),
      0 0 ${glowIntensity * 2}px rgba(255, 107, 157, 0.5)
    `,
        imageRendering: 'pixelated',
        WebkitFontSmoothing: 'none',
    };

    // Background gradient
    const bgStyle: CSSProperties = {
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
        width: '100%',
        height: '100%',
    };

    return (
        <AbsoluteFill style={bgStyle}>
            {/* Animated grid background for tech theme */}
            <div
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backgroundImage: `
            linear-gradient(rgba(100, 255, 218, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(100, 255, 218, 0.1) 1px, transparent 1px)
          `,
                    backgroundSize: '50px 50px',
                    opacity: 0.3,
                }}
            />

            {/* Main content container */}
            <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
                {/* Animated text elements */}
                <AnimatedText text="Adi" type="adi" />
                <AnimatedText text="Techie" type="techie" />

                {/* Final combined text */}
                {frame >= TRANSITION_START && (
                    <div
                        style={{
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            transform: `translate(-50%, -50%) scale(${finalTextScale})`,
                            opacity: finalTextOpacity,
                            ...finalTextStyle,
                        }}
                    >
                        Techie Adi
                    </div>
                )}

                {/* Pixel character */}
                <PixelCharacter scale={1} />
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
