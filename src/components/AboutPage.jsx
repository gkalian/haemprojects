// Import required dependencies
import React, { useEffect } from 'react';
import { Dialog, IconButton, Container, Grid, Typography, Box, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import config from '../resources/config.json';
import '../styles/aboutPage.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faPatreon, faPaypal } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

/**
 * About component props:
 * @param {boolean} open - Controls dialog visibility
 * @param {function} onClose - Handler for closing the dialog
 */
const About = ({ open, onClose }) => {
  useEffect(() => {
    if (!open) {
      document.activeElement?.blur();
    }
  }, [open]);

  return (
    <Dialog fullScreen open={open} onClose={onClose} className="about-dialog">
      <IconButton onClick={onClose} aria-label="close" className="close-button">
        <CloseIcon />
      </IconButton>

      <Container maxWidth="lg" className="about-content-container">
        <Typography
          variant="h5"
          align="center"
          sx={{
            maxWidth: '800px',
            lineHeight: 1.8,
            marginBottom: 2
          }}
        >
          <span>{config.aboutOne}</span>
        </Typography>

        <Typography
          variant="h5"
          align="center"
          sx={{
            maxWidth: '800px',
            lineHeight: 1.8,
            marginBottom: 4
          }}
        >
          <span>{config.aboutTwo}</span>
        </Typography>

        <Divider className="about-divider" />

        <Grid container spacing={4} className="about-grid-container">
          <Grid item xs={12} md={4} className="about-grid-item">
            <Typography variant="h4" gutterBottom align="center">
              Contact Us
            </Typography>
            <Box className="about-icon-container">
              <a href={`mailto:${config.teamMail}`} target="_blank" rel="noopener noreferrer" className="about-link">
                <FontAwesomeIcon icon={faEnvelope} title="Send us email" />
              </a>
            </Box>
          </Grid>

          <Grid item xs={12} md={4} className="about-grid-item">
            <Typography variant="h4" gutterBottom align="center">
              Join Us
            </Typography>
            <Box className="about-icon-container">
              <a href={config.discordLink} target="_blank" rel="noopener noreferrer" className="about-link">
                <FontAwesomeIcon icon={faDiscord} title="Join us in Discord" />
              </a>
            </Box>
          </Grid>

          <Grid item xs={12} md={4} className="about-grid-item">
            <Typography variant="h4" gutterBottom align="center">
              Support Us
            </Typography>
              <Box className="about-icon-container">
              <a href={config.patreon} target="_blank" rel="noopener noreferrer" className="about-link">
                <FontAwesomeIcon icon={faPatreon} title="Support us on Patreon" />
              </a>
              <a href={`mailto:${config.teamMail}`} target="_blank" rel="noopener noreferrer" className="about-link">
                <FontAwesomeIcon icon={faPaypal} title="Support us with Paypal" />
              </a>
            </Box>
          </Grid>
        </Grid>

        <Divider className="about-divider" />

        <Typography variant="subtitle1" align="center" className="final-text">
          <span>{config.khajiit}</span>
        </Typography>

      </Container>
    </Dialog>
  );
};

export default About;
