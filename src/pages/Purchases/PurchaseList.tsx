import {PageHeader, EditButton, ViewButton} from "../../components";
import {usePurchaseListQuery} from "../../hooks";

export function PurchaseList() {
    const {data, isLoading} = usePurchaseListQuery();

    return (
        <div>
            <PageHeader title="Achats" createUrl="/purchases/new"/>
            <div className="grid gap-4">
                {isLoading ? "" : data.data.map((purchase) => (
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