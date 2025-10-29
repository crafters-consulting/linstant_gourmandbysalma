import { format } from "date-fns"
import { Link } from "react-router"
import { HeaderBar } from "../../components"
import { usePurchaseListQuery } from "../../hooks"

export function PurchaseList() {
    const { data, isLoading } = usePurchaseListQuery()

    return (
        <>
            <HeaderBar title="Achats" createUrl="/purchases/new" />
            <main className="grid gap-4">
                {isLoading || !data ? (
                    <div className="flex justify-center items-center min-h-[50vh]">
                        <span className="loading loading-spinner loading-lg" />
                    </div>
                ) : (
                    data.map((it) => (
                        <Link
                            key={it.id}
                            to={`/purchases/${it.id}`}
                            className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"
                        >
                            <div className="card-body">
                                <div className="flex items-center justify-between">
                                    <h2 className="card-title">
                                        {format(it.date, "dd/MM/yyyy")}
                                    </h2>
                                    <div className="badge badge-primary badge-lg">
                                        {it.amount.toLocaleString("fr-FR", {
                                            style: "currency",
                                            currency: "EUR",
                                        })}
                                    </div>
                                </div>
                                <p className="text-base-content/70">
                                    {it.description}
                                </p>
                            </div>
                        </Link>
                    ))
                )}
            </main>
        </>
    )
}
