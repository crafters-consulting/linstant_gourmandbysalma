import { useParams } from "react-router"
import { HeaderBar } from "../../components"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Trash } from "lucide-react"
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
            <HeaderBar
                title="Detail de l'Achat"
                backUrl="/purchases"
            />

            {isLoading || !data ? (
                "Chargement..."
            ) : (
                <main className="grid gap-4">
                    <article className="card">
                        <label>Date</label>
                        <p>
                            {format(data.date, "EEEE dd LLLL yyyy à HH:mm", {
                                locale: fr,
                            })}
                        </p>
                    </article>
                    <article className="card">
                        <label>Amount</label>
                        <p>
                            {data.amount.toLocaleString("fr-FR", {
                                style: "currency",
                                currency: "EUR",
                            })}
                        </p>
                    </article>
                    <article className="card">
                        <label>Comment</label>
                        <p>{data.description}</p>
                    </article>
                    <article className="card">
                        <label>Ventes Concernées</label>
                        <p>
                            {!isLoadingPurchaseSales &&
                                purchaseSales &&
                                purchaseSales.map((it) => (
                                    <li key={it.sale_id}>
                                        {format(
                                            it.sales.deliveryDateTime,
                                            "dd/MM/yyyy HH:mm"
                                        )}{" "}
                                        - {it.sales.clientName}
                                    </li>
                                ))}
                        </p>
                    </article>

                    <button className="danger">
                        <Trash size={20} /> Supprimer
                    </button>
                </main>
            )}
        </>
    )
}
