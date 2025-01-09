import React from 'react';
import { styled } from '@mui/material/styles';
import config from '../resources/config.json';

const StyledFooter = styled('footer')({
  position: 'fixed',
  bottom: 0,
  width: '100%',
  padding: '8px',
  textAlign: 'center',
  fontFamily: 'Roboto, Arial, sans-serif',
  color: 'rgb(57 57 57 / 80%)',
  transition: 'all 0.3s',
  '&:hover': {
    color: '#fff',
    textShadow: '0 0 8px rgba(255, 255, 255, 0.4)',
  },
});

const Footer = () => {
  const getCurrentYear = () => new Date().getFullYear();

  return (
    <StyledFooter>
      <span>
        {config.teamName}, © {getCurrentYear()}
      </span>
    </StyledFooter>
  );
};

export default Footer;
