import { HeaderBar, Loading } from "../../components"
import { useSaleListQuery } from "../../hooks"
import { CalendarView } from "./CalendarView.tsx"

export const Dashboard = () => {
    const { data: sales, isLoading } = useSaleListQuery()

    return (
        <>
            <HeaderBar title="Calendrier des Commandes" />
            {isLoading ? (
                <Loading />
            ) : (
                <main>
                    <CalendarView sales={sales} />
                </main>
            )}
        </>
    )
}
