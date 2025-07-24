import React, { useRef, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import GalleryGrid from '../components/GalleryGrid';
import MainButton from '../components/MainButton';
import GradientOverlay from '../components/GradientOverlay';
import Projects from './ProjectsPage';
import About from './AboutPage';
import useGalleryAnimation from '../scripts/useGalleryAnimation';
import galleryData from '../resources/images.json';

/**
 * MainPage component that serves as the landing page with an interactive gallery
 * and navigation buttons.
 */
const MainPage = () => {
  const gridRef = useRef(null);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Initialize component after mount
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Use custom hook for gallery animations
  useGalleryAnimation(gridRef);

  // Navigation handlers
  const handleProjectsClick = () => setIsProjectsOpen(true);
  const handleAboutClick = () => setIsAboutOpen(true);
  const handleCloseProjects = () => setIsProjectsOpen(false);
  const handleCloseAbout = () => setIsAboutOpen(false);

  return (
    <Box
      className="main"
      sx={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        bgcolor: '#121212',
      }}
    >
      {/* Gallery Grid Container */}
      {isMounted && <GalleryGrid ref={gridRef} galleryData={galleryData} />}

      {/* Gradient Overlay */}
      <GradientOverlay />

      {/* Navigation Buttons */}
      <Box className="buttons"
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
          zIndex: 10,
        }}
      >
        <MainButton onClick={handleAboutClick}>About</MainButton>
        <MainButton onClick={handleProjectsClick}>Projects</MainButton>
      </Box>

      {/* Modals */}
      <About open={isAboutOpen} onClose={handleCloseAbout} />
      <Projects open={isProjectsOpen} onClose={handleCloseProjects} />
    </Box>
  );
};

export default MainPage;
