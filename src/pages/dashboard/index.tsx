import { HeaderBar } from "../../components"
import { useSaleListQuery } from "../../hooks"
import { CalendarView } from "./CalendarView.tsx"

export const Dashboard = () => {
    const { data: sales, isLoading } = useSaleListQuery()

    return (
        <>
            <HeaderBar title="Calendrier des Commandes" />
            {isLoading ? (
                <main className="flex justify-center items-center min-h-[50vh]">
                    <span className="loading loading-spinner loading-lg" />
                </main>
            ) : (
                <main className="grid gap-4">
                    <CalendarView sales={sales} />
                </main>
            )}
        </>
    )
}
