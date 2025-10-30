import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { ArrowLeft, Edit, Trash } from "lucide-react"
import { Link, useNavigate, useParams } from "react-router"
import { HeaderBar, Loading } from "../../components"
import { useSaleByIdQuery, useSaleDeleteMutation } from "../../hooks"

export function SaleView() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const { data, isLoading } = useSaleByIdQuery(id!)
    const { mutate: deleteSale, isPending: isDeleting } = useSaleDeleteMutation(
        {
            onSuccess: () => {
                navigate("/sales")
            },
        }
    )

    const handleDeleteClick = () => {
        const confirmed = window.confirm(
            "Êtes-vous sûr de vouloir supprimer cette vente ? Cette action est irréversible."
        )
        if (confirmed && id) {
            deleteSale(id)
        }
    }

    return (
        <>
            <HeaderBar title="Detail de la Vente" />

            {isLoading || !data ? (
                <Loading />
            ) : (
                <main>
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <span className="label label-text font-medium">
                                Date de livraison
                            </span>
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
                            <span className="label label-text font-medium">
                                Client
                            </span>
                            <p className="text-lg">{data.clientName}</p>
                        </div>
                    </div>
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <span className="label label-text font-medium">
                                Adresse de livraison
                            </span>
                            <p className="text-lg">{data.deliveryAddress}</p>
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

                    <div className="stats stats-vertical lg:stats-horizontal shadow-xl card bg-base-100 shadow-xl">
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
                    <div className="grid grid-cols-3 gap-4">
                        <Link to={`/sales`} className="btn py-10">
                            <ArrowLeft size={30} />
                        </Link>

                        <Link
                            to={`/sales/${id}/edit`}
                            className="btn btn-primary py-10"
                        >
                            <Edit size={30} />
                        </Link>
                        <button
                            type="button"
                            className="btn btn-error py-10"
                            onClick={handleDeleteClick}
                            disabled={isDeleting}
                        >
                            {isDeleting ? (
                                <span className="loading loading-spinner" />
                            ) : (
                                <Trash size={30} />
                            )}
                        </button>
                    </div>
                </main>
            )}
        </>
    )
}
