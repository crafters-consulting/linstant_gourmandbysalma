import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { useMemo } from "react"
import type { Sale } from "../../hooks"

type RevenueStatsProps = {
    sales: Sale[] | null | undefined
    currentMonth: Date
}

export const RevenueStats = ({ sales, currentMonth }: RevenueStatsProps) => {
    const currentYear = useMemo(
        () => currentMonth.getFullYear(),
        [currentMonth]
    )

    // Calculer le CA de l'année du calendrier
    const yearRevenue = useMemo(() => {
        if (!sales) return 0
        return sales
            .filter((sale) => {
                const saleDate = new Date(sale.deliveryDateTime)
                return saleDate.getFullYear() === currentYear
            })
            .reduce((sum, sale) => sum + sale.amount, 0)
    }, [sales, currentYear])

    // Calculer le CA du mois du calendrier
    const monthRevenue = useMemo(() => {
        if (!sales) return 0
        const year = currentMonth.getFullYear()
        const month = currentMonth.getMonth()

        return sales
            .filter((sale) => {
                const saleDate = new Date(sale.deliveryDateTime)
                return (
                    saleDate.getFullYear() === year &&
                    saleDate.getMonth() === month
                )
            })
            .reduce((sum, sale) => sum + sale.amount, 0)
    }, [sales, currentMonth])

    // Formater en euros
    const formatCurrency = (amount: number) => {
        return amount.toLocaleString("fr-FR", {
            style: "currency",
            currency: "EUR",
        })
    }

    return (
        <div className="stats stats-vertical card bg-base-100 shadow-xl">
            <div className="stat">
                <div className="stat-title">Chiffre d'affaires</div>
                <div className="stat-value text-primary">
                    {formatCurrency(yearRevenue)}
                </div>
            </div>

            <div className="stat">
                <div className="stat-title">
                    CA {format(currentMonth, "MMMM yyyy", { locale: fr })}
                </div>
                <div className="stat-value text-secondary">
                    {formatCurrency(monthRevenue)}
                </div>
            </div>
        </div>
    )
}
