import React, { useEffect, useState } from 'react';
import { Dialog, IconButton, Container, Grid, Typography, Link, Box} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import projectsData from '../resources/projects.json';

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

const ProjectContainer = styled(Container)({
  marginTop: '64px',
  color: 'white',
  fontFamily: 'Roboto, Arial, sans-serif'
});

const ProjectBox = styled('div')({
  margin: '16px 0',
  padding: '16px 0',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
});

const ImageContainer = styled('div')({
  width: '100%',
  height: 350,
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  borderRadius: 8,
  overflow: 'hidden',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.02)',
  },
});

const ProjectImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

const ProjectTitle = styled(Typography)({
  fontFamily: 'Roboto, Arial, sans-serif',
  fontWeight: 600,
  letterSpacing: '0.5px',
  marginBottom: '16px',
  fontSize: '2.5rem',
});

const ProjectDescription = styled(Typography)({
  color: 'rgba(255, 255, 255, 0.8)',
  fontFamily: 'Roboto, Arial, sans-serif',
  lineHeight: 1.6,
  fontSize: '1.1rem',
  letterSpacing: '0.3px',
});

const ProjectLink = styled(Link)({
  color: 'white',
  display: 'inline-flex',
  marginRight: '8px',
  marginBottom: '8px',
  alignItems: 'center',
  textDecoration: 'none',
  fontFamily: 'Inter, Roboto, Arial, sans-serif',
  fontWeight: 500,
  fontSize: '0.95rem',
  transition: 'all 0.2s ease',
  padding: '8px 16px',
  borderRadius: 4,
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
});

const Projects = ({ open, onClose }) => {
  const [projects, setProjects] = useState(projectsData.projects);

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

      <ProjectContainer maxWidth="lg">
        {projects.map((project) => (
          <ProjectBox key={project.id}>
            <Grid container spacing={4} alignItems="center">

              <Grid item xs={12} md={6}>
                <ImageContainer>
                  <ProjectImage src={project.image} alt={project.title} />
                </ImageContainer>
              </Grid>

              <Grid item xs={12} md={6}>
                <ProjectTitle variant="h4">
                  {project.title}
                </ProjectTitle>

                <ProjectDescription variant="body1">
                  {project.description}
                </ProjectDescription>

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
                      <ProjectLink
                        key={index}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.text}
                      </ProjectLink>
                    ))}
                </Box>
              </Grid >

            </Grid >
          </ProjectBox>
        ))}
      </ProjectContainer>
    </StyledDialog>
  );
};

export default Projects;
