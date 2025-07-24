/**
 * Animation constants for mouse position effects and GSAP animations
 * Centralized configuration for better maintainability
 */

// Mouse position animation constants
export const MOUSE_ANIMATION = {
  // Lerp interpolation factor for smooth transitions
  LERP_FACTOR: 0.1,
  
  // Threshold for stopping animation when values are close enough
  LERP_THRESHOLD: 0.01,
  
  // Delay before stopping animation after last mouse movement (ms)
  ANIMATION_STOP_DELAY: 100,
  
  // Throttle delay for mouse move events (ms) - ~60fps
  MOUSE_THROTTLE_DELAY: 16
};

// Visual effects calculation constants
export const VISUAL_EFFECTS = {
  // Translation effect multiplier (percentage of window width)
  TRANSLATE_MULTIPLIER: 40,
  
  // Maximum skew angle in degrees
  MAX_SKEW_ANGLE: 3,
  
  // Contrast values
  CENTER_CONTRAST: 100,
  EDGE_CONTRAST: 330,
  
  // Scale values
  CENTER_SCALE: 1,
  EDGE_SCALE: 0.95,
  
  // Brightness values
  CENTER_BRIGHTNESS: 100,
  EDGE_BRIGHTNESS: 60
};

// Gallery grid animation constants
export const GALLERY_ANIMATION = {
  // Row multiplier reduction factor
  ROW_MULTIPLIER_FACTOR: 0.3,
  
  // Threshold for significant value changes to trigger animation
  CHANGE_THRESHOLD: 0.5,
  
  // GSAP animation duration (seconds)
  DURATION: 0.8,
  
  // GSAP easing function
  EASE: 'power2.out'
};

// Performance optimization constants
export const PERFORMANCE = {
  // Passive event listener options
  PASSIVE_LISTENER_OPTIONS: { passive: true },
  
  // Animation frame priorities
  ANIMATION_PRIORITY: {
    HIGH: 'user-blocking',
    NORMAL: 'user-visible',
    LOW: 'background'
  }
};
