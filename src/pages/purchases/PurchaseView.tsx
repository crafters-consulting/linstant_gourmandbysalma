import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { ArrowLeft, Trash } from "lucide-react"
import { Link, useParams } from "react-router"
import { HeaderBar, Loading } from "../../components"
import { usePurchaseByIdQuery } from "../../hooks"

export function PurchaseView() {
    const { id } = useParams<{ id: string }>()
    const { data, isLoading } = usePurchaseByIdQuery(id!)

    return (
        <>
            <HeaderBar title="Detail de l'Achat" />

            {isLoading || !data ? (
                <Loading />
            ) : (
                <main>
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <span className="label label-text font-medium">
                                Date
                            </span>
                            <p className="text-lg">
                                {format(
                                    data.date,
                                    "EEEE dd LLLL yyyy à HH:mm",
                                    {
                                        locale: fr,
                                    }
                                )}
                            </p>
                        </div>
                    </div>
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <span className="label label-text font-medium">
                                Montant
                            </span>
                            <div className="stat-value text-primary text-2xl">
                                {data.amount.toLocaleString("fr-FR", {
                                    style: "currency",
                                    currency: "EUR",
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <span className="label label-text font-medium">
                                Commentaire
                            </span>
                            <p className="text-lg">{data.description}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Link to={`/purchases`} className="btn py-10">
                            <ArrowLeft size={30} />
                        </Link>
                        <button type="button" className="btn btn-error py-10">
                            <Trash size={30} />
                        </button>
                    </div>
                </main>
            )}
        </>
    )
}
