import React, { useEffect } from 'react';
import { Dialog, IconButton, Container, Grid, Typography, Link, Box, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import config from '../resources/config.json';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faPatreon, faPaypal } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const StyledDialog = styled(Dialog)({
  '& .MuiPaper-root': {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    boxShadow: 'none',
  }
});

const CloseButton = styled(IconButton)({
  position: 'absolute',
  right: '16px',
  top: '16px',
  color: 'white',
  zIndex: 1000,
  '&:hover': {
    color: 'rgba(255, 255, 255, 0.8)',
  },
});

const ContentContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  color: 'white',
  marginTop: '128px',
  height: '100vh',
});

const StyledDivider = styled(Divider)({
  width: '60%',
  margin: '48px auto',
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
});

const IconContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  gap: '16px',
  marginTop: '24px',
  '& .MuiSvgIcon-root, & svg': {
    fontSize: '2rem',
    width: '2rem',
    height: '2rem',
    cursor: 'pointer',
    transition: 'color 0.3s ease',
    '&:hover': {
      color: 'rgba(255, 255, 255, 0.7)',
    }
  }
});

const GridItem = styled(Grid)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

const StyledLink = styled('a')({
  color: 'inherit',
  textDecoration: 'none',
  cursor: 'pointer',
});

const About = ({ open, onClose }) => {
  useEffect(() => {
    if (!open) {
      document.activeElement?.blur();
    }
  }, [open]);

  return (
    <StyledDialog fullScreen open={open} onClose={onClose}>
      <CloseButton onClick={onClose} aria-label="close">
        <CloseIcon />
      </CloseButton>

      <ContentContainer maxWidth="lg">
        <Typography
          variant="h5"
          align="center"
          sx={{
            maxWidth: '800px',
            lineHeight: 1.8,
            marginBottom: 4
          }}
        >
          <span>{config.aboutOne}</span>
          <br /><br />
          <span>{config.aboutTwo}</span>
        </Typography>

        <StyledDivider />

        <Grid container spacing={4}>
          <GridItem item xs={12} md={4}>
            <Typography variant="h4" gutterBottom align="center">
              Contact Us
            </Typography>
            <IconContainer>
            <StyledLink href={`mailto:${config.teamMail}`} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faEnvelope} title="Send us email" />
            </StyledLink>
            </IconContainer>
          </GridItem>

          <GridItem item xs={12} md={4}>
            <Typography variant="h4" gutterBottom align="center">
              Join Us
            </Typography>
            <IconContainer>
            <StyledLink href={config.discordLink} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faDiscord} title="Join us in Discord" />
            </StyledLink>
            </IconContainer>
          </GridItem>

          <GridItem item xs={12} md={4}>
            <Typography variant="h4" gutterBottom align="center">
              Support Us
            </Typography>
            <IconContainer>
            <StyledLink href={config.patreon} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faPatreon} title="Support us on Patreon" />
            </StyledLink>
            <StyledLink href={`mailto:${config.teamMail}`} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faPaypal} title="Support us with Paypal" />
            </StyledLink>
            </IconContainer>
          </GridItem>
        </Grid>

        <StyledDivider />

        <Typography
          variant="subtitle1"
          align="center"
        >
          <span>{config.khajiit}</span>

        </Typography>

      </ContentContainer>
    </StyledDialog>
  );
};

export default About;
