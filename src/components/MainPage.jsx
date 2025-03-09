import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import { Button, Container, Box } from '@mui/material';
import GalleryGrid from './GalleryGrid';
import galleryData from '../resources/images.json';
import { useMousePosition } from '../scripts/useMousePosition';
import Projects from './ProjectsPage';
import About from './AboutPage';

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
    <Container
      maxWidth={false}
      sx={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        padding: '0 !important',
        margin: '0 !important',
        maxWidth: 'none !important',
      }}
    >
      <Box
        component="section"
        sx={{
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#121212',
          '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'radial-gradient(circle, #315f316e 0%, transparent 100%)',
            backgroundSize: '100%',
            pointerEvents: 'none',
            zIndex: 1,
            content: '""',
          },
        }}
      >
        <GalleryGrid galleryData={galleryData} gridRef={gridRef} />
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '60px',
            zIndex: 100,
          }}
        >
          <Button
            onClick={handleAboutClick}
            sx={{
              color: 'rgb(197 197 197 / 80%)',
              textTransform: 'uppercase',
              padding: '16px 40px',
              fontWeight: 600,
              fontFamily: 'inherit',
              fontSize: '1.5rem',
              backgroundColor: 'transparent',
              border: '1px solid rgba(0, 0, 0, 0.8)',
              borderRadius: '3rem',
              transition: 'all 0.3s',
              cursor: 'pointer',
              boxShadow: '0 0 10px rgba(255, 255, 255, 0.2)',
              '&:hover': {
                color: '#fff',
                boxShadow: '0 0 20px rgba(255, 255, 255, 0.4)',
                textShadow: '0 0 8px rgba(255, 255, 255, 0.4)',
                border: '1px solid #333',
              },
              '&:focus': {
                outline: 'none',
                color: 'rgb(197 197 197 / 80%)',
                boxShadow: '0 0 10px rgba(255, 255, 255, 0.2)',
                border: '1px solid rgba(0, 0, 0, 0.8)',
                textShadow: 'none',
              },
              '&:focus:not(:hover)': {
                color: 'rgb(197 197 197 / 80%)',
                boxShadow: '0 0 10px rgba(255, 255, 255, 0.2)',
                border: '1px solid rgba(0, 0, 0, 0.8)',
                textShadow: 'none',
              },
            }}
          >
            About
          </Button>
          <Button
            onClick={handleProjectsClick}
            sx={{
              color: 'rgb(197 197 197 / 80%)',
              textTransform: 'uppercase',
              padding: '16px 40px',
              fontWeight: 600,
              fontFamily: 'inherit',
              fontSize: '1.5rem',
              backgroundColor: 'transparent',
              border: '1px solid rgba(0, 0, 0, 0.8)',
              borderRadius: '3rem',
              transition: 'all 0.3s',
              cursor: 'pointer',
              boxShadow: '0 0 10px rgba(255, 255, 255, 0.2)',
              '&:hover': {
                color: '#fff',
                boxShadow: '0 0 20px rgba(255, 255, 255, 0.4)',
                textShadow: '0 0 8px rgba(255, 255, 255, 0.4)',
                border: '1px solid #333',
              },
              '&:focus': {
                outline: 'none',
                color: 'rgb(197 197 197 / 80%)',
                boxShadow: '0 0 10px rgba(255, 255, 255, 0.2)',
                border: '1px solid rgba(0, 0, 0, 0.8)',
                textShadow: 'none',
              },
              '&:focus:not(:hover)': {
                color: 'rgb(197 197 197 / 80%)',
                boxShadow: '0 0 10px rgba(255, 255, 255, 0.2)',
                border: '1px solid rgba(0, 0, 0, 0.8)',
                textShadow: 'none',
              },
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
