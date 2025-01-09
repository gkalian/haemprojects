import { useState, useEffect, useCallback } from 'react';
import { useWindowSize } from './useWindowSize';

const calculateValues = {
  mappedX: (mouseX, windowWidth) =>
    (((mouseX / windowWidth) * 2 - 1) * 40 * windowWidth) / 100,

  mappedSkew: (mouseX, windowWidth) =>
    ((mouseX / windowWidth) * 2 - 1) * 3,

  mappedContrast: (mouseX, windowWidth) => {
    const centerContrast = 100;
    const edgeContrast = 330;
    const t = Math.abs((mouseX / windowWidth) * 2 - 1);
    const factor = Math.pow(t, 2);
    return centerContrast - factor * (centerContrast - edgeContrast);
  },

  mappedScale: (mouseX, windowWidth) => {
    const centerScale = 1;
    const edgeScale = 0.95;
    return centerScale - Math.abs((mouseX / windowWidth) * 2 - 1) * (centerScale - edgeScale);
  },

  mappedBrightness: (mouseX, windowWidth) => {
    const centerBrightness = 100;
    const edgeBrightness = 50;
    const t = Math.abs((mouseX / windowWidth) * 2 - 1);
    const factor = Math.pow(t, 1.5);
    return centerBrightness - factor * (centerBrightness - edgeBrightness);
  }
};

const lerp = (a, b, n) => (1 - n) * a + n * b;

export const useMousePosition = () => {
  const windowSize = useWindowSize();
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

  const updateMappedValues = useCallback((x) => ({
    translateX: calculateValues.mappedX(x, windowSize.width),
    skewX: calculateValues.mappedSkew(x, windowSize.width),
    contrast: calculateValues.mappedContrast(x, windowSize.width),
    scale: calculateValues.mappedScale(x, windowSize.width),
    brightness: calculateValues.mappedBrightness(x, windowSize.width)
  }), [windowSize]);

  useEffect(() => {
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

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [windowSize, updateMappedValues]);

  useEffect(() => {
    let animationFrameId;

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

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return mousePos;
};
