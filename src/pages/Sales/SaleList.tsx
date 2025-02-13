import {Link} from "react-router-dom";
import {format, isPast} from "date-fns";
import {PageHeader} from "../../components";
import {useSaleListQuery} from "../../hooks";

export function SaleList() {
    const {data, isLoading} = useSaleListQuery();

    return (
        <>
            <PageHeader title="Ventes" createUrl="/sales/new"/>

            <main className="grid gap-4">
                {isLoading || !data ? "" : data.map((it) => (
                    <Link key={it.id} to={`/sales/${it.id}`}
                        className={`p-6 rounded-lg shadow-md ${isPast(it.deliveryDateTime) ? 'bg-gray-100' : 'bg-white'}`}>
                        <h2 className="text-lg font-medium">
                            {format(it.deliveryDateTime, 'dd/MM/yyyy')}
                        </h2>
                        <p className="text-slate-600 font-bold">{it.clientName}</p>
                        <p className="text-slate-600">{it.deliveryAddress}</p>
                        <div className="grid grid-cols-5 gap-4 mt-4">
                            <p className="text-center font-bold text-green-500">
                                {it.deposit.toLocaleString('fr-FR', {style: 'currency', currency: 'EUR'})}
                            </p>
                            <p className="text-center font-bold">+</p>
                            <p className="text-center font-bold text-red-500">
                                {it.remaining.toLocaleString('fr-FR', {style: 'currency', currency: 'EUR'})}
                            </p>
                            <p className="text-center font-bold">=</p>
                            <p className="text-center font-bold">
                                {it.amount.toLocaleString('fr-FR', {style: 'currency', currency: 'EUR'})}
                            </p>
                        </div>
                    </Link>
                ))}
            </main>
        </>
    );
}
