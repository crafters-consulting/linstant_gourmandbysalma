import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Trash } from "lucide-react"
import { useParams } from "react-router"
import { HeaderBar } from "../../components"
import {
    usePurchaseByIdQuery,
    usePurchaseSalesByPurchaseIdQuery,
} from "../../hooks"

export function PurchaseView() {
    const { id } = useParams<{ id: string }>()
    const { data, isLoading } = usePurchaseByIdQuery(id!)
    const { data: purchaseSales, isLoading: isLoadingPurchaseSales } =
        usePurchaseSalesByPurchaseIdQuery(id!)

    return (
        <>
            <HeaderBar title="Detail de l'Achat" backUrl="/purchases" />

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
                                    Date
                                </span>
                            </label>
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
                            <label className="label">
                                <span className="label-text font-medium">
                                    Montant
                                </span>
                            </label>
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
                            <label className="label">
                                <span className="label-text font-medium">
                                    Commentaire
                                </span>
                            </label>
                            <p className="text-lg">{data.description}</p>
                        </div>
                    </div>
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <label className="label">
                                <span className="label-text font-medium">
                                    Ventes Concernées
                                </span>
                            </label>
                            {isLoadingPurchaseSales ? (
                                <span className="loading loading-spinner" />
                            ) : (
                                <ul className="space-y-2">
                                    {purchaseSales &&
                                        purchaseSales.map((it) => (
                                            <li
                                                key={it.sale_id}
                                                className="flex items-center gap-2"
                                            >
                                                <div className="badge badge-outline">
                                                    {format(
                                                        it.sales
                                                            .deliveryDateTime,
                                                        "dd/MM/yyyy HH:mm"
                                                    )}
                                                </div>
                                                <span>
                                                    {it.sales.clientName}
                                                </span>
                                            </li>
                                        ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    <button className="btn btn-error gap-2">
                        <Trash size={20} /> Supprimer
                    </button>
                </main>
            )}
        </>
    )
}
