import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Save, ArrowLeft } from 'lucide-react';

export function PurchaseForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  // Mock data for editing - replace with actual data fetching
  const initialData = isEditing ? {
    date: '2024-03-15',
    amount: 2500,
    comment: 'Office supplies and equipment'
  } : {
    date: '',
    amount: '',
    comment: ''
  };

  const [formData, setFormData] = useState(initialData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    navigate('/purchases');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <Link to="/purchases" className="button button-primary">
          <ArrowLeft size={20} />
          Back to List
        </Link>
      </div>

      <div className="sale-details">
        <h1 className="page-title">{isEditing ? 'Edit Purchase' : 'New Purchase'}</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="form-input"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Comment</label>
            <textarea
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              className="form-input"
              rows={3}
              required
            />
          </div>

          <button type="submit" className="button button-primary">
            <Save size={20} />
            {isEditing ? 'Update Purchase' : 'Create Purchase'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PurchaseForm;