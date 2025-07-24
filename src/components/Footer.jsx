// Import required dependencies
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import config from '../resources/config.json';

/**
 * Footer component that displays the team name and current year
  * @returns {JSX.Element} Footer component with copyright text
 */
const Footer = () => {
  const getCurrentYear = () => new Date().getFullYear();

  return (
    <Box
      className="footer"
      sx={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        padding: '8px',
        textAlign: 'center',
        fontFamily: 'inherit',
        color: 'rgba(57, 57, 57, 0.8)',
        transition: 'all 0.3s',
        '&:hover': {
          color: '#fff',
          textShadow: '0 0 8px rgba(255, 255, 255, 0.4)'
        }
      }}
    >
      <Typography
        variant="body2"
        component="span"
        sx={{
          fontFamily: 'inherit'
        }}
      >
        {config.teamName}, © {getCurrentYear()}
      </Typography>
    </Box>
  );
};

export default Footer;
