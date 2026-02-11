import React, { CSSProperties } from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { CleanText } from './CleanText';
import { AccentLine, AccentDot, CornerAccents } from './AccentElements';

// Frame constants for timeline
const SCENE_1_START = 10;
const SCENE_1_END = 60;

const SCENE_2_START = 65;
const SCENE_2_END = 120;

const SCENE_3_START = 130;
const SCENE_3_END = 180;

const SCENE_4_ADI_START = 185;
const SCENE_4_ADI_END = 210;
const SCENE_4_TRANSFORM_START = 210;
const SCENE_4_TRANSFORM_END = 240;

const SCENE_5_START = 240;
const SCENE_5_END = 300;

// Google color palette
const GOOGLE_BLUE = '#4285f4';
const GOOGLE_RED = '#ea4335';
const GOOGLE_YELLOW = '#fbbc04';
const GOOGLE_GREEN = '#34a853';
const GOOGLE_GREY_DARK = '#202124';
const GOOGLE_GREY_MEDIUM = '#5f6368';

export const GoogleIOIntro: React.FC = () => {
    const frame = useCurrentFrame();

    // Background gradient
    const bgStyle: CSSProperties = {
        background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 50%, #f1f3f4 100%)',
        width: '100%',
        height: '100%',
    };

    // Scene 4: Name transformation logic
    const renderNameScene = () => {
        if (frame < SCENE_4_ADI_START || frame > SCENE_4_TRANSFORM_END) {
            return null;
        }

        // Phase 1: "ADI" solo (185-210)
        if (frame < SCENE_4_TRANSFORM_START) {
            return (
                <CleanText
                    text="ADI"
                    startFrame={SCENE_4_ADI_START}
                    endFrame={SCENE_4_ADI_END}
                    fadeInDuration={15}
                    fadeOutDuration={0}
                    fontSize={72}
                    fontWeight={700}
                    color={GOOGLE_GREY_DARK}
                    letterSpacing="2px"
                    scaleIn={true}
                    scaleFrom={0.95}
                />
            );
        }

        // Phase 2: Transform to "TECHIE ADI" (210-240)
        const transformProgress = interpolate(
            frame,
            [SCENE_4_TRANSFORM_START, SCENE_4_TRANSFORM_END],
            [0, 1],
            {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                easing: (t) => {
                    // Material Design easing
                    return 1 - Math.pow(1 - t, 3);
                },
            }
        );

        // "ADI" moves right and scales slightly smaller
        const adiX = interpolate(transformProgress, [0, 1], [0, 80]);
        const adiOpacity = interpolate(transformProgress, [0, 0.3, 1], [1, 0.7, 1]);

        // "TECHIE" fades in from left
        const techieX = interpolate(transformProgress, [0, 1], [-120, -80]);
        const techieOpacity = interpolate(transformProgress, [0, 0.3, 1], [0, 0.5, 1]);

        return (
            <>
                {/* "TECHIE" */}
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: `translate(-50%, -50%) translateX(${techieX}px)`,
                        fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
                        fontSize: 64,
                        fontWeight: 700,
                        color: GOOGLE_GREY_DARK,
                        letterSpacing: '2px',
                        opacity: techieOpacity,
                    }}
                >
                    TECHIE
                </div>

                {/* "ADI" */}
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: `translate(-50%, -50%) translateX(${adiX}px)`,
                        fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
                        fontSize: 64,
                        fontWeight: 700,
                        color: GOOGLE_GREY_DARK,
                        letterSpacing: '2px',
                        opacity: adiOpacity,
                    }}
                >
                    ADI
                </div>
            </>
        );
    };

    // Scene 5: Final frame with settle animation
    const renderFinalScene = () => {
        if (frame < SCENE_5_START) {
            return null;
        }

        const relativeFrame = frame - SCENE_5_START;

        // Subtle settle scale
        const settleScale = interpolate(
            relativeFrame,
            [0, 20, 30],
            [1.02, 1.0, 1.0],
            {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                easing: (t) => 1 - Math.pow(1 - t, 3),
            }
        );

        return (
            <>
                {/* Main name */}
                <div
                    style={{
                        position: 'absolute',
                        top: '45%',
                        left: '50%',
                        transform: `translate(-50%, -50%) scale(${settleScale})`,
                        fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
                        fontSize: 64,
                        fontWeight: 700,
                        color: GOOGLE_GREY_DARK,
                        letterSpacing: '2px',
                    }}
                >
                    TECHIE ADI
                </div>

                {/* Subtitle */}
                <CleanText
                    text="AI • Systems • Engineering"
                    startFrame={SCENE_5_START + 5}
                    endFrame={SCENE_5_END}
                    fadeInDuration={15}
                    fadeOutDuration={10}
                    fontSize={20}
                    fontWeight={400}
                    color={GOOGLE_GREY_MEDIUM}
                    letterSpacing="1px"
                    top="calc(45% + 50px)"
                />

                {/* Corner accents */}
                <CornerAccents
                    startFrame={SCENE_5_START + 10}
                    endFrame={SCENE_5_END}
                    colors={[GOOGLE_BLUE, GOOGLE_RED, GOOGLE_YELLOW, GOOGLE_GREEN]}
                />
            </>
        );
    };

    return (
        <AbsoluteFill style={bgStyle}>
            {/* Scene 1: Opening statement */}
            <CleanText
                text="Building Intelligent Systems"
                startFrame={SCENE_1_START}
                endFrame={SCENE_1_END}
                fadeInDuration={20}
                fadeOutDuration={10}
                slideFrom="bottom"
                slideDistance={15}
                fontSize={48}
                fontWeight={300}
                color={GOOGLE_GREY_MEDIUM}
                letterSpacing="0.5px"
            />

            {/* Scene 2: Domain introduction */}
            {/* Accent line */}
            <AccentLine
                startFrame={SCENE_2_START}
                endFrame={SCENE_2_END}
                color={GOOGLE_BLUE}
                orientation="vertical"
                maxSize={140}
                position={{ top: 'calc(50% - 70px)', left: 'calc(40% - 90px)' }}
            />

            {/* Domain 1 */}
            <CleanText
                text="Artificial Intelligence"
                startFrame={SCENE_2_START}
                endFrame={SCENE_2_END}
                fadeInDuration={15}
                fadeOutDuration={10}
                slideFrom="left"
                fontSize={36}
                fontWeight={400}
                color={GOOGLE_GREY_DARK}
                letterSpacing="0.25px"
                lineHeight={1.5}
                textAlign="left"
                top="calc(50% - 60px)"
                left="40%"
            />

            {/* Domain 2 */}
            <CleanText
                text="Systems Engineering"
                startFrame={SCENE_2_START + 15}
                endFrame={SCENE_2_END}
                fadeInDuration={15}
                fadeOutDuration={10}
                slideFrom="left"
                fontSize={36}
                fontWeight={400}
                color={GOOGLE_GREY_DARK}
                letterSpacing="0.25px"
                lineHeight={1.5}
                textAlign="left"
                top="50%"
                left="40%"
            />

            {/* Domain 3 */}
            <CleanText
                text="Computer Science"
                startFrame={SCENE_2_START + 30}
                endFrame={SCENE_2_END}
                fadeInDuration={15}
                fadeOutDuration={10}
                slideFrom="left"
                fontSize={36}
                fontWeight={400}
                color={GOOGLE_GREY_DARK}
                letterSpacing="0.25px"
                lineHeight={1.5}
                textAlign="left"
                top="calc(50% + 60px)"
                left="40%"
            />

            {/* Scene 3: Mission statement */}
            <CleanText
                text={`I build intelligent systems\nthat interact with the real world`}
                startFrame={SCENE_3_START}
                endFrame={SCENE_3_END}
                fadeInDuration={20}
                fadeOutDuration={10}
                fontSize={32}
                fontWeight={500}
                color={GOOGLE_GREY_MEDIUM}
                letterSpacing="0.3px"
                lineHeight={1.6}
                top="45%"
                scaleIn={true}
            />

            {/* Accent dot below mission */}
            <AccentDot
                startFrame={SCENE_3_START}
                endFrame={SCENE_3_END}
                color={GOOGLE_GREEN}
                size={8}
                position={{ top: 'calc(45% + 70px)', left: '50%' }}
                opacity={0.6}
            />

            {/* Scene 4: Name reveal */}
            {renderNameScene()}

            {/* Scene 5: Final frame */}
            {renderFinalScene()}
        </AbsoluteFill>
    );
};
