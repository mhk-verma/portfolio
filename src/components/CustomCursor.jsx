import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Trail particle component
function TrailParticle({ x, y, delay }) {
  return (
    <motion.div
      className="fixed top-0 left-0 w-2 h-2 bg-[#A59ADB] rounded-full pointer-events-none z-40 hidden md:block"
      initial={{ 
        x: x - 4, 
        y: y - 4, 
        opacity: 0.6,
        scale: 1
      }}
      animate={{
        opacity: 0,
        scale: 0
      }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: "easeOut"
      }}
    />
  );
}

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    // Check if device supports hover (desktop)
    const hasHover = window.matchMedia('(hover: hover)').matches;
    if (!hasHover) return;

    const updateMousePosition = (e) => {
      const newX = e.clientX;
      const newY = e.clientY;
      
      setMousePosition({ x: newX, y: newY });
      
      // Add to trail
      setTrail(prevTrail => {
        const newTrail = [...prevTrail, { x: newX, y: newY, id: Date.now() }];
        if (newTrail.length > 8) {
          newTrail.shift();
        }
        return newTrail;
      });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const handleVisibility = () => setIsVisible(true);

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseenter', handleVisibility);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Add hover listeners to interactive elements
    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea');
      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    // Initial setup and observer for dynamic content
    addHoverListeners();
    
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseenter', handleVisibility);
      window.removeEventListener('mouseleave', handleMouseLeave);
      observer.disconnect();
      
      const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea');
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Trail particles */}
      {trail.map((point, index) => (
        <TrailParticle
          key={point.id}
          x={point.x}
          y={point.y}
          delay={index * 0.05}
        />
      ))}

      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-[#A59ADB] rounded-full pointer-events-none z-50 hidden md:block"
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
        }}
        transition={{
          type: 'spring',
          stiffness: 1000,
          damping: 50,
        }}
      />

      {/* Inner ring */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 border-2 border-[#A59ADB] rounded-full pointer-events-none z-50 hidden md:block"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          scale: isHovering ? 0.8 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 600,
          damping: 30,
        }}
      />

      {/* Outer ring with glow effect */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-[#A59ADB] rounded-full pointer-events-none z-50 hidden md:block"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovering ? 2 : 1.2,
          opacity: isHovering ? 0.8 : 0.4,
          borderColor: isHovering ? '#CE4DDB' : '#A59ADB'
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 25,
        }}
        style={{
          boxShadow: isHovering ? '0 0 20px rgba(139, 0, 0, 0.5)' : 'none'
        }}
      />

      {/* Click effect */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-[#A59ADB] rounded-full pointer-events-none z-50 hidden md:block"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: [0, 2, 0],
          opacity: [0.8, 0, 0]
        }}
        transition={{
          duration: 0.4,
          ease: "easeOut"
        }}
      />
    </>
  );
}
