import { format } from "date-fns"
import { Plus } from "lucide-react"
import { Link } from "react-router"
import { HeaderBar, Loading } from "../../components"
import { usePurchaseListQuery } from "../../hooks"

export function PurchaseList() {
    const { data, isLoading } = usePurchaseListQuery()

    return (
        <>
            <HeaderBar title="Achats" />
            <main>
                {isLoading || !data ? (
                    <Loading />
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

                <div className="fab bottom-22">
                    <Link
                        to="/purchases/new"
                        className="btn btn-lg btn-circle btn-primary"
                    >
                        <Plus size={30} />
                    </Link>
                </div>
            </main>
        </>
    )
}
