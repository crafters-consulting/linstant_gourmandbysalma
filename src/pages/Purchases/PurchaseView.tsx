import { useParams, Link } from 'react-router-dom';
import { Edit, ArrowLeft } from 'lucide-react';

export function PurchaseView() {
  const { id } = useParams();

  // Mock data - replace with actual data fetching
  const purchase = {
    id: Number(id),
    date: '2024-03-15',
    amount: 2500,
    comment: 'Office supplies and equipment'
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <Link to="/purchases" className="button button-primary">
          <ArrowLeft size={20} />
          Back to List
        </Link>
        <Link to={`/purchases/${id}/edit`} className="button button-primary">
          <Edit size={20} />
          Edit Purchase
        </Link>
      </div>

      <div className="sale-details">
        <h1 className="page-title">Purchase Details</h1>
        
        <div style={{ display: 'grid', gap: '1rem' }}>
          <p><strong>Date:</strong> {new Date(purchase.date).toLocaleDateString()}</p>
          <p><strong>Amount:</strong> ${purchase.amount.toLocaleString()}</p>
          <p><strong>Comment:</strong> {purchase.comment}</p>
        </div>
      </div>
    </div>
  );
}

export default PurchaseView;