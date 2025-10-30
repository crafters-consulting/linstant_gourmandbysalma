import { format } from "date-fns"
import { fr } from "date-fns/locale"
import type { Sale } from "../../hooks"

type DaySalesDetailsProps = {
    id: string
    date: Date | undefined
    sales: Sale[]
}

export const DaySalesDetails = ({ id, date, sales }: DaySalesDetailsProps) => {
    const totalAmount = sales.reduce((sum, sale) => sum + sale.amount, 0)

    return (
        <dialog id={id} className="modal">
            <div className="modal-box max-w-2xl max-h-[80vh] overflow-y-auto">
                <form method="dialog">
                    <button
                        type="submit"
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    >
                        ✕
                    </button>
                </form>

                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h2 className="text-xl font-bold">
                            {date &&
                                format(date, "EEEE d MMMM yyyy", {
                                    locale: fr,
                                })}
                        </h2>
                        <p className="text-sm text-base-content/70">
                            {sales.length} commande
                            {sales.length > 1 ? "s" : ""} •{" "}
                            {totalAmount.toFixed(2)} €
                        </p>
                    </div>
                </div>

                {/* Liste des commandes */}
                <div className="grid gap-3">
                    {sales.map((sale) => (
                        <button
                            key={sale.id}
                            type="button"
                            className="card bg-base-200 hover:bg-base-300 transition-colors cursor-pointer text-left"
                        >
                            <div className="card-body p-4">
                                {/* Header de la commande */}
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-base">
                                            {sale.clientName}
                                        </h3>
                                        <p className="text-sm text-base-content/70">
                                            {format(
                                                new Date(sale.deliveryDateTime),
                                                "HH:mm",
                                                { locale: fr }
                                            )}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-lg">
                                            {sale.amount.toFixed(2)} €
                                        </div>
                                    </div>
                                </div>

                                {/* Adresse de livraison */}
                                {sale.deliveryAddress && (
                                    <div className="mt-2">
                                        <p className="text-sm text-base-content/70">
                                            <span className="font-semibold">
                                                Livraison :{" "}
                                            </span>
                                            {sale.deliveryAddress}
                                        </p>
                                    </div>
                                )}

                                {/* Description */}
                                {sale.description && (
                                    <div className="mt-2">
                                        <p className="text-sm text-base-content/70">
                                            {sale.description}
                                        </p>
                                    </div>
                                )}

                                {/* Détails de paiement */}
                                {sale.deposit > 0 && (
                                    <div className="mt-2 pt-2 border-t border-base-300">
                                        <div className="text-xs text-base-content/60 grid grid-cols-2 gap-2">
                                            {sale.deposit > 0 && (
                                                <div>
                                                    <span className="font-semibold">
                                                        Acompte :{" "}
                                                    </span>
                                                    {`${sale.deposit.toFixed(2)} € (${sale.depositPaymentMethod})`}
                                                </div>
                                            )}
                                            {sale.remaining > 0 && (
                                                <div>
                                                    <span className="font-semibold">
                                                        Reste :{" "}
                                                    </span>
                                                    {`${sale.remaining.toFixed(2)} € (${sale.remainingPaymentMethod})`}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </dialog>
    )
}
