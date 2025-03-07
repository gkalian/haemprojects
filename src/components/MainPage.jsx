import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import GalleryGrid from './GalleryGrid';
import galleryData from '../resources/images.json';
import { useMousePosition } from '../scripts/useMousePosition';
import Projects from './ProjectsPage';
import About from './AboutPage';
import '../styles/mainPage.css';

gsap.registerPlugin(Flip);

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
    <div className="main-container">
      <section className="intro-section">
        <GalleryGrid galleryData={galleryData} gridRef={gridRef} />
        <div className="button-container">
          <button onClick={handleAboutClick} className="button about-button">
            About
          </button>
          <button onClick={handleProjectsClick} className="button projects-button">
            Projects
          </button>
        </div>
        <About open={isAboutOpen} onClose={handleCloseAbout} />
        <Projects open={isProjectsOpen} onClose={handleCloseProjects} />
      </section>
    </div>
  );
};

export default Gallery;
