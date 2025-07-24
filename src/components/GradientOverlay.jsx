import React from 'react';
import Box from '@mui/material/Box';

/**
 * GradientOverlay component that adds a radial gradient overlay
 * to create a visual effect on the background
 */
const GradientOverlay = () => (
  <Box className="gradient"
    sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'radial-gradient(circle, #315f316e 0%, transparent 70%)',
      backgroundSize: 'cover',
      pointerEvents: 'none',
      zIndex: 2,
    }}
  />
);

export default GradientOverlay;
