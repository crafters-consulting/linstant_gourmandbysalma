import {Link} from "react-router-dom";
import {PageHeader} from "../../components";
import {usePurchaseListQuery} from "../../hooks";
import {format} from "date-fns";

export function PurchaseList() {
    const {data, isLoading} = usePurchaseListQuery();

    return (
        <>
            <PageHeader title="Achats" createUrl="/purchases/new"/>
            <main className="grid gap-4">
                {isLoading || !data ? "Chargement..." : data.map((it) => (
                    <Link key={it.id} to={`/purchases/${it.id}`} className="card">
                        <h2 className="text-lg font-medium">{format(it.date, 'dd/MM/yyyy')}</h2>
                        <p className="text-slate-600">{it.description}</p>
                        <p className="font-bold">{it.amount.toLocaleString('fr-FR', {
                            style: 'currency',
                            currency: 'EUR'
                        })}</p>
                    </Link>
                ))}
            </main>
        </>
    );
}