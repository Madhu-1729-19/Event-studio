'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [inquiries, setInquiries] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'inquiries' | 'bookings'>('inquiries');

  // Edit states for booking table
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<any>({});

  // Edit states for inquiry table
  const [editingInqId, setEditingInqId] = useState<number | null>(null);
  const [editInqForm, setEditInqForm] = useState<any>({});

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      setIsLoggedIn(true);
      localStorage.setItem('isAdmin', 'true');
      fetchData();
    } else {
      setError('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isAdmin');
  };

  const fetchData = async () => {
    try {
      const resInq = await fetch('/api/inquiry');
      if (resInq.ok) setInquiries(await resInq.json());

      const resBk = await fetch('/api/bookings');
      if (resBk.ok) setBookings(await resBk.json());
    } catch (err) {
      console.error(err);
    }
  };

  const deleteInquiry = async (id: number) => {
    if (!confirm('Delete this inquiry?')) return;
    await fetch(`/api/inquiry/${id}`, { method: 'DELETE' });
    fetchData();
  };

  const startInquiryEditing = (inq: any) => {
    setEditingInqId(inq.id);
    setEditInqForm({ ...inq, marriageDate: new Date(inq.marriageDate).toISOString().split('T')[0] });
  };

  const saveInquiryEdit = async () => {
    try {
      await fetch('/api/inquiry', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editInqForm)
      });
      setEditingInqId(null);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const copyToBooking = async (inq: any) => {
    try {
      await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brideName: inq.brideName,
          bridegroomName: inq.bridegroomName,
          phoneNumber: inq.phoneNumber,
          marriageDate: inq.marriageDate,
          noteForGift: inq.noteForGift,
          time: '',
          payment: '',
          requirements: ''
        })
      });
      alert('Copied to bookings!');
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteBooking = async (id: number) => {
    if (!confirm('Delete this booking?')) return;
    await fetch(`/api/bookings/${id}`, { method: 'DELETE' });
    fetchData();
  };

  const startEditing = (bk: any) => {
    setEditingId(bk.id);
    setEditForm(bk);
  };

  const saveEdit = async () => {
    try {
      await fetch('/api/bookings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm)
      });
      setEditingId(null);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="admin-login-wrapper">
        <motion.div 
          className="login-box"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2>Studio Admin Login</h2>
          <form onSubmit={handleLogin}>
            <input 
              type="text" 
              placeholder="Username" 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              className="admin-input"
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              className="admin-input"
            />
            {error && <p className="error-text">{error}</p>}
            <button type="submit" className="admin-btn">Login</button>
          </form>
        </motion.div>
        
        <style jsx>{`
          .admin-login-wrapper {
            height: 100vh; display: flex; align-items: center; justify-content: center;
            background: var(--dark); color: white;
          }
          .login-box {
            background: #111; padding: 3rem; border: 1px solid var(--gold);
            text-align: center; width: 400px;
          }
          .login-box h2 {
            font-family: 'Cinzel', serif; color: var(--gold); margin-bottom: 2rem;
          }
          .admin-input {
            width: 100%; padding: 12px; margin-bottom: 1rem;
            background: #222; border: 1px solid #444; color: white;
          }
          .admin-btn {
            width: 100%; padding: 14px; background: var(--gold); color: black;
            border: none; cursor: pointer; text-transform: uppercase; letter-spacing: 2px;
            font-weight: bold; margin-top: 1rem;
          }
          .error-text { color: red; font-size: 0.9rem; margin-bottom: 1rem; }
        `}</style>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <nav className="admin-nav">
        <div className="nav-brand">LakshmanPadma Admin</div>
        <div className="nav-tabs">
          <button className={`tab ${activeTab === 'inquiries' ? 'active' : ''}`} onClick={() => setActiveTab('inquiries')}>INQUIRIES</button>
          <button className={`tab ${activeTab === 'bookings' ? 'active' : ''}`} onClick={() => setActiveTab('bookings')}>BOOKINGS</button>
        </div>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </nav>

      <div className="dashboard-content">
        {activeTab === 'inquiries' && (
          <div className="table-section">
            <div className="section-header">
              <h2>New Inquiries</h2>
              <p>Submitted from the contact form</p>
            </div>
            <div className="table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th><th>Bride</th><th>Groom</th><th>Phone</th><th>Date</th><th>Note</th><th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {inquiries.map(inq => (
                    <tr key={inq.id}>
                      <td>{inq.id}</td>
                      {editingInqId === inq.id ? (
                        <>
                          <td><input className="edit-input" value={editInqForm.brideName || ''} onChange={e => setEditInqForm({...editInqForm, brideName: e.target.value})} /></td>
                          <td><input className="edit-input" value={editInqForm.bridegroomName || ''} onChange={e => setEditInqForm({...editInqForm, bridegroomName: e.target.value})} /></td>
                          <td><input className="edit-input" value={editInqForm.phoneNumber || ''} onChange={e => setEditInqForm({...editInqForm, phoneNumber: e.target.value})} /></td>
                          <td><input type="date" className="edit-input" value={editInqForm.marriageDate || ''} onChange={e => setEditInqForm({...editInqForm, marriageDate: e.target.value})} /></td>
                          <td><input className="edit-input" value={editInqForm.noteForGift || ''} onChange={e => setEditInqForm({...editInqForm, noteForGift: e.target.value})} /></td>
                          <td>
                            <button onClick={saveInquiryEdit} className="action-btn save">Save</button>
                            <button onClick={() => setEditingInqId(null)} className="action-btn cancel">Cancel</button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td>{inq.brideName}</td>
                          <td>{inq.bridegroomName}</td>
                          <td>{inq.phoneNumber}</td>
                          <td>{new Date(inq.marriageDate).toLocaleDateString()}</td>
                          <td>{inq.noteForGift}</td>
                          <td>
                            <button onClick={() => copyToBooking(inq)} className="action-btn copy">Copy</button>
                            <button onClick={() => startInquiryEditing(inq)} className="action-btn edit">Edit</button>
                            <button onClick={() => deleteInquiry(inq.id)} className="action-btn delete">Delete</button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                  {inquiries.length === 0 && <tr><td colSpan={7} className="empty-text">No inquiries found.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="table-section">
            <div className="section-header">
              <h2>Confirmed Bookings</h2>
              <p>Manage event details, payment, and requirements</p>
            </div>
            <div className="table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th><th>Couple</th><th>Phone</th><th>Date</th>
                    <th>Time</th><th>Payment</th><th>Req (Camera/Video)</th><th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map(bk => (
                    <tr key={bk.id}>
                      <td>{bk.id}</td>
                      <td>{bk.brideName} & {bk.bridegroomName}</td>
                      <td>{bk.phoneNumber}</td>
                      <td>{new Date(bk.marriageDate).toLocaleDateString()}</td>

                      {/* Editable Fields */}
                      {editingId === bk.id ? (
                        <>
                          <td><input className="edit-input" value={editForm.time || ''} onChange={e => setEditForm({...editForm, time: e.target.value})} placeholder="e.g. 10:00 AM" /></td>
                          <td><input className="edit-input" value={editForm.payment || ''} onChange={e => setEditForm({...editForm, payment: e.target.value})} placeholder="e.g. ₹50,000" /></td>
                          <td><input className="edit-input" value={editForm.requirements || ''} onChange={e => setEditForm({...editForm, requirements: e.target.value})} placeholder="e.g. Drone, Candid" /></td>
                          <td>
                            <button onClick={saveEdit} className="action-btn save">Save</button>
                            <button onClick={() => setEditingId(null)} className="action-btn cancel">Cancel</button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td>{bk.time || '-'}</td>
                          <td>{bk.payment || '-'}</td>
                          <td>{bk.requirements || '-'}</td>
                          <td>
                            <button onClick={() => startEditing(bk)} className="action-btn edit">Edit</button>
                            <button onClick={() => deleteBooking(bk.id)} className="action-btn delete">Delete</button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                  {bookings.length === 0 && <tr><td colSpan={8} className="empty-text">No bookings found.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .admin-dashboard {
          min-height: 100vh; background: var(--dark); color: white;
          font-family: 'Jost', sans-serif;
        }
        .admin-nav {
          display: flex; justify-content: space-between; align-items: center;
          padding: 1.5rem 3rem; background: #111; border-bottom: 1px solid var(--gold);
        }
        .nav-brand { font-family: 'Cinzel', serif; color: var(--gold); font-size: 1.5rem; }
        .nav-tabs { display: flex; gap: 1rem; }
        .tab {
          background: none; border: none; color: #888; font-size: 0.9rem;
          letter-spacing: 2px; cursor: pointer; padding: 0.5rem 1rem; border-bottom: 2px solid transparent;
        }
        .tab.active { color: white; border-bottom-color: var(--gold); }
        .logout-btn { background: none; border: 1px solid #666; color: white; padding: 0.5rem 1rem; cursor: pointer; }
        
        .dashboard-content { padding: 3rem; max-width: 1400px; margin: 0 auto; }
        .section-header { margin-bottom: 2rem; }
        .section-header h2 { font-family: 'Cinzel', serif; color: var(--gold); font-size: 2rem; margin-bottom: 0.5rem; }
        .section-header p { color: #888; font-size: 0.9rem; }

        .table-wrapper { overflow-x: auto; background: #111; border: 1px solid #333; }
        .admin-table { width: 100%; border-collapse: collapse; text-align: left; }
        .admin-table th, .admin-table td { padding: 1rem; border-bottom: 1px solid #333; }
        .admin-table th { background: #1a1a1a; color: var(--gold); font-weight: 500; letter-spacing: 1px; font-size: 0.85rem; text-transform: uppercase; }
        .admin-table tr:hover { background: #181818; }
        .empty-text { text-align: center; color: #666; padding: 3rem !important; }

        .edit-input { width: 100%; padding: 8px; background: #222; border: 1px solid #555; color: white; }
        
        .action-btn { background: none; border: none; cursor: pointer; font-size: 0.8rem; margin-right: 0.8rem; text-transform: uppercase; font-weight: bold; }
        .action-btn.copy { color: #4dabf7; }
        .action-btn.delete { color: #ff6b6b; }
        .action-btn.edit { color: var(--gold); }
        .action-btn.save { color: #51cf66; }
        .action-btn.cancel { color: #888; }
      `}</style>
    </div>
  );
}
