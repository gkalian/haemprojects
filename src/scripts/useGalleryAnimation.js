import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useMousePosition } from './useMousePosition';
import { GALLERY_ANIMATION } from './animationConstants';

/**
 * Custom hook that handles the gallery animation logic
 * @param {React.RefObject} gridRef - Reference to the grid container
 */
const useGalleryAnimation = (gridRef) => {
  const mousePos = useMousePosition();
  const prevValuesRef = useRef({
    translateX: 0,
    brightness: 100,
    contrast: 100
  });

  useEffect(() => {
    const rows = gridRef.current?.querySelectorAll('.gallery-row');
    if (!rows || rows.length === 0) return;

    const currentValues = mousePos.renderedValues;
    const prevValues = prevValuesRef.current;

    // Check if values have changed significantly
    const hasSignificantChange =
      Math.abs(currentValues.translateX - prevValues.translateX) > GALLERY_ANIMATION.CHANGE_THRESHOLD ||
      Math.abs(currentValues.brightness - prevValues.brightness) > GALLERY_ANIMATION.CHANGE_THRESHOLD ||
      Math.abs(currentValues.contrast - prevValues.contrast) > GALLERY_ANIMATION.CHANGE_THRESHOLD;

    if (!hasSignificantChange) return;

    // Update previous values
    prevValuesRef.current = {
      translateX: currentValues.translateX,
      brightness: currentValues.brightness,
      contrast: currentValues.contrast
    };

    const numRows = rows.length;
    const middleRowIndex = Math.floor(numRows / 2);
    const tl = gsap.timeline();

    rows.forEach((row, i) => {
      const rowIndex = i - middleRowIndex;
      const multiplier = 1 - Math.abs(rowIndex) * GALLERY_ANIMATION.ROW_MULTIPLIER_FACTOR;

      tl.to(row, {
        x: currentValues.translateX * multiplier,
        filter: `brightness(${currentValues.brightness}%) contrast(${currentValues.contrast}%)`,
        duration: GALLERY_ANIMATION.DURATION,
        ease: GALLERY_ANIMATION.EASE,
        overwrite: 'auto'
      }, 0);
    });

    return () => tl.kill();
  }, [mousePos.renderedValues, gridRef]);
};

export default useGalleryAnimation;
