'use client';

import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const categories = [
    { image: '/images/couple.png', name: 'Pre-wedding Shoot', delay: 0 },
    { image: '/images/birthday.png', name: 'Birthday Celebration', delay: 0.1 },
    { image: '/images/stage.webp', name: 'Decoration', delay: 0.2, special: 'glow-bg' },
    { icon: '📸🎬', name: 'Photos&Videos', delay: 0.3, special: 'glow-text' }
  ];

  return (
    <section className="about-section">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="badge">EXPERIENCE EXCELLENCE</span>
          <h2>Our Events</h2>
          <p className="description">
            From the intimate promise of a pre-wedding shoot to the grand scale of professional cinematography, 
            we specialize in capturing the heartbeat of every celebration.
          </p>
        </motion.div>

        <div className="category-grid">
          {categories.map((cat, index) => (
            <motion.div 
              key={index}
              className={`category-card ${cat.special || ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: cat.delay, duration: 0.6 }}
            >
              <div className="category-media">
                {cat.image ? (
                  <div className="image-wrapper">
                    <img src={cat.image} alt={cat.name} className="category-img" />
                    {cat.special === 'glow-bg' && <div className="glow-sphere" />}
                  </div>
                ) : (
                  <div className={`category-icon ${cat.special === 'glow-text' ? 'text-glow' : ''}`}>
                    {cat.icon}
                  </div>
                )}
              </div>
              <h3>{cat.name}</h3>
              <div className="line"></div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .about-section {
          padding: 8rem 2rem;
          background: #000;
          color: #fff;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-header {
          text-align: center;
          margin-bottom: 6rem;
        }

        .badge {
          font-size: 10px;
          letter-spacing: 0.4em;
          color: var(--gold);
          text-transform: uppercase;
          margin-bottom: 1.5rem;
          display: block;
        }

        h2 {
          font-family: 'Cinzel', serif;
          font-size: clamp(2.5rem, 5vw, 4rem);
          margin-bottom: 2rem;
          letter-spacing: 0.1em;
        }

        .description {
          max-width: 700px;
          margin: 0 auto;
          color: var(--text-muted);
          font-size: 1.1rem;
          line-height: 1.8;
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
        }

        .category-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .category-card {
          padding: 3rem 1.5rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(201, 168, 76, 0.1);
          text-align: center;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          overflow: hidden;
        }

        .category-card:hover {
          background: rgba(201, 168, 76, 0.05);
          border-color: var(--gold);
          transform: translateY(-10px);
        }

        .category-media {
          height: 140px;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 2rem;
          position: relative;
        }

        .image-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .category-img {
          max-height: 120px;
          max-width: 100%;
          object-fit: contain;
          z-index: 2;
          /* Attempt to help with background removal feel if it's black */
          mix-blend-mode: screen; 
          filter: drop-shadow(0 0 15px rgba(201, 168, 76, 0.4));
        }

        /* Decoration Glow Sphere */
        .glow-sphere {
          position: absolute;
          width: 80px;
          height: 80px;
          background: var(--gold);
          filter: blur(40px);
          opacity: 0.4;
          z-index: 1;
          border-radius: 50%;
        }

        .category-icon {
          font-size: 3.5rem;
          position: relative;
          z-index: 2;
        }

        /* Emoji Glow */
        .text-glow {
          text-shadow: 
            0 0 10px rgba(255, 255, 255, 0.4),
            0 0 20px rgba(201, 168, 76, 0.6),
            0 0 40px rgba(201, 168, 76, 0.3);
          animation: emoji-pulse 2s infinite alternate;
        }

        @keyframes emoji-pulse {
          from { transform: scale(1); text-shadow: 0 0 20px rgba(201, 168, 76, 0.4); }
          to { transform: scale(1.05); text-shadow: 0 0 40px rgba(201, 168, 76, 0.8); }
        }

        h3 {
          font-family: 'Cinzel', serif;
          font-size: 1rem;
          letter-spacing: 0.2em;
          margin-bottom: 1.5rem;
          text-transform: uppercase;
          z-index: 2;
        }

        .line {
          width: 30px;
          height: 1.5px;
          background: var(--gold);
          margin-top: auto;
          transition: width 0.4s ease;
          z-index: 2;
        }

        .category-card:hover .line {
          width: 70px;
        }

        @media (max-width: 768px) {
          .about-section { padding: 5rem 1rem; }
          .section-header { margin-bottom: 4rem; }
        }
      `}</style>
    </section>
  );
};

export default About;
