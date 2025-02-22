import { HeaderBar } from "../../components"
import { useDashboardDataQuery } from "../../hooks"
import { SalesVsPurchasesCurrentMonth } from "./SalesVsPurchasesCurrentMonth.tsx"
import { SalesVsPurchasesLastMonths } from "./SalesVsPurchasesLastMonths.tsx"

export const Dashboard = () => {
    const { data, isLoading } = useDashboardDataQuery()

    return (
        <>
            <HeaderBar title="Tableau de Board" />

            {isLoading || !data ? (
                "Chargement..."
            ) : (
                <main className="grid gap-4">
                    <div className="card">
                        <h2 className="mb-4">Ventes / Achats mois courant</h2>
                        <SalesVsPurchasesCurrentMonth
                            data={data.currentMonth}
                        />
                    </div>

                    <div className="card">
                        <h2 className="mb-4">Ventes / Achats par mois</h2>
                        <SalesVsPurchasesLastMonths data={data.lastMonths} />
                    </div>
                </main>
            )}
        </>
    )
}
