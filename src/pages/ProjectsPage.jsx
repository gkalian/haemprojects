import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import CloseIcon from '@mui/icons-material/Close';
import projectsData from '../resources/projects.json';
import ProjectCard from '../components/ProjectCard';
import ProjectFilter from '../components/ProjectFilter';
import ProjectSort from '../components/ProjectSort';

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
          gap: '16px',
          flexWrap: 'wrap',
        }}
      >
        <ProjectFilter
          games={uniqueGames}
          selectedGame={selectedGame}
          onFilter={handleGameFilter}
        />
        <ProjectSort
          isNewest={isNewest}
          onSort={handleSort}
        />
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
          <ProjectCard
            key={project.id}
            project={project}
          />
        ))}
      </Container>
    </Dialog>
  );
};

export default Projects;
