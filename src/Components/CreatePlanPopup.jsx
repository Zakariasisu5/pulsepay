import React, { useState } from "react";
import '../index.css';

export default function CreatePlanPopup({ show, onClose, onCreate }) {
  const [form, setForm] = useState({ name: '', price: '', desc: '' });

  const handleFormChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleCreatePlan = e => {
    e.preventDefault();
    if (!form.name.trim() || !form.price.trim()) return;
    onCreate({ ...form });
    setForm({ name: '', price: '', desc: '' });
    onClose();
  };

  if (!show) return null;
  return (
    <div className="popup-menu-backdrop" tabIndex={-1}>
      <div className="absolute inset-0" onClick={onClose}></div>
      <form 
        className="popup-menu show"
        onSubmit={handleCreatePlan}
        tabIndex={0}
        onClick={e => e.stopPropagation()}
        autoComplete="off"
      >
        <button type="button" aria-label="Close" className="popup-menu-close" onClick={onClose}>&times;</button>
        <h2 className="popup-menu-title">Create Your Custom Plan</h2>
        <div>
          <label className="popup-menu-label">Plan Name</label>
          <input name="name" value={form.name} onChange={handleFormChange} className="popup-menu-input" placeholder="e.g. My Awesome Plan" autoFocus />
        </div>
        <div>
          <label className="popup-menu-label">Price</label>
          <input name="price" value={form.price} onChange={handleFormChange} className="popup-menu-input" placeholder="e.g. 0.01 ETH / mo" />
        </div>
        <div>
          <label className="popup-menu-label">Description</label>
          <textarea name="desc" value={form.desc} onChange={handleFormChange} className="popup-menu-textarea" placeholder="Describe your plan..." rows={2} />
        </div>
        <button type="submit" className="popup-menu-btn">Add Plan</button>
      </form>
    </div>
  );
}
