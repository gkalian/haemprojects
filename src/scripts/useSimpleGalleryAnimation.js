import { useEffect, useRef } from "react";

/**
 * Simplified gallery animation using CSS transforms
 * Works with the existing rotated grid layout
 * @param {Object} galleryRef - Reference to the gallery container
 */
const useSimpleGalleryAnimation = (galleryRef) => {
  const animationFrameRef = useRef();
  const targetValues = useRef({ x: 0, y: 0 });
  const currentValues = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!galleryRef.current) return;

    const gallery = galleryRef.current;
    const items = gallery.querySelectorAll(".gallery-item");
    let isAnimating = false;

    const handleMouseMove = (e) => {
      if (!galleryRef.current) return;

      const rect = gallery.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate mouse position relative to center (-1 to 1)
      const x = (e.clientX - centerX) / (rect.width / 2);
      const y = (e.clientY - centerY) / (rect.height / 2);

      // Update target values with reduced intensity for smoother effect
      targetValues.current = {
        x: x * 10, // Reduced from 20 to 10 for subtler movement
        y: y * 5, // Reduced from 10 to 5 for subtler movement
      };

      if (!isAnimating) {
        isAnimating = true;
        animate();
      }
    };

    const animate = () => {
      // Smoothly interpolate current values towards target values
      currentValues.current.x +=
        (targetValues.current.x - currentValues.current.x) * 0.1;
      currentValues.current.y +=
        (targetValues.current.y - currentValues.current.y) * 0.1;

      // Calculate if we need to continue animating
      const dx = Math.abs(targetValues.current.x - currentValues.current.x);
      const dy = Math.abs(targetValues.current.y - currentValues.current.y);

      // Apply transforms to each item with slight delay based on position
      items.forEach((item, index) => {
        const row = Math.floor(index / 10); // Assuming 10 items per row
        const col = index % 10;

        // Apply subtle parallax effect based on position in grid
        const delayX = (col - 4.5) * 0.02; // Center the effect
        const delayY = (row - 3.5) * 0.02; // Center the effect

        const x = currentValues.current.x * (1 + delayX);
        const y = currentValues.current.y * (1 + delayY);

        // Apply transform with rotation and translation
        item.style.transform = `translate3d(${x}px, ${y}px, 0)`;

        // Add subtle scale effect based on mouse position
        const distance = Math.sqrt(x * x + y * y) / 50;
        item.style.transform += ` scale(${1 + distance * 0.05})`;
      });

      // Continue animating if we're still moving
      if (dx > 0.1 || dy > 0.1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        isAnimating = false;
      }
    };

    // Add event listener with passive true for better performance
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [galleryRef]);

  // Clean up animation frame on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);
};

export default useSimpleGalleryAnimation;
