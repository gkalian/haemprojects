import { useState, useEffect, useMemo } from 'react';
import { useWindowSize } from './useWindowSize';
import { MOUSE_ANIMATION, VISUAL_EFFECTS } from './animationConstants';

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
    (((mouseX / windowWidth) * 2 - 1) * VISUAL_EFFECTS.TRANSLATE_MULTIPLIER * windowWidth) / 100,

  /**
   * Calculates the mapped skew value
   * @param {number} mouseX - Current mouse X position
   * @param {number} windowWidth - Current window width
   * @returns {number} Mapped skew value
   */
  mappedSkew: (mouseX, windowWidth) =>
    ((mouseX / windowWidth) * 2 - 1) * VISUAL_EFFECTS.MAX_SKEW_ANGLE,

  /**
   * Calculates the mapped contrast value
   * @param {number} mouseX - Current mouse X position
   * @param {number} windowWidth - Current window width
   * @returns {number} Mapped contrast value
   */
  mappedContrast: (mouseX, windowWidth) => {
    const t = Math.abs((mouseX / windowWidth) * 2 - 1);
    const factor = Math.pow(t, 2);
    return VISUAL_EFFECTS.CENTER_CONTRAST - factor * (VISUAL_EFFECTS.CENTER_CONTRAST - VISUAL_EFFECTS.EDGE_CONTRAST);
  },

  /**
   * Calculates the mapped scale value
   * @param {number} mouseX - Current mouse X position
   * @param {number} windowWidth - Current window width
   * @returns {number} Mapped scale value
   */
  mappedScale: (mouseX, windowWidth) => {
    return VISUAL_EFFECTS.CENTER_SCALE - Math.abs((mouseX / windowWidth) * 2 - 1) * (VISUAL_EFFECTS.CENTER_SCALE - VISUAL_EFFECTS.EDGE_SCALE);
  },

  /**
   * Calculates the mapped brightness value
   * @param {number} mouseX - Current mouse X position
   * @param {number} windowWidth - Current window width
   * @returns {number} Mapped brightness value
   */
  mappedBrightness: (mouseX, windowWidth) => {
    return VISUAL_EFFECTS.CENTER_BRIGHTNESS - Math.abs((mouseX / windowWidth) * 2 - 1) * (VISUAL_EFFECTS.CENTER_BRIGHTNESS - VISUAL_EFFECTS.EDGE_BRIGHTNESS);
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
    let animationFrameId = null;
    let lastMouseMoveTime = Date.now();
    let isAnimating = false;
    let throttleTimeout = null;
    let isMounted = true;
    const ANIMATION_STOP_DELAY = MOUSE_ANIMATION.ANIMATION_STOP_DELAY;
    const LERP_THRESHOLD = MOUSE_ANIMATION.LERP_THRESHOLD;

    /**
     * Checks if animation should continue based on value differences
     * @param {Object} current - Current rendered values
     * @param {Object} target - Target mapped values
     * @returns {boolean} Whether animation should continue
     */
    const shouldContinueAnimation = (current, target) => {
      return Math.abs(current.translateX - target.translateX) > LERP_THRESHOLD ||
             Math.abs(current.skewX - target.skewX) > LERP_THRESHOLD ||
             Math.abs(current.contrast - target.contrast) > LERP_THRESHOLD ||
             Math.abs(current.scale - target.scale) > LERP_THRESHOLD ||
             Math.abs(current.brightness - target.brightness) > LERP_THRESHOLD;
    };

    /**
     * Animates the transition of rendered values with performance optimizations
     */
    const animate = () => {
      if (!isMounted) {
        return;
      }

      const now = Date.now();

      setMousePos(prev => {
        const newRenderedValues = {
          translateX: lerp(prev.renderedValues.translateX, prev.mappedValues.translateX, MOUSE_ANIMATION.LERP_FACTOR),
          skewX: lerp(prev.renderedValues.skewX, prev.mappedValues.skewX, MOUSE_ANIMATION.LERP_FACTOR),
          contrast: lerp(prev.renderedValues.contrast, prev.mappedValues.contrast, MOUSE_ANIMATION.LERP_FACTOR),
          scale: lerp(prev.renderedValues.scale, prev.mappedValues.scale, MOUSE_ANIMATION.LERP_FACTOR),
          brightness: lerp(prev.renderedValues.brightness, prev.mappedValues.brightness, MOUSE_ANIMATION.LERP_FACTOR)
        };

        // Check if we should continue animating
        const shouldContinue = shouldContinueAnimation(newRenderedValues, prev.mappedValues) &&
                              (now - lastMouseMoveTime < ANIMATION_STOP_DELAY);

        if (shouldContinue && isMounted) {
          animationFrameId = requestAnimationFrame(animate);
        } else {
          isAnimating = false;
          animationFrameId = null;
        }

        return {
          ...prev,
          renderedValues: newRenderedValues
        };
      });
    };

    /**
     * Starts animation if not already running
     */
    const startAnimation = () => {
      if (!isAnimating && isMounted) {
        isAnimating = true;
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    /**
     * Handles mouse movement events with throttling
     * @param {MouseEvent} e - Mouse event object
     */
    const handleMouseMove = (e) => {
      if (!isMounted) {
        return;
      }

      const x = e.clientX;
      const y = e.clientY;
      const mappedValues = updateMappedValues(x);
      lastMouseMoveTime = Date.now();

      setMousePos(prev => ({
        x,
        y,
        mappedValues,
        renderedValues: prev.renderedValues // Keep current rendered values, let animation handle updates
      }));

      startAnimation();
    };

    // Throttle mouse move events for better performance
    const throttledMouseMove = (e) => {
      if (!throttleTimeout && isMounted) {
        throttleTimeout = setTimeout(() => {
          if (isMounted) {
            handleMouseMove(e);
          }
          throttleTimeout = null;
        }, MOUSE_ANIMATION.MOUSE_THROTTLE_DELAY);
      }
    };

    window.addEventListener('mousemove', throttledMouseMove, { passive: true });

    return () => {
      isMounted = false;

      window.removeEventListener('mousemove', throttledMouseMove);

      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }

      if (throttleTimeout !== null) {
        clearTimeout(throttleTimeout);
        throttleTimeout = null;
      }

      isAnimating = false;
    };
  }, [windowSize, updateMappedValues]);

  return mousePos;
};
