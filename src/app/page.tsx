'use client';

import CustomCursor from '@/components/CustomCursor';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Gallery from '@/components/Gallery';
import ContactForm from '@/components/ContactForm';

export default function Home() {
  return (
    <main>
      <CustomCursor />
      
      {/* Navigation (Simple version as in original) */}
      <nav id="navbar">
        <div className="nav-logo">
          <img src="/images/logo.png" alt="LakshmanPadma Logo" className="logo-img" />
        </div>
        <ul className="nav-links">
          <li><a href="#about">Events</a></li>
          <li><a href="#gallery">Gallery</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="/admin" style={{ color: 'var(--gold)', fontWeight: 'bold' }}>Admin</a></li>
        </ul>
      </nav>

      <Hero />
      <div id="about">
        <About />
      </div>
      <Gallery />
      <ContactForm />

      <footer>
        <div className="footer-brand">LakshmanPadma</div>
        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>© 2026 LakshmanPadma Event Studio. All rights reserved.</div>
        <div className="footer-links">
          <a href="#">Instagram</a>
          <a href="#">Facebook</a>
          <a href="#">WhatsApp</a>
        </div>
      </footer>

      <style jsx global>{`
        nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          padding: 1.5rem 3rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: linear-gradient(to bottom, rgba(14, 12, 7, 0.95), transparent);
          transition: background 0.4s ease;
        }

        .nav-logo {
          display: flex;
          align-items: center;
        }

        .logo-img {
          height: 45px;
          width: auto;
          object-fit: contain;
          filter: drop-shadow(0 0 5px rgba(201, 168, 76, 0.2));
          transition: transform 0.3s ease;
        }

        .logo-img:hover {
          transform: scale(1.05);
        }

        .nav-links {
          display: flex;
          gap: 2.5rem;
        }

        .nav-links a {
          font-size: 11px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--ivory);
          text-decoration: none;
          transition: color 0.3s;
          opacity: 0.7;
        }

        .nav-links a:hover {
          color: var(--gold);
          opacity: 1;
        }

        footer {
          border-top: 1px solid rgba(201, 168, 76, 0.1);
          padding: 3rem 2rem;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          max-width: 1200px;
          margin: 0 auto;
          font-size: 12px;
          color: var(--text-muted);
          letter-spacing: 0.1em;
        }

        .footer-brand {
          font-family: 'Cinzel', serif;
          color: var(--gold);
          font-size: 1rem;
        }

        .footer-links {
          display: flex;
          gap: 2rem;
        }

        .footer-links a {
          color: var(--text-muted);
          text-decoration: none;
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          transition: color 0.3s;
        }

        .footer-links a:hover {
          color: var(--gold);
        }

        @media (max-width: 768px) {
          nav {
            padding: 1rem 1.5rem;
          }
          .nav-links {
            display: none;
          }
        }
      `}</style>
    </main>
  );
}
