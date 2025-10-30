import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { HeaderBar } from "../../components"
import { useReportTaxesQuery } from "../../hooks"

export function ReportTaxes() {
    const { data, isLoading } = useReportTaxesQuery()
    return (
        <>
            <HeaderBar title="Impôts" />

            <main>
                {isLoading || !data ? (
                    <div className="flex justify-center items-center min-h-[50vh]">
                        <span className="loading loading-spinner loading-lg" />
                    </div>
                ) : (
                    data.map((it) => (
                        <div
                            key={it.date}
                            className="card bg-base-100 shadow-lg"
                        >
                            <div className="card-body">
                                <div className="flex justify-between items-center">
                                    <h2 className="card-title text-base-content/70">
                                        {format(it.date, "MMMM yyyy", {
                                            locale: fr,
                                        })}
                                    </h2>
                                    <div className="stat-value text-primary text-2xl">
                                        {it.amount.toLocaleString("fr-FR", {
                                            style: "currency",
                                            currency: "EUR",
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </main>
        </>
    )
}
