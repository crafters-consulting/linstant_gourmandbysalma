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
                <main className="flex justify-center items-center min-h-[50vh]">
                    <span className="loading loading-spinner loading-lg" />
                </main>
            ) : (
                <main className="grid gap-4">
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">
                                Ventes / Achats mois courant
                            </h2>
                            <SalesVsPurchasesCurrentMonth
                                data={data.currentMonth}
                            />
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">
                                Ventes / Achats par mois
                            </h2>
                            <SalesVsPurchasesLastMonths
                                data={data.lastMonths}
                            />
                        </div>
                    </div>
                </main>
            )}
        </>
    )
}
