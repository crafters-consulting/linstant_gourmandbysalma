import {EditButton, PageHeader, ViewButton} from "../../components";

// Mock data - replace with actual data source
const mockSales = [
    {
        id: 1,
        clientName: 'Acme Corp',
        deliveryAddress: '123 Business Ave, Suite 100, New York, NY 10001',
        deliveryDateTime: '2024-03-15T14:00',
        amount: 5000,
        deposit: 1500,
        balanceDue: 3500
    },
    {
        id: 2,
        clientName: 'TechStart Inc',
        deliveryAddress: '456 Innovation Blvd, San Francisco, CA 94105',
        deliveryDateTime: '2024-03-16T10:30',
        amount: 7500,
        deposit: 2000,
        balanceDue: 5500
    },
    {
        id: 3,
        clientName: 'Global Solutions',
        deliveryAddress: '789 Enterprise St, Chicago, IL 60601',
        deliveryDateTime: '2024-03-17T09:00',
        amount: 3200,
        deposit: 1000,
        balanceDue: 2200
    },
];

export function SaleList() {
    return (
        <div>
            <PageHeader title="Ventes" createUrl="/sales/new" />

            <div className="grid gap-4">
                {mockSales.map((sale) => (
                    <article key={sale.id} className="bg-white p-6 rounded-lg shadow-md">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-medium">{new Date(sale.deliveryDateTime).toLocaleDateString()}</h2>
                            <div className="flex gap-2">
                                <ViewButton to={`/sales/${sale.id}`}/>
                                <EditButton to={`/sales/${sale.id}/edit`}/>
                            </div>
                        </div>
                        <p className="text-slate-600 font-bold">{sale.clientName}</p>
                        <p className="text-slate-600">{sale.deliveryAddress}</p>

                        <div className="grid grid-cols-3 gap-4 mt-4">
                            <p className="text-center font-bold">{sale.amount.toLocaleString('fr-FR', {
                                style: 'currency',
                                currency: 'EUR'
                            })}</p>
                            <p className="text-center font-bold text-green-500">{sale.deposit.toLocaleString('fr-FR', {
                                style: 'currency',
                                currency: 'EUR'
                            })}</p>
                            <p className="text-center font-bold text-red-500">{sale.balanceDue.toLocaleString('fr-FR', {
                                style: 'currency',
                                currency: 'EUR'
                            })}</p>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}
