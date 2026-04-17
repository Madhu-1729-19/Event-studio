'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, Play, Camera } from 'lucide-react';

const Gallery = () => {
  const [view, setView] = useState<'folders' | 'content'>('folders');
  const [selectedFolder, setSelectedFolder] = useState<'photos' | 'videos' | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const photos = [
    'A1.png', 'A2.jpg', 'A3.jpg', 'A4.jpg', 'A5.jpg',
    'B1.png', 'B2.png', 'B3.png', 'B4.png', 'B5.png',
    'B6.png', 'B7.png', 'B8.png', 'B9.png', 'B10.png',
    'B11.jpg', 'B12.png', 'B13.png', 'B14.png'
  ];

  const videos = [
    'YouCut_20240624_143023170.mp4',
    'YouCut_20250304_115719386.mp4'
  ];

  const openFolder = (type: 'photos' | 'videos') => {
    setSelectedFolder(type);
    setView('content');
    window.scrollTo({ top: document.getElementById('gallery-section')?.offsetTop || 0, behavior: 'smooth' });
  };

  const closeFolder = () => {
    setView('folders');
    setSelectedFolder(null);
  };

  return (
    <section id="gallery" className="gallery-section">
      <div id="gallery-section" />
      <div className="container">
        <header className="gallery-header">
          <span className="badge">STUDIO ARCHIVES</span>
          <h2>Our Creations</h2>
        </header>

        <AnimatePresence mode="wait">
          {view === 'folders' ? (
            <motion.div 
              key="folders"
              className="folders-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div 
                className="folder-card"
                whileHover={{ y: -10 }}
                onClick={() => openFolder('photos')}
              >
                <div className="folder-preview">
                  <img src="/media/GAllERy/B14.png" alt="Albums Thumbnail" />
                  <div className="folder-overlay">
                    <Camera size={28} />
                  </div>
                </div>
                <div className="folder-info">
                  <h3>Albums</h3>
                  <p>{photos.length} Ordered Frames</p>
                </div>
              </motion.div>

              <motion.div 
                className="folder-card"
                whileHover={{ y: -10 }}
                onClick={() => openFolder('videos')}
              >
                <div className="folder-preview video-preview">
                  <video src="/media/videos/YouCut_20250304_115719386.mp4" muted loop onMouseOver={e => e.currentTarget.play()} onMouseOut={e => {e.currentTarget.pause(); e.currentTarget.currentTime = 0;}} />
                  <div className="folder-overlay">
                    <Play size={28} />
                  </div>
                </div>
                <div className="folder-info">
                  <h3>Cinematic Glimpse</h3>
                  <p>{videos.length} Professional Films</p>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div 
              key="content"
              className="content-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="view-controls">
                <button className="back-btn" onClick={closeFolder}>
                  <ChevronLeft size={16} /> BACK TO ARCHIVES
                </button>
                <div className="active-label">
                  {selectedFolder === 'photos' ? 'CHRONOLOGICAL ALBUMS' : 'CINEMATIC MOTION FILMS'}
                </div>
              </div>

              <div className="one-after-another-list">
                {selectedFolder === 'photos' ? (
                  photos.map((img, i) => (
                    <motion.div 
                      key={i} 
                      className="media-strip-item"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                    >
                      <div className="ratio-container">
                        <img 
                          src={`/media/GAllERy/${img}`} 
                          alt={`Capture ${img}`} 
                          className="original-img"
                          onClick={() => setSelectedImage(`/media/GAllERy/${img}`)}
                        />
                      </div>
                      <div className="img-metadata">{img.split('.')[0]}</div>
                    </motion.div>
                  ))
                ) : (
                  videos.map((vid, i) => (
                    <motion.div 
                      key={i} 
                      className="media-strip-item"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                    >
                      <div className="video-strip-container">
                        <video controls src={`/media/videos/${vid}`} />
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <button className="close-lightbox" onClick={() => setSelectedImage(null)}>
              <X size={24} />
            </button>
            <img src={selectedImage} alt="Fullscreen View" className="lightbox-img" />
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .gallery-section {
          background: #000;
          padding: 8rem 0;
          min-height: 100vh;
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .gallery-header {
          text-align: center;
          margin-bottom: 6rem;
        }

        .badge {
          font-size: 9px;
          letter-spacing: 0.5em;
          color: var(--gold);
          text-transform: uppercase;
          margin-bottom: 1rem;
          display: block;
        }

        h2 {
          font-family: 'Cinzel', serif;
          font-size: clamp(2rem, 5vw, 4rem);
          color: #fff;
          letter-spacing: 0.15em;
        }

        .folders-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 3rem;
          max-width: 900px;
          margin: 0 auto;
        }

        .folder-card {
          cursor: pointer;
          transition: all 0.4s ease;
          background: #080808;
          border: 1px solid rgba(255,255,255,0.05);
          display: flex;
          flex-direction: column;
        }

        .folder-preview {
          width: 100%;
          aspect-ratio: 4 / 5;
          overflow: hidden;
          position: relative;
        }

        .folder-preview img, .folder-preview video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .folder-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          opacity: 0.3;
          transition: 0.3s;
        }

        .folder-card:hover .folder-overlay { opacity: 0.7; }

        .folder-info { padding: 2rem; text-align: center; }
        .folder-info h3 { font-family: 'Cinzel', serif; font-size: 1.4rem; color: var(--gold); margin-bottom: 0.5rem; }
        .folder-info p { font-size: 10px; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 0.25em; }

        /* One After Another List View */
        .view-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 5rem;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          padding-bottom: 2rem;
        }

        .back-btn {
          background: transparent;
          border: none;
          color: var(--gold);
          font-size: 10px;
          letter-spacing: 0.3em;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .one-after-another-list {
          display: flex;
          flex-direction: column;
          gap: 6rem;
          align-items: center;
        }

        .media-strip-item {
          width: 100%;
          max-width: 1200px;
          position: relative;
        }

        .ratio-container {
          width: 100%;
          display: flex;
          justify-content: center;
          background: #111;
          box-shadow: 0 40px 80px rgba(0,0,0,0.8);
        }

        .original-img {
          max-width: 100%;
          height: auto;
          display: block;
          cursor: pointer;
          transition: opacity 0.3s;
        }

        .original-img:hover { opacity: 0.9; }

        .img-metadata {
          position: absolute;
          bottom: -2rem;
          right: 0;
          font-size: 9px;
          letter-spacing: 0.3em;
          color: rgba(255,255,255,0.25);
          text-transform: uppercase;
        }

        .video-strip-container {
          width: 100%;
          box-shadow: 0 40px 80px rgba(0,0,0,0.8);
        }

        .video-strip-container video {
          width: 100%;
          height: auto;
          display: block;
        }

        /* Lightbox */
        .lightbox {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.98);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }

        .lightbox-img { max-width: 100%; max-height: 95vh; object-fit: contain; }
        .close-lightbox { position: absolute; top: 2rem; right: 2rem; background: transparent; border: none; color: #fff; cursor: pointer; }

        @media (max-width: 768px) {
          .one-after-another-list { gap: 4rem; }
          .folders-grid { grid-template-columns: 1fr; }
          .media-strip-item { max-width: 100%; }
        }
      `}</style>
    </section>
  );
};

export default Gallery;
