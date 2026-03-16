import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Only use custom cursor on non-touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName.toLowerCase() === 'button' || 
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('interactable')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "rgba(181, 196, 216, 0.4)", // Liquid silver
      mixBlendMode: "difference",
      filter: "blur(2px)",
      scale: 1,
      boxShadow: "inset 0 0 10px rgba(255, 255, 255, 0.6), 0 0 15px rgba(181, 196, 216, 0.4)"
    },
    hover: {
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      height: 80,
      width: 80,
      backgroundColor: "rgba(181, 196, 216, 0.8)",
      mixBlendMode: "difference",
      filter: "blur(6px)",
      scale: 1.2,
      boxShadow: "inset 0 0 20px rgba(255, 255, 255, 0.8), 0 0 30px rgba(181, 196, 216, 0.6)"
    }
  };

  // Hide on small devices
  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  return (
    <>
      <svg className="hidden">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
      <motion.div
        variants={variants}
        animate={isHovering ? "hover" : "default"}
        transition={{ 
          type: "spring", 
          stiffness: 120, // Lower stiffness for more 'liquid' drag
          damping: 15,
          mass: 0.8
        }}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
        style={{ filter: "url(#goo)" }}
      />
    </>
  );
}
