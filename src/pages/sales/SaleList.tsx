import { format, isPast } from "date-fns"
import { Plus } from "lucide-react"
import { Link } from "react-router"
import { HeaderBar, Loading } from "../../components"
import { useSaleListQuery } from "../../hooks"

export function SaleList() {
    const { data, isLoading } = useSaleListQuery()

    return (
        <>
            <HeaderBar title="Ventes" />

            <main>
                {isLoading || !data ? (
                    <Loading />
                ) : (
                    data.map((it) => (
                        <Link
                            key={it.id}
                            to={`/sales/${it.id}`}
                            className={`card bg-base-100 shadow-lg hover:shadow-xl transition-shadow ${isPast(it.deliveryDateTime) ? "opacity-60" : ""}`}
                        >
                            <div className="card-body">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h2 className="card-title">
                                            {format(
                                                it.deliveryDateTime,
                                                "dd/MM/yyyy"
                                            )}
                                        </h2>
                                        <p className="text-base-content font-semibold">
                                            {it.clientName}
                                        </p>
                                        <p className="text-base-content/70 text-sm">
                                            {it.deliveryAddress}
                                        </p>
                                    </div>
                                    {isPast(it.deliveryDateTime) && (
                                        <div className="badge badge-ghost">
                                            Passée
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center justify-between gap-2 mt-4 text-sm">
                                    <div className="stat-value text-success text-base">
                                        {it.deposit.toLocaleString("fr-FR", {
                                            style: "currency",
                                            currency: "EUR",
                                        })}
                                    </div>
                                    <div className="font-bold">+</div>
                                    <div className="stat-value text-error text-base">
                                        {it.remaining.toLocaleString("fr-FR", {
                                            style: "currency",
                                            currency: "EUR",
                                        })}
                                    </div>
                                    <div className="font-bold">=</div>
                                    <div className="stat-value text-base-content text-base">
                                        {it.amount.toLocaleString("fr-FR", {
                                            style: "currency",
                                            currency: "EUR",
                                        })}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))
                )}
                <div className="fab bottom-22">
                    <Link
                        to="/sales/new"
                        className="btn btn-lg btn-circle btn-primary"
                    >
                        <Plus size={30} />
                    </Link>
                </div>
            </main>
        </>
    )
}
