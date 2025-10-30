import { addMonths, format, subMonths } from "date-fns"
import { fr } from "date-fns/locale"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import { HeaderBar, Loading } from "../../components"
import { useSaleListQuery } from "../../hooks"
import { CalendarView } from "./CalendarView.tsx"
import { RevenueStats } from "./RevenueStats.tsx"

export const Dashboard = () => {
    const { data: sales, isLoading } = useSaleListQuery()
    const [currentMonth, setCurrentMonth] = useState(new Date())

    const handlePreviousMonth = () => {
        setCurrentMonth((prev) => subMonths(prev, 1))
    }

    const handleNextMonth = () => {
        setCurrentMonth((prev) => addMonths(prev, 1))
    }

    return (
        <>
            <HeaderBar title="Calendrier des Commandes" />
            {isLoading ? (
                <Loading />
            ) : (
                <main className="grid gap-4">
                    {/* Navigation du mois */}
                    <div className="flex items-center justify-between px-4">
                        <button
                            type="button"
                            onClick={handlePreviousMonth}
                            className="btn btn-ghost btn-circle"
                            aria-label="Mois précédent"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>

                        <h2 className="text-2xl font-bold">
                            {format(currentMonth, "MMMM yyyy", { locale: fr })}
                        </h2>

                        <button
                            type="button"
                            onClick={handleNextMonth}
                            className="btn btn-ghost btn-circle"
                            aria-label="Mois suivant"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Calendrier */}
                    <CalendarView sales={sales} currentMonth={currentMonth} />

                    {/* Statistiques CA */}
                    <RevenueStats sales={sales} currentMonth={currentMonth} />
                </main>
            )}
        </>
    )
}
