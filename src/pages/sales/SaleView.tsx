import { format, isFuture } from "date-fns"
import { fr } from "date-fns/locale"
import { Edit, Trash } from "lucide-react"
import { Link, useParams } from "react-router"
import { HeaderBar } from "../../components"
import { useSaleByIdQuery } from "../../hooks"

export function SaleView() {
    const { id } = useParams<{ id: string }>()
    const { data, isLoading } = useSaleByIdQuery(id!)

    return (
        <>
            <HeaderBar title="Detail de la Vente" backUrl="/sales" />

            {isLoading || !data ? (
                <main className="flex justify-center items-center min-h-[50vh]">
                    <span className="loading loading-spinner loading-lg" />
                </main>
            ) : (
                <main className="grid gap-4">
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <label className="label">
                                <span className="label-text font-medium">
                                    Date de livraison
                                </span>
                            </label>
                            <p className="text-lg">
                                {format(
                                    data.deliveryDateTime,
                                    "EEEE dd LLLL yyyy à HH:mm",
                                    { locale: fr }
                                )}
                            </p>
                        </div>
                    </div>
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <label className="label">
                                <span className="label-text font-medium">
                                    Client
                                </span>
                            </label>
                            <p className="text-lg">{data.clientName}</p>
                        </div>
                    </div>
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <label className="label">
                                <span className="label-text font-medium">
                                    Adresse de livraison
                                </span>
                            </label>
                            <p className="text-lg">{data.deliveryAddress}</p>
                        </div>
                    </div>
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <label className="label">
                                <span className="label-text font-medium">
                                    Commentaire
                                </span>
                            </label>
                            <p className="text-lg">{data.description}</p>
                        </div>
                    </div>

                    <div className="stats stats-vertical lg:stats-horizontal shadow-xl">
                        <div className="stat">
                            <div className="stat-title">Montant</div>
                            <div className="stat-value text-2xl">
                                {data.amount.toLocaleString("fr-FR", {
                                    style: "currency",
                                    currency: "EUR",
                                })}
                            </div>
                        </div>
                        <div className="stat">
                            <div className="stat-title">Acompte</div>
                            <div className="stat-value text-success text-2xl">
                                {data.deposit.toLocaleString("fr-FR", {
                                    style: "currency",
                                    currency: "EUR",
                                })}
                            </div>
                        </div>
                        <div className="stat">
                            <div className="stat-title">Reste à payer</div>
                            <div className="stat-value text-error text-2xl">
                                {data.remaining.toLocaleString("fr-FR", {
                                    style: "currency",
                                    currency: "EUR",
                                })}
                            </div>
                        </div>
                    </div>
                    {isFuture(data.deliveryDateTime) && (
                        <div className="grid gap-4">
                            <Link
                                to={`/sales/${id}/edit`}
                                className="btn btn-primary gap-2"
                            >
                                <Edit size={20} /> Modifier
                            </Link>
                            <button className="btn btn-error gap-2">
                                <Trash size={20} /> Supprimer
                            </button>
                        </div>
                    )}
                </main>
            )}
        </>
    )
}
