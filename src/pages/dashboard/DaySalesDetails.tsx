import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { X } from "lucide-react"
import { useNavigate } from "react-router"
import type { Sale } from "../../hooks"

type DaySalesDetailsProps = {
	date: Date
	sales: Sale[]
	onClose: () => void
}

function getPaymentStatusLabel(sale: Sale): string {
	if (sale.remaining === 0) return "Payé"
	if (sale.deposit > 0) return "Partiellement payé"
	return "Non payé"
}

function getPaymentStatusBadge(sale: Sale): string {
	if (sale.remaining === 0) return "badge badge-success"
	if (sale.deposit > 0) return "badge badge-warning"
	return "badge badge-error"
}

export const DaySalesDetails = ({
	date,
	sales,
	onClose,
}: DaySalesDetailsProps) => {
	const navigate = useNavigate()

	const handleSaleClick = (saleId: string) => {
		navigate(`/sales/${saleId}`)
	}

	const totalAmount = sales.reduce((sum, sale) => sum + sale.amount, 0)

	return (
		<>
			{/* Backdrop */}
			<div
				className="fixed inset-0 bg-black/50 z-40"
				onClick={onClose}
				onKeyDown={(e) => {
					if (e.key === "Escape") onClose()
				}}
			/>

			{/* Modal */}
			<div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
				<div
					className="card bg-base-100 shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto pointer-events-auto"
					onClick={(e) => e.stopPropagation()}
				>
					<div className="card-body">
						{/* Header */}
						<div className="flex items-start justify-between mb-4">
							<div>
								<h2 className="card-title">
									{format(date, "EEEE d MMMM yyyy", { locale: fr })}
								</h2>
								<p className="text-sm text-base-content/70">
									{sales.length} commande{sales.length > 1 ? "s" : ""} •{" "}
									{totalAmount.toFixed(2)} €
								</p>
							</div>
							<button
								type="button"
								onClick={onClose}
								className="btn btn-ghost btn-circle btn-sm"
								aria-label="Fermer"
							>
								<X className="w-5 h-5" />
							</button>
						</div>

						{/* Liste des commandes */}
						<div className="grid gap-3">
							{sales.map((sale) => (
								<button
									key={sale.id}
									type="button"
									onClick={() => handleSaleClick(sale.id)}
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
												<div className={getPaymentStatusBadge(sale)}>
													{getPaymentStatusLabel(sale)}
												</div>
											</div>
										</div>

										{/* Adresse de livraison */}
										{sale.deliveryAddress && (
											<div className="mt-2">
												<p className="text-sm text-base-content/70">
													<span className="font-semibold">Livraison : </span>
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
												<div className="text-xs text-base-content/70 grid grid-cols-2 gap-2">
													<div>
														<span className="font-semibold">Acompte : </span>
														{sale.deposit.toFixed(2)} € ({sale.depositPaymentMethod})
													</div>
													{sale.remaining > 0 && (
														<div>
															<span className="font-semibold">Reste : </span>
															{sale.remaining.toFixed(2)} €{" "}
															{sale.remainingPaymentMethod &&
																`(${sale.remainingPaymentMethod})`}
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
				</div>
			</div>
		</>
	)
}
