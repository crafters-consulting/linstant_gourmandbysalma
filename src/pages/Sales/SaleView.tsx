import {useParams, Link} from 'react-router-dom';
import {Edit, ArrowLeft} from 'lucide-react';
import {PageHeader} from "../../components";

export function SaleView() {
    const {id} = useParams();

    // Mock data - replace with actual data fetching
    const sale = {
        id: Number(id),
        clientName: 'Acme Corp',
        deliveryAddress: '123 Business Ave, Suite 100, New York, NY 10001',
        deliveryDateTime: '2024-03-15T14:00',
        amount: 5000,
        deposit: 1500,
        balanceDue: 3500,
        status: 'Pending',
        paymentMethod: 'Bank Transfer'
    };

    return (
        <div>
            <PageHeader title={sale.clientName}
                        backUrl="/sales"
                        editUrl={`/sales/${id}/edit`}/>

            <div className="bg-white p-6 rounded-lg shadow-md grid gap-4">
                <p><strong>Date de livraison:</strong> {new Date(sale.deliveryDateTime).toLocaleString('fr-FR')}</p>
                <p><strong>Adresse de livraison:</strong> {sale.deliveryAddress}</p>
                <p><strong>Montant:</strong> {sale.amount.toLocaleString('fr-FR', {
                    style: 'currency',
                    currency: 'EUR'
                })}</p>
                <p><strong>Acompte:</strong> {sale.deposit.toLocaleString('fr-FR', {
                    style: 'currency',
                    currency: 'EUR'
                })}</p>
                <p><strong>Restes à payer:</strong> {sale.balanceDue.toLocaleString('fr-FR', {
                    style: 'currency',
                    currency: 'EUR'
                })}</p>
            </div>
        </div>
    );
}

export default SaleView