import { useState, useEffect, useMemo } from 'react';
import { useWindowSize } from './useWindowSize';

/**
 * Collection of functions to calculate various visual effects based on mouse position
 * @type {Object.<string, function(number, number): number>}
 */
const createCalculateValues = () => ({
  /**
   * Calculates the mapped X translation value
   * @param {number} mouseX - Current mouse X position
   * @param {number} windowWidth - Current window width
   * @returns {number} Mapped translation value based on mouse position
   */
  mappedX: (mouseX, windowWidth) =>
    (((mouseX / windowWidth) * 2 - 1) * 40 * windowWidth) / 100,

  /**
   * Calculates the mapped skew value
   * @param {number} mouseX - Current mouse X position
   * @param {number} windowWidth - Current window width
   * @returns {number} Mapped skew value
   */
  mappedSkew: (mouseX, windowWidth) =>
    ((mouseX / windowWidth) * 2 - 1) * 3,

  /**
   * Calculates the mapped contrast value
   * @param {number} mouseX - Current mouse X position
   * @param {number} windowWidth - Current window width
   * @returns {number} Mapped contrast value
   */
  mappedContrast: (mouseX, windowWidth) => {
    const centerContrast = 100;
    const edgeContrast = 330;
    const t = Math.abs((mouseX / windowWidth) * 2 - 1);
    const factor = Math.pow(t, 2);
    return centerContrast - factor * (centerContrast - edgeContrast);
  },

  /**
   * Calculates the mapped scale value
   * @param {number} mouseX - Current mouse X position
   * @param {number} windowWidth - Current window width
   * @returns {number} Mapped scale value
   */
  mappedScale: (mouseX, windowWidth) => {
    const centerScale = 1;
    const edgeScale = 0.95;
    return centerScale - Math.abs((mouseX / windowWidth) * 2 - 1) * (centerScale - edgeScale);
  },

  /**
   * Calculates the mapped brightness value
   * @param {number} mouseX - Current mouse X position
   * @param {number} windowWidth - Current window width
   * @returns {number} Mapped brightness value
   */
  mappedBrightness: (mouseX, windowWidth) => {
    const centerBrightness = 100;
    const edgeBrightness = 50;
    const t = Math.abs((mouseX / windowWidth) * 2 - 1);
    const factor = Math.pow(t, 1.5);
    return centerBrightness - factor * (centerBrightness - edgeBrightness);
  }
});

/**
 * Linear interpolation function
 * @param {number} a - Start value
 * @param {number} b - End value
 * @param {number} n - Interpolation factor
 * @returns {number} Interpolated value
 */
const lerp = (a, b, n) => (1 - n) * a + n * b;

/**
 * Custom hook that tracks mouse position and calculates various visual effects
 * @returns {Object} Object containing current mouse position and calculated visual effects
 * @returns {{
 *   x: number,
 *   y: number,
 *   mappedValues: {
 *     translateX: number,
 *     skewX: number,
 *     contrast: number,
 *     scale: number,
 *     brightness: number
 *   },
 *   renderedValues: {
 *     translateX: number,
 *     skewX: number,
 *     contrast: number,
 *     scale: number,
 *     brightness: number
 *   }
 * }} Mouse position and effect values
 */
export const useMousePosition = () => {
  const windowSize = useWindowSize();
  const calculateValues = useMemo(() => createCalculateValues(), []);

  /**
   * Initial state for mouse position and effects
   * @type {{
   *   x: number,
   *   y: number,
   *   mappedValues: {
   *     translateX: number,
   *     skewX: number,
   *     contrast: number,
   *     scale: number,
   *     brightness: number
   *   },
   *   renderedValues: {
   *     translateX: number,
   *     skewX: number,
   *     contrast: number,
   *     scale: number,
   *     brightness: number
   *   }
   * }}
   */
  const [mousePos, setMousePos] = useState({
    x: windowSize.width / 2,
    y: windowSize.height / 2,
    mappedValues: {
      translateX: 0,
      skewX: 0,
      contrast: 100,
      scale: 1,
      brightness: 100
    },
    renderedValues: {
      translateX: 0,
      skewX: 0,
      contrast: 100,
      scale: 1,
      brightness: 100
    }
  });

  /**
   * Memoized function to calculate all mapped values based on mouse X position
   * @type {(x: number) => {
   *   translateX: number,
   *   skewX: number,
   *   contrast: number,
   *   scale: number,
   *   brightness: number
   * }}
   */
  const updateMappedValues = useMemo(() => (x) => ({
    translateX: calculateValues.mappedX(x, windowSize.width),
    skewX: calculateValues.mappedSkew(x, windowSize.width),
    contrast: calculateValues.mappedContrast(x, windowSize.width),
    scale: calculateValues.mappedScale(x, windowSize.width),
    brightness: calculateValues.mappedBrightness(x, windowSize.width)
  }), [windowSize.width, calculateValues]);

  useEffect(() => {
    /**
     * Handles mouse movement events and updates position and effects
     * @param {MouseEvent} e - Mouse event object
     */
    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      const mappedValues = updateMappedValues(x);

      setMousePos(prev => ({
        x,
        y,
        mappedValues,
        renderedValues: {
          translateX: lerp(prev.renderedValues.translateX, mappedValues.translateX, 0.1),
          skewX: lerp(prev.renderedValues.skewX, mappedValues.skewX, 0.1),
          contrast: lerp(prev.renderedValues.contrast, mappedValues.contrast, 0.1),
          scale: lerp(prev.renderedValues.scale, mappedValues.scale, 0.1),
          brightness: lerp(prev.renderedValues.brightness, mappedValues.brightness, 0.1)
        }
      }));
    };

    /**
     * ID for the animation frame request
     * @type {number}
     */
    let animationFrameId;

    /**
     * Animates the transition of rendered values
     */
    const animate = () => {
      setMousePos(prev => ({
        ...prev,
        renderedValues: {
          translateX: lerp(prev.renderedValues.translateX, prev.mappedValues.translateX, 0.1),
          skewX: lerp(prev.renderedValues.skewX, prev.mappedValues.skewX, 0.1),
          contrast: lerp(prev.renderedValues.contrast, prev.mappedValues.contrast, 0.1),
          scale: lerp(prev.renderedValues.scale, prev.mappedValues.scale, 0.1),
          brightness: lerp(prev.renderedValues.brightness, prev.mappedValues.brightness, 0.1)
        }
      }));
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [windowSize, updateMappedValues]);

  return mousePos;
};
