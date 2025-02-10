import {PageHeader, EditButton, ViewButton} from "../../components";

// Mock data - replace with actual data source
const mockPurchases = [
    {
        id: 1,
        date: '2024-03-15',
        amount: 2500,
        comment: 'Office supplies and equipment'
    },
    {
        id: 2,
        date: '2024-03-16',
        amount: 1800,
        comment: 'Marketing materials'
    },
    {
        id: 3,
        date: '2024-03-17',
        amount: 3500,
        comment: 'Software licenses'
    },
];

export function PurchaseList() {
    return (
        <div>
            <PageHeader title="Achats" createUrl="/purchases/new"/>

            <div className="grid gap-4">
                {mockPurchases.map((purchase) => (
                    <article key={purchase.id} className="bg-white p-6 rounded-lg shadow-md">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-medium">{new Date(purchase.date).toLocaleDateString()}</h2>
                            <div className="flex gap-2">
                                <ViewButton to={`/purchases/${purchase.id}`}/>
                                <EditButton to={`/purchases/${purchase.id}/edit`}/>
                            </div>
                        </div>
                        <p className="text-slate-600">{purchase.comment}</p>
                        <p className="font-bold">{purchase.amount.toLocaleString('fr-FR', {
                            style: 'currency',
                            currency: 'EUR'
                        })}</p>
                    </article>
                ))}
            </div>
        </div>
    );
}