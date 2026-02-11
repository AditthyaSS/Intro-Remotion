import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { staticFile } from 'remotion';

// Timeline constants
const HOP_END = 45;
const JUMP_START = 75;
const JUMP_END = 105;
const PUSH_START = 135;
const PUSH_END = 165;
const VICTORY_START = 165;

interface PixelCharacterProps {
  scale?: number;
}

export const PixelCharacter: React.FC<PixelCharacterProps> = ({ scale = 1 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scene 1 (0-45): Hop from left to center
  const hopProgress = Math.min(frame / HOP_END, 1);
  const hopX = interpolate(
    frame,
    [0, HOP_END],
    [-200, 400], // From off-screen left to left-center
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // Pixel-style bounce using sine wave (not smooth spring)
  const hopBounceY = Math.sin(hopProgress * Math.PI * 4) * 30 * (1 - hopProgress);

  // Scene 3 (75-105): Jump up and land on "Adi"
  const jumpProgress = interpolate(
    frame,
    [JUMP_START, JUMP_END],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  const jumpY = interpolate(
    jumpProgress,
    [0, 0.5, 1],
    [0, -180, 0], // Jump up and come back down
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // Squash and stretch during jump
  const jumpSquash = jumpProgress < 0.5
    ? 1 + jumpProgress * 0.3
    : 1 + (1 - jumpProgress) * 0.3;

  const jumpStretch = jumpProgress < 0.5
    ? 1 - jumpProgress * 0.2
    : 1 - (1 - jumpProgress) * 0.2;

  // Scene 5 (135-165): Move to push "Techie"
  const pushX = interpolate(
    frame,
    [PUSH_START, PUSH_END],
    [400, 600],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // Scene 6 (165-180): Victory hop
  const victoryProgress = interpolate(
    frame,
    [VICTORY_START, 180],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  const victoryBounce = Math.sin(victoryProgress * Math.PI * 2) * 20 * (1 - victoryProgress);

  // Determine final position based on timeline
  let finalX = hopX;
  let finalY = hopBounceY;
  let scaleX = scale;
  let scaleY = scale;

  if (frame >= VICTORY_START) {
    finalX = pushX;
    finalY = victoryBounce - 50; // Move down for final position
  } else if (frame >= PUSH_START) {
    finalX = pushX;
    finalY = 0;
  } else if (frame >= JUMP_START) {
    finalX = hopX;
    finalY = jumpY;
    scaleX = scale * jumpSquash;
    scaleY = scale * jumpStretch;
  }

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
      <div
        style={{
          position: 'absolute',
          left: finalX,
          top: `calc(50% + ${finalY}px)`,
          transform: `translate(-50%, -50%) scaleX(${scaleX}) scaleY(${scaleY})`,
          width: 120,
          height: 120,
          imageRendering: 'pixelated', // Pixel-perfect rendering
        }}
      >
        <img
          src={staticFile('Assets/character.gif')}
          alt="Pixel Character"
          style={{
            width: '100%',
            height: '100%',
            imageRendering: 'pixelated',
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
