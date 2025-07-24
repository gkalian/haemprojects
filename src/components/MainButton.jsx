import React from 'react';
import Button from '@mui/material/Button';

/**
 * Reusable button component for main navigation
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Button content
 * @param {Function} props.onClick - Click handler
 * @param {Object} [props.sx] - Additional styles
 */
const MainButton = ({ children, onClick, sx = {} }) => (
  <Button
    onClick={onClick}
    sx={{
      color: 'rgb(197 197 197 / 80%)',
      textTransform: 'uppercase',
      padding: '16px 40px',
      fontWeight: 600,
      fontFamily: 'inherit',
      fontSize: '1.5rem',
      backgroundColor: '#0000002e',
      border: '1px solid rgba(0, 0, 0, 0.8)',
      borderRadius: '3rem',
      transition: 'all 0.3s',
      cursor: 'pointer',
      boxShadow: '0 0 10px rgba(255, 255, 255, 0.2)',
      '&:hover': {
        color: '#fff',
        boxShadow: '0 0 20px rgba(255, 255, 255, 0.4)',
        textShadow: '0 0 8px rgba(255, 255, 255, 0.4)',
        border: '1px solid #333',
        backgroundColor: '#0000002e',
      },
      '&:focus': {
        outline: 'none',
        color: 'rgb(197 197 197 / 80%)',
        boxShadow: '0 0 10px rgba(255, 255, 255, 0.2)',
        border: '1px solid rgba(0, 0, 0, 0.8)',
        textShadow: 'none',
      },
      '&:focus:not(:hover)': {
        color: 'rgb(197 197 197 / 80%)',
        boxShadow: '0 0 10px rgba(255, 255, 255, 0.2)',
        border: '1px solid rgba(0, 0, 0, 0.8)',
        textShadow: 'none',
      },
      ...sx,
    }}
  >
    {children}
  </Button>
);

export default MainButton;
