import React, { useEffect, useState } from 'react';
import { Dialog, IconButton, Container, Grid, Typography, Link, Box, Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SortIcon from '@mui/icons-material/Sort';
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
  const [isAscending, setIsAscending] = useState(true);

  useEffect(() => {
    const initialSortedProjects = [...projectsData.projects].sort((a, b) => b.id - a.id);
    setProjects(initialSortedProjects);
    setIsAscending(false);
  }, []);

  useEffect(() => {
    if (!open) {
      document.activeElement?.blur();
    }
  }, [open]);

  const handleSort = () => {
    const sortedProjects = [...projects].sort((a, b) => {
      return isAscending ? b.id - a.id : a.id - b.id;
    });
    setProjects(sortedProjects);
    setIsAscending(!isAscending);
  };

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
      <Tooltip title="Sort by released time" arrow>
        <IconButton 
          onClick={handleSort} 
          aria-label="sort"
          sx={{
            position: 'absolute',
            right: '16px',
            top: '64px',
            color: 'white',
            zIndex: 1000,
            '&:hover': {
              color: 'rgba(255, 255, 255, 0.8)',
            },
          }}
        >
          <SortIcon />
        </IconButton>
      </Tooltip>

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
            <Grid container spacing={4}>
              <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center' }}>
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

              <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 600,
                    letterSpacing: '0.5px',
                    marginBottom: '8px',
                  }}
                >
                  {project.title}
                </Typography>

                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 600,
                    letterSpacing: '0.5px',
                    marginBottom: '16px',
                    fontSize: '1rem',
                  }}
                >
                 Released: {project.released}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    lineHeight: 1.6,
                    fontSize: '1.1rem',
                    letterSpacing: '0.3px',
                    marginBottom: '16px',
                  }}
                >
                  {project.firstDescription}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    lineHeight: 1.6,
                    fontSize: '1.1rem',
                    letterSpacing: '0.3px',

                  }}
                >
                  {project.secondDescription}
                </Typography>

                <Box sx={{ marginTop: 'auto', paddingTop: 3 }}>
                  {[
                    { href: project.nexusmodsLinkLE, text: 'NexusMods LE', color: 'rgba(217, 143, 64, 0.7)' },
                    { href: project.nexusmodsLinkSE, text: 'NexusMods SE', color: 'rgba(129, 150, 236, 0.7)' },
                    { href: project.bethesdaPC, text: 'Bethesda PC', color: 'rgba(255, 255, 255, 0.4)' },
                    { href: project.bethesdaPS4, text: 'Bethesda PS4', color: 'rgba(255, 255, 255, 0.4)' },
                    { href: project.bethesdaXB, text: 'Bethesda XB1', color: 'rgba(255, 255, 255, 0.4)' },
                    { href: project.tesallLE, text: 'TESAll', color: 'rgba(44, 129, 94, 0.4)' },
                    { href: project.tesallSE, text: 'TESAll SE', color: 'rgba(94, 204, 158, 0.4)' },
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
                          backgroundColor: link.color,
                          '&:hover': {
                            backgroundColor: link.color.replace('0.4', '0.6'),
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
