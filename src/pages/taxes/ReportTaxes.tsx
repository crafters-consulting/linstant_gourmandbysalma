import {PageHeader} from "../../components";
import {useReportTaxesQuery} from "../../hooks";
import {format} from "date-fns";
import {fr} from "date-fns/locale";

export function ReportTaxes() {
    const {data, isLoading} = useReportTaxesQuery();
    return (
        <>
            <PageHeader title="Impôts"/>

            <main className="grid gap-4">
                {isLoading || !data ? "" : data.map((it) => (
                    <article key={it.date}  className="card">
                        <h2 className="text-lg font-medium">
                            {format(it.date, 'MMMM yyyy', {locale: fr})}
                        </h2>
                        <div className="flex justify-between gap-4 mt-4">
                            <p className="text-slate-600 font-bold">Montant</p>
                            <p className="text-right font-bold">
                                {it.amount.toLocaleString('fr-FR', {style: 'currency', currency: 'EUR'})}
                            </p>
                        </div>
                    </article>
                ))}
            </main>
        </>
    );
}