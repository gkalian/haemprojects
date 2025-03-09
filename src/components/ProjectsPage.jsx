import React, { useEffect, useState } from 'react';
import { Dialog, IconButton, Container, Grid, Typography, Link, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import projectsData from '../resources/projects.json';

/**
 * Projects component displays a fullscreen dialog with a list of projects
 * Each project is displayed with an image, title, description and relevant links
 * Uses Material UI components for layout and styling
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.open - Controls whether the dialog is open
 * @param {Function} props.onClose - Callback function to handle dialog close
 * @returns {JSX.Element} Projects dialog component with grid layout of projects
 */
const Projects = ({ open, onClose }) => {
  const [projects, setProjects] = useState(projectsData.projects);

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
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          boxShadow: 'none',
        }
      }}
    >
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

      <Container 
        maxWidth="lg"
        sx={{
          marginTop: '64px',
          color: 'white'
        }}
      >
        {projects.map((project) => (
          <Box 
            key={project.id}
            sx={{
              margin: '16px 0',
              padding: '16px 0',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    width: '100%',
                    height: 350,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: 8,
                    overflow: 'hidden',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.02)',
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={project.image}
                    alt={project.title}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 600,
                    letterSpacing: '0.5px',
                    marginBottom: '16px',
                    fontSize: '2.5rem',
                  }}
                >
                  {project.title}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    lineHeight: 1.6,
                    fontSize: '1.1rem',
                    letterSpacing: '0.3px',
                  }}
                >
                  {project.description}
                </Typography>

                <Box sx={{ mt: 3 }}>
                  {[
                    { href: project.nexusmodsLinkLE, text: 'NexusMods LE' },
                    { href: project.nexusmodsLinkSE, text: 'NexusMods SE' },
                    { href: project.bethesdaPC, text: 'Bethesda PC' },
                    { href: project.bethesdaPS4, text: 'Bethesda PS4' },
                    { href: project.bethesdaXB, text: 'Bethesda XB1' },
                  ]
                    .filter(link => link.href)
                    .map((link, index) => (
                      <Link
                        key={index}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          color: 'white',
                          display: 'inline-flex',
                          marginRight: '8px',
                          marginBottom: '8px',
                          alignItems: 'center',
                          textDecoration: 'none',
                          fontWeight: 500,
                          fontSize: '0.95rem',
                          transition: 'all 0.2s ease',
                          padding: '8px 16px',
                          borderRadius: 4,
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          },
                        }}
                      >
                        {link.text}
                      </Link>
                    ))}
                </Box>
              </Grid>
            </Grid>
          </Box>
        ))}
      </Container>
    </Dialog>
  );
};

export default Projects;
