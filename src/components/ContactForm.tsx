'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ContactForm = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus('success');
        (e.target as any).reset();
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  }

  return (
    <section id="contact" className="contact-section">
      <div className="contact-inner">
        <div className="contact-deco">
          <div className="deco-line"></div>
          <div className="deco-diamond"></div>
          <div className="deco-line"></div>
        </div>

        <motion.h2 
          className="contact-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Let's Create Together
        </motion.h2>
        
        <p className="contact-sub">Tell us your dream. We'll build the rest.</p>

        <motion.form 
          className="contact-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="form-row">
            <input className="form-input" name="brideName" type="text" placeholder="Bride Name" required />
            <input className="form-input" name="bridegroomName" type="text" placeholder="Bridegroom Name" required />
          </div>
          <div className="form-row">
            <input className="form-input" name="phoneNumber" type="tel" placeholder="Phone Number" required />
            <input className="form-input" name="marriageDate" type="date" placeholder="Marriage Date" required />
          </div>
          <textarea 
            className="form-input form-textarea" 
            name="noteForGift" 
            placeholder="Note for gift / Event Details…"
          ></textarea>
          
          <button 
            type="submit" 
            className="btn-primary form-submit"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Sending...' : status === 'success' ? 'Sent Successfully!' : 'Begin Your Journey'}
          </button>
          
          {status === 'error' && <p className="error-msg">Something went wrong. Please try again.</p>}
        </motion.form>

        <div className="gold-divider" style={{ marginTop: '4rem' }}><span>✦</span></div>

        <div className="contact-details">
          <div className="detail-item">
            <p className="detail-label">CALL US</p>
            <p className="detail-value">7337465983</p>
          </div>
          <div className="detail-item">
            <p className="detail-label">EMAIL</p>
            <p className="detail-value">pichiguntlamadhu172@gmail.com</p>
          </div>
          <div className="detail-item">
            <p className="detail-label">STUDIO</p>
            <p className="detail-value">Kurnool, Andhra Pradesh</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .contact-section {
          background: radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,168,76,0.06), transparent);
          text-align: center;
        }

        .contact-inner {
          max-width: 700px;
          margin: 0 auto;
          padding: 7rem 2rem;
        }

        .contact-deco {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .deco-line { width: 60px; height: 1px; background: rgba(201,168,76,0.4); }
        .deco-diamond {
          width: 8px; height: 8px;
          border: 1px solid var(--gold);
          transform: rotate(45deg);
        }

        .contact-title {
          font-family: 'Cinzel', serif;
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 600;
          background: linear-gradient(135deg, var(--ivory), var(--gold-pale));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 1rem;
          line-height: 1.1;
        }

        .contact-sub {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 1.3rem;
          color: var(--text-muted);
          margin-bottom: 3rem;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .form-input {
          width: 100%;
          padding: 14px 18px;
          background: rgba(201,168,76,0.04);
          border: 1px solid rgba(201,168,76,0.2);
          color: var(--ivory);
          font-family: 'Jost', sans-serif;
          font-size: 14px;
          outline: none;
          transition: border-color 0.3s ease, background 0.3s ease;
        }

        .form-input:focus {
          border-color: var(--gold);
          background: rgba(201,168,76,0.07);
        }

        .form-textarea {
          min-height: 120px;
          resize: vertical;
        }

        .form-submit {
          width: 100%;
          padding: 18px;
          font-size: 13px;
          letter-spacing: 0.3em;
        }

        .contact-details {
          display: flex;
          justify-content: center;
          gap: 3rem;
          margin-top: 2rem;
          flex-wrap: wrap;
        }

        .detail-item {
          text-align: center;
        }

        .detail-label {
          font-size: 10px;
          letter-spacing: 0.3em;
          color: var(--text-muted);
          margin-bottom: 0.5rem;
          text-transform: uppercase;
        }

        .detail-value {
          color: var(--gold-pale);
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.1rem;
        }

        .error-msg {
          color: #ff4444;
          font-size: 12px;
          margin-top: 10px;
        }

        @media (max-width: 600px) {
          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default ContactForm;
