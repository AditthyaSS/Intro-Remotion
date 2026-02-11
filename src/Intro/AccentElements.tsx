import React, { CSSProperties } from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

interface AccentLineProps {
    startFrame: number;
    endFrame: number;
    color: string;
    orientation: 'vertical' | 'horizontal';
    maxSize: number;
    thickness?: number;
    position: { top?: string | number; left?: string | number; right?: string | number; bottom?: string | number };
}

export const AccentLine: React.FC<AccentLineProps> = ({
    startFrame,
    endFrame,
    color,
    orientation,
    maxSize,
    thickness = 2,
    position,
}) => {
    const frame = useCurrentFrame();

    if (frame < startFrame || frame > endFrame) {
        return null;
    }

    const relativeFrame = frame - startFrame;
    const growDuration = 20;

    const size = interpolate(
        relativeFrame,
        [0, growDuration],
        [0, maxSize],
        {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
        }
    );

    const opacity = interpolate(
        relativeFrame,
        [0, 10, endFrame - startFrame - 10, endFrame - startFrame],
        [0, 1, 1, 0],
        {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
        }
    );

    const style: CSSProperties = {
        position: 'absolute',
        backgroundColor: color,
        borderRadius: 3,
        opacity,
        ...position,
        ...(orientation === 'vertical'
            ? { width: thickness, height: size }
            : { height: thickness, width: size }),
    };

    return <div style={style} />;
};

interface AccentDotProps {
    startFrame: number;
    endFrame: number;
    color: string;
    size: number;
    position: { top?: string | number; left?: string | number };
    opacity?: number;
}

export const AccentDot: React.FC<AccentDotProps> = ({
    startFrame,
    endFrame,
    color,
    size,
    position,
    opacity: maxOpacity = 0.6,
}) => {
    const frame = useCurrentFrame();

    if (frame < startFrame || frame > endFrame) {
        return null;
    }

    const relativeFrame = frame - startFrame;
    const fadeDuration = 15;

    const opacity = interpolate(
        relativeFrame,
        [0, fadeDuration, endFrame - startFrame - fadeDuration, endFrame - startFrame],
        [0, maxOpacity, maxOpacity, 0],
        {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
        }
    );

    const scale = interpolate(
        relativeFrame,
        [0, fadeDuration],
        [0.5, 1],
        {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
        }
    );

    const style: CSSProperties = {
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: color,
        opacity,
        transform: `translate(-50%, -50%) scale(${scale})`,
        ...position,
    };

    return <div style={style} />;
};

interface CornerAccentProps {
    startFrame: number;
    endFrame: number;
    colors: string[];
}

export const CornerAccents: React.FC<CornerAccentProps> = ({
    startFrame,
    endFrame,
    colors,
}) => {
    const frame = useCurrentFrame();

    if (frame < startFrame || frame > endFrame) {
        return null;
    }

    const relativeFrame = frame - startFrame;
    const fadeDuration = 15;

    const opacity = interpolate(
        relativeFrame,
        [0, fadeDuration],
        [0, 0.4],
        {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
        }
    );

    const corners = [
        { top: 40, left: 40, color: colors[0] },
        { top: 40, right: 40, color: colors[1] },
        { bottom: 40, left: 40, color: colors[2] },
        { bottom: 40, right: 40, color: colors[3] },
    ];

    const accentStyle = (color: string, position: any): CSSProperties => ({
        position: 'absolute',
        width: 4,
        height: 20,
        borderRadius: 2,
        backgroundColor: color,
        opacity,
        ...position,
    });

    return (
        <>
            {corners.map((corner, index) => (
                <div key={index} style={accentStyle(corner.color, corner)} />
            ))}
        </>
    );
};
