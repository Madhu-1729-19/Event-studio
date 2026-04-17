'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Hero = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Reveal timing
    const timer = setTimeout(() => setShowContent(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="hero">
      <div className="hero-bg-container">
        <div className="noise-overlay" />
        <div className="gif-background" style={{ backgroundImage: "url('/images/hero.gif')" }} />
        <div className="cinematic-overlay" />
      </div>

      <div className="hero-content">
        <AnimatePresence>
          {showContent && (
            <motion.div 
              className="content-wrapper"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <div className="main-branding">
                <motion.h1 
                  className="heading-main"
                  initial={{ filter: 'blur(30px)', opacity: 0, scale: 0.9 }}
                  animate={{ filter: 'blur(0px)', opacity: 1, scale: 1 }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  LakshmanPadma
                </motion.h1>
                <div className="studio-container">
                  <motion.p 
                    className="subheading-studio"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.8 }}
                  >
                    Event-Studio
                  </motion.p>
                </div>
              </div>

              <motion.div 
                className="gold-axis"
                initial={{ width: 0 }}
                animate={{ width: '100px' }}
                transition={{ duration: 1, delay: 1.2 }}
              />

              <motion.p 
                className="essence-text"
                initial={{ opacity: 0, letterSpacing: '0.2em' }}
                animate={{ opacity: 1, letterSpacing: '0.4em' }}
                transition={{ duration: 1, delay: 1.5 }}
              >
                Where Every Celebration Becomes a Legend
              </motion.p>

              <div className="action-blocks">
                <motion.div 
                  className="action-block"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 2.2 }}
                >
                  <a href="#gallery" className="cta-btn primary">The Gallery</a>
                  <p className="block-note">Explore Our Portfolio</p>
                </motion.div>

                <div className="vertical-divider" />

                <motion.div 
                  className="action-block"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 2.2 }}
                >
                  <a href="#contact" className="cta-btn outline">Contact Us</a>
                  <p className="block-note">Book Your Experience</p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx>{`
        .hero {
          position: relative;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-bg-container {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        .gif-background {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          z-index: 1;
          filter: contrast(1.1) brightness(0.8) saturate(1.1);
        }

        .cinematic-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.8) 100%);
          z-index: 2;
        }

        .noise-overlay {
          position: absolute;
          inset: 0;
          background: url('https://grainy-gradients.vercel.app/noise.svg');
          opacity: 0.05;
          z-index: 3;
          pointer-events: none;
        }

        .hero-content {
          position: relative;
          z-index: 10;
          text-align: center;
          width: 100%;
          max-width: 1200px;
        }

        .heading-main {
          font-family: 'Cinzel', serif;
          font-size: clamp(3rem, 10vw, 8rem);
          font-weight: 700;
          color: #fff;
          text-transform: uppercase;
          line-height: 1;
          letter-spacing: 0.15em;
          animation: final-glow 4s infinite alternate;
        }

        .subheading-studio {
          font-family: 'Jost', sans-serif;
          font-size: clamp(0.9rem, 2.5vw, 1.3rem);
          color: var(--gold-light);
          text-transform: uppercase;
          letter-spacing: 0.6em;
          margin-top: 1rem;
        }

        @keyframes final-glow {
          0% { text-shadow: 0 0 10px rgba(255, 255, 255, 0.4), 0 0 20px rgba(201, 168, 76, 0.2); }
          100% { text-shadow: 0 0 20px rgba(255, 255, 255, 0.7), 0 0 40px rgba(201, 168, 76, 0.5), 0 0 60px rgba(201, 168, 76, 0.3); }
        }

        .gold-axis {
          height: 1px;
          background: var(--gold);
          margin: 2.5rem auto;
          opacity: 0.6;
        }

        .essence-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1rem, 2.5vw, 1.8rem);
          font-style: italic;
          color: var(--gold-pale);
          margin-bottom: 4rem;
          text-transform: uppercase;
        }

        .action-blocks {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 4rem;
          margin-top: 2rem;
        }

        .action-block {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }

        .vertical-divider {
          width: 1px;
          height: 80px;
          background: rgba(255, 255, 255, 0.1);
        }

        .block-note {
          font-size: 9px;
          color: rgba(255, 255, 255, 0.4);
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }

        .cta-btn {
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          padding: 16px 45px;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          text-decoration: none;
        }

        .primary {
          background: var(--gold);
          color: var(--deep);
        }

        .primary:hover {
          background: var(--gold-light);
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(201, 168, 76, 0.3);
        }

        .outline {
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: #fff;
        }

        .outline:hover {
          border-color: var(--gold);
          color: var(--gold);
          background: rgba(201, 168, 76, 0.05);
          transform: translateY(-5px);
        }

        @media (max-width: 768px) {
          .action-blocks {
            flex-direction: column;
            gap: 3rem;
          }
          .vertical-divider {
            width: 50px;
            height: 1px;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
