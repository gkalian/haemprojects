import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import { Button, Container, Box } from '@mui/material';
import GalleryGrid from './GalleryGrid';
import galleryData from '../resources/images.json';
import { useMousePosition } from '../scripts/useMousePosition';
import Projects from './ProjectsPage';
import About from './AboutPage';
import '../styles/mainPage.css';

gsap.registerPlugin(Flip);

/**
 * Interactive gallery component with mouse-responsive grid animations and modal sections
 * Uses GSAP for parallax effects and Material-UI for layout components
 * @returns {JSX.Element} Gallery component with animated grid and navigation buttons
 */
const Gallery = () => {
  const gridRef = useRef(null);
  const mousePos = useMousePosition();
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  useEffect(() => {
    let requestId;
    const render = () => {
      const rows = gridRef.current?.querySelectorAll('.gallery-row');

      if (rows) {
        const numRows = rows.length;
        const middleRowIndex = Math.floor(numRows / 2);

        rows.forEach((row, i) => {
          const rowIndex = i - middleRowIndex;
          const multiplier = 1 - Math.abs(rowIndex) * 0.3;

          gsap.to(row, {
            x: mousePos.renderedValues.translateX * multiplier,
            filter: `brightness(${mousePos.renderedValues.brightness}%)
                    contrast(${mousePos.renderedValues.contrast}%)`,
            duration: 1,
            ease: 'power1.out',
            overwrite: 'auto'
          });
        });
      }

      requestId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(requestId);
  }, [mousePos]);

  const handleProjectsClick = () => {
    setIsProjectsOpen(true);
  };

  const handleAboutClick = () => {
    setIsAboutOpen(true);
  };

  const handleCloseProjects = () => {
    setIsProjectsOpen(false);
  };

  const handleCloseAbout = () => {
    setIsAboutOpen(false);
  };
  return (
    <Container maxWidth={false} className="main-container">
      <Box component="section" className="intro-section">
        <GalleryGrid galleryData={galleryData} gridRef={gridRef} />
        <Box className="button-container">
          <Button 
            onClick={handleAboutClick} 
            variant="contained" 
            size="large"
            className="about-button"
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              },
              margin: '0 8px'
            }}
          >
            About
          </Button>
          <Button 
            onClick={handleProjectsClick} 
            variant="contained" 
            size="large"
            className="projects-button"
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              },
              margin: '0 8px'
            }}
          >
            Projects
          </Button>
        </Box>
        <About open={isAboutOpen} onClose={handleCloseAbout} />
        <Projects open={isProjectsOpen} onClose={handleCloseProjects} />
      </Box>
    </Container>
  );
};

export default Gallery;
