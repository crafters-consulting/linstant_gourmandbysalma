import {PageHeader, EditButton, ViewButton} from "../../components";
import {usePurchaseListQuery} from "../../hooks";

export function PurchaseList() {
    const {data, isLoading} = usePurchaseListQuery();

    return (
        <div>
            <PageHeader title="Achats" createUrl="/purchases/new"/>
            <div className="grid gap-4">
                {isLoading || !data ? "Chargement..." : data.map((it) => (
                    <article key={it.id} className="card">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-medium">{new Date(it.date).toLocaleDateString()}</h2>
                            <div className="flex gap-2">
                                <ViewButton to={`/purchases/${it.id}`}/>
                                <EditButton to={`/purchases/${it.id}/edit`}/>
                            </div>
                        </div>
                        <p className="text-slate-600">{it.description}</p>
                        <p className="font-bold">{it.amount.toLocaleString('fr-FR', {
                            style: 'currency',
                            currency: 'EUR'
                        })}</p>
                    </article>
                ))}
            </div>
        </div>
    );
}