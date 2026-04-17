'use client';

import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import { Heart } from 'lucide-react';

const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  const cursorX = useSpring(0, { damping: 20, stiffness: 250 });
  const cursorY = useSpring(0, { damping: 20, stiffness: 250 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    window.addEventListener('mousemove', moveCursor);
    document.body.classList.add('hide-cursor');

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.body.classList.remove('hide-cursor');
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          pointerEvents: 'none',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '40px',
          height: '40px',
          border: '1px solid var(--gold)',
          borderRadius: '50%',
          background: 'rgba(201, 168, 76, 0.1)',
          backdropFilter: 'blur(2px)',
        }}
      >
        <Heart size={16} fill="var(--gold)" color="var(--gold)" />
      </motion.div>
    </>
  );
};

export default CustomCursor;
