// Import required dependencies
import React, { useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import config from '../resources/config.json';
import '../styles/global.css';

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
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiPaper-root': {
          bgcolor: 'rgba(0, 0, 0, 0.9)',
          boxShadow: 'none',
          fontFamily: 'inherit'
        }
      }}
    >
      <Tooltip title="Close" arrow>
        <IconButton
          onClick={onClose}
          aria-label="close"
          sx={{
            position: 'absolute',
            right: '16px',
            top: '16px',
            color: 'white',
            zIndex: 1000,
            '&:hover': {
              color: 'rgba(255, 255, 255, 0.8)',
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </Tooltip>

      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: 'white',
          mt: '128px',
          height: '100vh',
          fontFamily: 'inherit'
        }}
      >
        <Typography
          variant="h5"
          align="center"
          sx={{
            maxWidth: '800px',
            lineHeight: 1.8,
            mb: 2
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
            mb: 4
          }}
        >
          <span>{config.aboutTwo}</span>
        </Typography>

        <Divider
          sx={{
            width: '60%',
            my: 6,
            bgcolor: 'rgba(255, 255, 255, 0.2)'
          }}
        />

        <Grid container spacing={4} sx={{ py: 5.5 }}>
          <Grid size={{ xs: 12, md:4 }} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h4" gutterBottom align="center">
              Contact Us
            </Typography>
            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 2,
              mt: 3,
              '& .MuiSvgIcon-root, & svg': {
                fontSize: '2rem',
                width: '2rem',
                height: '2rem',
                cursor: 'pointer',
                transition: 'color 0.3s ease',
                '&:hover': {
                  color: 'rgba(255, 255, 255, 0.7)'
                }
              }
            }}>
              <a href={`mailto:${config.teamMail}`} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}>
                <FontAwesomeIcon icon={faEnvelope} title="Send us email" />
              </a>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md:4 }} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h4" gutterBottom align="center">
              Join Us
            </Typography>
            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 2,
              mt: 3,
              '& .MuiSvgIcon-root, & svg': {
                fontSize: '2rem',
                width: '2rem',
                height: '2rem',
                cursor: 'pointer',
                transition: 'color 0.3s ease',
                '&:hover': {
                  color: 'rgba(255, 255, 255, 0.7)'
                }
              }
            }}>
              <a href={config.discordLink} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}>
                <FontAwesomeIcon icon={faDiscord} title="Join us in Discord" />
              </a>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md:4 }} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h4" gutterBottom align="center">
              Support Us
            </Typography>
            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 2,
              mt: 3,
              '& .MuiSvgIcon-root, & svg': {
                fontSize: '2rem',
                width: '2rem',
                height: '2rem',
                cursor: 'pointer',
                transition: 'color 0.3s ease',
                '&:hover': {
                  color: 'rgba(255, 255, 255, 0.7)'
                }
              }
            }}>
              <a href={config.patreon} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}>
                <FontAwesomeIcon icon={faPatreon} title="Support us on Patreon" />
              </a>
              <a href={`mailto:${config.teamMail}`} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}>
                <FontAwesomeIcon icon={faPaypal} title="Support us with Paypal" />
              </a>
            </Box>
          </Grid>
        </Grid>

        <Divider
          sx={{
            width: '60%',
            my: 6,
            bgcolor: 'rgba(255, 255, 255, 0.2)'
          }}
        />

        <Typography variant="subtitle1" align="center" sx={{ pt: 3 }}>
          <span>{config.khajiit}</span>
        </Typography>

      </Container>
    </Dialog>
  );
};

export default About;
