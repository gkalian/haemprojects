/**
 * Utility functions for handling images in the application
 */

/**
 * Creates a preloaded image element to ensure the image is cached
 * @param {string} url - The URL of the image to preload
 * @returns {Promise<HTMLImageElement>} A promise that resolves with the loaded image
 */
export const preloadImage = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.crossOrigin = 'Anonymous'; // Handle CORS if needed
    
    img.onload = () => resolve(img);
    img.onerror = (err) => {
      console.warn(`Failed to load image: ${url}`, err);
      // Return a transparent pixel as fallback
      const fallback = new Image();
      fallback.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
      resolve(fallback);
    };
  });
};

/**
 * Gets a safe URL for an image, handling both local and external URLs
 * @param {string} url - The image URL
 * @returns {string} A safe URL that works in both dev and production
 */
export const getSafeImageUrl = (url) => {
  // If it's already a data URL or absolute URL, return as is
  if (url.startsWith('data:') || url.startsWith('http')) {
    return url;
  }
  
  // For local development, prepend the base URL if needed
  if (process.env.NODE_ENV === 'development') {
    return new URL(url, import.meta.url).href;
  }
  
  // For production, ensure the URL is absolute
  return url.startsWith('/') ? url : `/${url}`;
};
