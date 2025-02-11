import {EditButton, PageHeader, ViewButton} from "../../components";
import {useSaleListQuery} from "../../hooks";

export function SaleList() {
    const {data, isLoading} = useSaleListQuery();

    return (
        <div>
            <PageHeader title="Ventes" createUrl="/sales/new"/>

            <div className="grid gap-4">
                {isLoading || !data ? "" : data.map((it) => (
                    <article key={it.id} className="card">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-medium">{new Date(it.deliveryDateTime).toLocaleDateString()}</h2>
                            <div className="flex gap-2">
                                <ViewButton to={`/sales/${it.id}`}/>
                                <EditButton to={`/sales/${it.id}/edit`}/>
                            </div>
                        </div>
                        <p className="text-slate-600 font-bold">{it.clientName}</p>
                        <p className="text-slate-600">{it.deliveryAddress}</p>
                        <div className="grid grid-cols-5 gap-4 mt-4">
                            <p className="text-center font-bold text-green-500">{it.deposit.toLocaleString('fr-FR', {
                                style: 'currency',
                                currency: 'EUR'
                            })}</p>
                            <p className="text-center font-bold">+</p>
                            <p className="text-center font-bold text-red-500">{it.remaining.toLocaleString('fr-FR', {
                                style: 'currency',
                                currency: 'EUR'
                            })}</p>
                            <p className="text-center font-bold">=</p>
                            <p className="text-center font-bold">{it.amount.toLocaleString('fr-FR', {
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
