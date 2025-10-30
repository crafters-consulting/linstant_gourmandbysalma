import { format } from "date-fns"
import type { Sale } from "../../hooks"

type CalendarDayProps = {
    date: Date
    sales: Sale[]
    isToday: boolean
    isCurrentMonth: boolean
    onClick: () => void
}

export const CalendarDay = ({
    date,
    sales,
    isToday,
    isCurrentMonth,
    onClick,
}: CalendarDayProps) => {
    const dayNumber = format(date, "d")
    const hasSales = sales.length > 0

    return (
        <button
            type="button"
            onClick={() => sales.length > 0 && onClick()}
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
                    {sales.slice(0, 6).map((sale) => {
                        const colorClass = "bg-success"

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
    )
}
