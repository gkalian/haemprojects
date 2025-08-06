import { useState, useEffect } from "react";

/**
 * Simplified mouse position hook with basic parallax effect
 * @returns {Object} - Mouse position and normalized values
 */
const useSimpleMousePosition = () => {
  const [mousePos, setMousePos] = useState({
    x: 0,
    y: 0,
    // Normalized values between -1 and 1
    nx: 0,
    ny: 0,
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = e.clientX;
      const y = e.clientY;

      // Normalize values between -1 and 1
      const nx = (x / innerWidth) * 2 - 1;
      const ny = (y / innerHeight) * 2 - 1;

      setMousePos({ x, y, nx, ny });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return mousePos;
};

export default useSimpleMousePosition;
