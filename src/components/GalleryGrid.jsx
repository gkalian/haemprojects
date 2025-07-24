import React, { forwardRef, useState, useEffect } from 'react';
import Skeleton from '@mui/material/Skeleton';
import '../styles/galleryGrid.css';

/**
 * GalleryGrid component that displays images in a rotated grid layout
 * Contains two components:
 * - GalleryGrid: Main container that manages the overall grid layout
 * - GalleryRow: Sub-component that renders each row of images
 * Styled with galleryGrid.css for responsive and visually appealing presentation
 * @param {Object} galleryData - Object containing gallery images data
 * @param {React.RefObject} gridRef - Reference object for the grid container
 * @returns {JSX.Element} GalleryGrid component with responsive image layout
 */

/**
 * GalleryRow component that renders a single row of images
 */
const GalleryRow = ({ images, rowIndex, isLoading }) => (
  <div key={rowIndex} className="gallery-row">
    {images.map((image, imageIndex) => (
      <div key={`${rowIndex}-${imageIndex}`} className="gallery-row_item">
        <div className="gallery-row_item-inner">
          {isLoading ? (
            <Skeleton
              variant="rectangular"
              width="100%"
              height="100%"
              animation="wave"
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                transform: 'none'
              }}
            />
          ) : (
            <div
              className="gallery-row_item-img"
              style={{ backgroundImage: `url(${image})` }}
            />
          )}
        </div>
      </div>
    ))}
  </div>
);

/**
 * GalleryGrid component that displays images in a grid layout
 */
const GalleryGrid = forwardRef(({ galleryData }, ref) => {
  const [isLoading, setIsLoading] = useState(true);
  const imageRows = Object.values(galleryData.galleryImages).map(item => item.images);

  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = imageRows.flat().map(imageUrl => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = imageUrl;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      try {
        await Promise.all(imagePromises);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading images:', error);
        setIsLoading(false);
      }
    };

    preloadImages();
  }, [imageRows]);

  return (
    <div ref={ref} className="gallery-grid">
      {imageRows.map((rowImages, rowIndex) => (
        <GalleryRow
          key={rowIndex}
          images={rowImages}
          rowIndex={rowIndex}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
});

export default GalleryGrid;
