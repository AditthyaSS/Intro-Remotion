import React, { CSSProperties } from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

export interface CleanTextProps {
    text: string;
    startFrame: number;
    endFrame: number;
    fadeInDuration?: number;
    fadeOutDuration?: number;
    slideFrom?: 'left' | 'right' | 'top' | 'bottom' | 'none';
    slideDistance?: number;
    fontSize: number;
    fontWeight: 300 | 400 | 500 | 700;
    color: string;
    letterSpacing?: string;
    lineHeight?: number;
    textAlign?: 'left' | 'center' | 'right';
    top?: string | number;
    left?: string | number;
    scaleIn?: boolean;
    scaleFrom?: number;
}

export const CleanText: React.FC<CleanTextProps> = ({
    text,
    startFrame,
    endFrame,
    fadeInDuration = 20,
    fadeOutDuration = 10,
    slideFrom = 'none',
    slideDistance = 30,
    fontSize,
    fontWeight,
    color,
    letterSpacing = '0.5px',
    lineHeight = 1.4,
    textAlign = 'center',
    top = '50%',
    left = '50%',
    scaleIn = false,
    scaleFrom = 0.98,
}) => {
    const frame = useCurrentFrame();

    // Visibility check
    if (frame < startFrame || frame > endFrame) {
        return null;
    }

    const relativeFrame = frame - startFrame;
    const totalDuration = endFrame - startFrame;

    // Ensure fade durations don't overlap (must be strictly monotonically increasing)
    const safeFadeInDuration = Math.max(1, Math.min(fadeInDuration, Math.floor(totalDuration * 0.4)));
    const safeFadeOutDuration = Math.max(1, Math.min(fadeOutDuration, Math.floor(totalDuration * 0.4)));

    // Calculate safe fade end/start points
    const fadeInEnd = safeFadeInDuration;
    const fadeOutStart = Math.min(
        totalDuration - 1,  // Must be strictly less than totalDuration
        Math.max(fadeInEnd + 1, totalDuration - safeFadeOutDuration)  // Must be greater than fadeInEnd
    );

    // Fade in
    const opacity = interpolate(
        relativeFrame,
        [0, fadeInEnd, fadeOutStart, totalDuration],
        [0, 1, 1, 0],
        {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: (t) => {
                // Ease-out: cubic-bezier(0.0, 0.0, 0.2, 1)
                return 1 - Math.pow(1 - t, 3);
            },
        }
    );

    // Slide animation
    let translateX = 0;
    let translateY = 0;

    if (slideFrom !== 'none' && relativeFrame < safeFadeInDuration) {
        const slideProgress = interpolate(
            relativeFrame,
            [0, safeFadeInDuration],
            [1, 0],
            {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                easing: (t) => {
                    // Material Design easing: cubic-bezier(0.4, 0.0, 0.2, 1)
                    return 1 - Math.pow(1 - t, 3);
                },
            }
        );

        switch (slideFrom) {
            case 'left':
                translateX = -slideDistance * slideProgress;
                break;
            case 'right':
                translateX = slideDistance * slideProgress;
                break;
            case 'top':
                translateY = -slideDistance * slideProgress;
                break;
            case 'bottom':
                translateY = slideDistance * slideProgress;
                break;
        }
    }

    // Scale animation
    const scale = scaleIn
        ? interpolate(
            relativeFrame,
            [0, safeFadeInDuration],
            [scaleFrom, 1],
            {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                easing: (t) => 1 - Math.pow(1 - t, 3),
            }
        )
        : 1;

    const textStyle: CSSProperties = {
        position: 'absolute',
        top,
        left,
        transform: `translate(-50%, -50%) translate(${translateX}px, ${translateY}px) scale(${scale})`,
        fontFamily: "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        fontSize,
        fontWeight,
        color,
        letterSpacing,
        lineHeight,
        textAlign,
        opacity,
        margin: 0,
        padding: 0,
        whiteSpace: 'pre-line',
    };

    return <div style={textStyle}>{text}</div>;
};
