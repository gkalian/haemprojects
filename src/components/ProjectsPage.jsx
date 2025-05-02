import React, { useEffect, useState } from 'react';
import { Dialog, IconButton, Container, Grid, Typography, Link, Box, Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SortIcon from '@mui/icons-material/Sort';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
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
  const [isNewest, setIsNewest] = useState(true);
  const [selectedGame, setSelectedGame] = useState(null);
  const uniqueGames = [...new Set(projectsData.projects.map(project => project.game))];

  useEffect(() => {
    const initialSortedProjects = [...projectsData.projects].sort((a, b) => b.id - a.id);
    setProjects(initialSortedProjects);
    setIsNewest(true); 
  }, []);

  useEffect(() => {
    if (!open) {
      document.activeElement?.blur();
    }
  }, [open]);

  const handleSort = () => {
    const sortedProjects = [...projects].sort((a, b) => {
      return isNewest ? a.id - b.id : b.id - a.id;
    });
    setProjects(sortedProjects);
    setIsNewest(!isNewest);
  };

  const handleGameFilter = (game) => {
    if (selectedGame === game) {
      setSelectedGame(null);
      setProjects([...projectsData.projects].sort((a, b) => 
        isNewest ? b.id - a.id : a.id - b.id));
    } else {
      setSelectedGame(game);
      const filteredProjects = projectsData.projects
        .filter(project => project.game === game)
        .sort((a, b) => isNewest ? b.id - a.id : a.id - b.id);
      setProjects(filteredProjects);
    }
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

      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          padding: '80px 0 20px',
          gap: '16px' 
        }}
      >

      {uniqueGames.map((game) => (
        <Box
          key={game}
          onClick={() => handleGameFilter(game)}
          sx={{
            color: 'white',
            padding: '8px 16px',
            borderRadius: 20,
            backgroundColor: selectedGame === game 
              ? 'rgba(129, 150, 236, 0.7)' 
              : 'rgba(255, 255, 255, 0.2)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: selectedGame === game 
                ? 'rgba(129, 150, 236, 0.8)' 
                : 'rgba(255, 255, 255, 0.3)',
            },
          }}
        >
          {game}
        </Box>
      ))}

      <Box
        onClick={handleSort}
        sx={{
          color: 'white',
          padding: '8px 16px',
          borderRadius: 20,
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
          },
        }}
      >
       {isNewest  ? 'New' : 'Old'}
       {isNewest  ? (
            <ArrowUpwardIcon sx={{ fontSize: '16px' }} />
          ) : (
            <ArrowDownwardIcon sx={{ fontSize: '16px' }} />
          )}
      </Box>

      </Box>

      <Container
        maxWidth="lg"
        sx={{
          color: 'white',
          width: "800px",
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center'
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
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    width: '100%',
                    height: 420,
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

              <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', width: '750px'}}>
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
                    letterSpacing: '0.5px',
                    marginBottom: '16px',
                    fontSize: '1rem',
                  }}
                >
                  Game: <span style={{ fontWeight: 600 }}>{project.game}</span>, Released: <span style={{ fontWeight: 600 }}>{project.released}</span>
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
                    { href: project.nexusmodsOblRe, text: 'NexusMods', color: 'rgba(217, 143, 64, 0.7)' },
                    { href: project.bethesdaPC, text: 'Bethesda PC', color: 'rgba(255, 255, 255, 0.4)' },
                    { href: project.bethesdaPS4, text: 'Bethesda PS4', color: 'rgba(255, 255, 255, 0.4)' },
                    { href: project.bethesdaXB, text: 'Bethesda XB1', color: 'rgba(255, 255, 255, 0.4)' },
                    { href: project.tesallLE, text: 'TESAll', color: 'rgba(44, 129, 94, 0.4)' },
                    { href: project.tesallSE, text: 'TESAll SE', color: 'rgba(94, 204, 158, 0.4)' },
                    { href: project.tesallOblRe, text: 'TESAll', color: 'rgba(94, 204, 158, 0.4)' },
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
