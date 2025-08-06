import React, { useState, useEffect, useRef } from "react";
import Skeleton from "@mui/material/Skeleton";
import useSimpleGalleryAnimation from "../scripts/useSimpleGalleryAnimation";
import "../styles/galleryGrid.css";

/**
 * GalleryGrid component that displays images in a rotated grid layout
 * Contains two components:
 * - GalleryGrid: Main container that manages the overall grid layout
 * - GalleryRow: Sub-component that renders each row of images
 * Styled with galleryGrid.css for responsive and visually appealing presentation
 * @param {Object} galleryData - Object containing gallery images data
 * @returns {JSX.Element} GalleryGrid component with responsive image layout
 */

/**
 * GalleryRow component that renders a single row of images
 */
const GalleryRow = ({ images, rowIndex, isLoading }) => (
  <div key={rowIndex} className="gallery-row">
    {images.map((image, imageIndex) => (
      <div key={`${rowIndex}-${imageIndex}`} className="gallery-row_item">
        <div className="gallery-row_item-inner gallery-item">
          {isLoading ? (
            <Skeleton
              variant="rectangular"
              width="100%"
              height="100%"
              animation="wave"
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                transform: "none",
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
const GalleryGrid = ({ galleryData }) => {
  const [isLoading, setIsLoading] = useState(true);
  const galleryContainerRef = useRef();

  // Use the new animation hook
  useSimpleGalleryAnimation(galleryContainerRef);

  // Flatten the image rows for the grid
  const imageRows = Object.values(galleryData.galleryImages).map(
    (item) => item.images,
  );

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={galleryContainerRef} className="gallery-grid">
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
};

GalleryGrid.displayName = "GalleryGrid";

export default GalleryGrid;
