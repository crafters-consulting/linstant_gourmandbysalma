import { format } from "date-fns"
import { useState } from "react"
import type { Sale } from "../../hooks"
import { DaySalesDetails } from "./DaySalesDetails.tsx"

type CalendarDayProps = {
    date: Date
    sales: Sale[]
    isToday: boolean
    isCurrentMonth: boolean
}

function getPaymentStatus(sale: Sale): "paid" | "partial" | "unpaid" {
    if (sale.remaining === 0) return "paid"
    if (sale.deposit > 0) return "partial"
    return "unpaid"
}

function getStatusColor(status: "paid" | "partial" | "unpaid"): string {
    switch (status) {
        case "paid":
            return "bg-success"
        case "partial":
            return "bg-warning"
        case "unpaid":
            return "bg-error"
    }
}

export const CalendarDay = ({
    date,
    sales,
    isToday,
    isCurrentMonth,
}: CalendarDayProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const dayNumber = format(date, "d")
    const hasSales = sales.length > 0

    const handleClick = () => {
        if (hasSales) {
            setIsOpen(true)
        }
    }

    const handleClose = () => {
        setIsOpen(false)
    }

    return (
        <>
            <button
                type="button"
                onClick={handleClick}
                className={`
					relative min-h-[60px] p-2 rounded-lg border transition-all
					${isCurrentMonth ? "bg-base-100" : "bg-base-200/50"}
					${isToday ? "border-primary border-2 font-bold" : "border-base-300"}
					${hasSales ? "hover:bg-base-200 cursor-pointer" : "cursor-default"}
				`}
            >
                {/* Numéro du jour */}
                <div
                    className={`
						text-sm
						${isCurrentMonth ? "text-base-content" : "text-base-content/40"}
					`}
                >
                    {dayNumber}
                </div>

                {/* Points pour les commandes */}
                {hasSales && (
                    <div className="flex flex-wrap gap-1 mt-1 justify-center">
                        {sales.slice(0, 6).map((sale, index) => {
                            const status = getPaymentStatus(sale)
                            const colorClass = getStatusColor(status)

                            return (
                                <div
                                    key={sale.id}
                                    className={`w-2 h-2 rounded-full ${colorClass}`}
                                    title={`${sale.clientName} - ${sale.amount}€`}
                                />
                            )
                        })}
                        {sales.length > 6 && (
                            <div
                                className="text-[10px] font-bold text-base-content/70"
                                title={`+${sales.length - 6} autres commandes`}
                            >
                                +{sales.length - 6}
                            </div>
                        )}
                    </div>
                )}
            </button>

            {/* Modal avec détails des commandes */}
            {isOpen && (
                <DaySalesDetails
                    date={date}
                    sales={sales}
                    onClose={handleClose}
                />
            )}
        </>
    )
}
