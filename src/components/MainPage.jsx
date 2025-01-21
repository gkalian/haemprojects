import React, { useEffect, useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import GalleryGrid from './GalleryGrid';
import galleryData from '../resources/images.json';
import { useMousePosition } from '../scripts/useMousePosition';
import Projects from './ProjectsPage';
import About from './AboutPage';

gsap.registerPlugin(Flip);

const MainContainer = styled('div')({
  position: 'relative',
  width: '100%',
  height: '100vh',
});

const IntroSection = styled('section')({
  width: '100%',
  height: '100vh',
  overflow: 'hidden',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#121212',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'radial-gradient(circle, #315f316e 0%, transparent 100%)',
    backgroundSize: '100%',
    pointerEvents: 'none',
    zIndex: 1
  }
});

const ButtonContainer = styled('div')({
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
});

const Button = styled('button')({
  color: 'rgb(197 197 197 / 80%)',
  textTransform: 'uppercase',
  padding: '16px 40px',
  fontWeight: 600,
  fontFamily: 'Roboto, sans-serif',
  fontSize: '1.5rem',
  backgroundColor: 'transparent',
  border: '1px solid rgba(0, 0, 0, 0.8)',
  borderRadius: '3rem',
  transition: 'all 0.3s',
  cursor: 'pointer',
  boxShadow: '0 0 10px rgba(255, 255, 255, 0.2)',
  outline: 'none',
  '&:hover': {
    color: '#fff',
    boxShadow: '0 0 20px rgba(255, 255, 255, 0.4)',
    textShadow: '0 0 8px rgba(255, 255, 255, 0.4)',
    border: '1px solid #333'
  },
  '&:focus': {
    outline: 'none',
    color: 'rgb(197 197 197 / 80%)',
    boxShadow: '0 0 10px rgba(255, 255, 255, 0.2)',
    border: '1px solid rgba(0, 0, 0, 0.8)',
    textShadow: 'none'
  },
  '&:focus:not(:hover)': {
    color: 'rgb(197 197 197 / 80%)',
    boxShadow: '0 0 10px rgba(255, 255, 255, 0.2)',
    border: '1px solid rgba(0, 0, 0, 0.8)',
    textShadow: 'none'
  }
});

const Gallery = () => {
  const gridRef = useRef(null);
  const mousePos = useMousePosition();
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  useEffect(() => {
    let requestId;
    const render = () => {
      const rows = gridRef.current?.querySelectorAll('.row');

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
    <MainContainer>
      <IntroSection>
        <GalleryGrid galleryData={galleryData} gridRef={gridRef} />
        <ButtonContainer>
          <Button onClick={handleAboutClick} className="about-button">
            About
          </Button>
          <Button onClick={handleProjectsClick} className="projects-button">
            Projects
          </Button>
        </ButtonContainer>
        <About open={isAboutOpen} onClose={handleCloseAbout} />
        <Projects open={isProjectsOpen} onClose={handleCloseProjects} />
      </IntroSection>
    </MainContainer>
  );
};

export default Gallery;
