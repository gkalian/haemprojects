import React from 'react';
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

const GalleryRow = ({ images, rowIndex }) => (
  <div key={rowIndex} className="gallery-row">
    {images.map((image, imageIndex) => (
      <div key={`${rowIndex}-${imageIndex}`} className="gallery-row_item">
        <div className="gallery-row_item-inner">
          <div
            className="gallery-row_item-img"
            style={{ backgroundImage: `url(${image})` }}
          />
        </div>
      </div>
    ))}
  </div>
);

const GalleryGrid = ({ galleryData, gridRef }) => {
  const imageRows = Object.values(galleryData.galleryImages).map(item => item.images);

  return (
    <div ref={gridRef} className="gallery-grid">
      {imageRows.map((rowImages, rowIndex) => (
        <GalleryRow key={rowIndex} images={rowImages} rowIndex={rowIndex} />
      ))}
    </div>
  );
};

export default GalleryGrid;
