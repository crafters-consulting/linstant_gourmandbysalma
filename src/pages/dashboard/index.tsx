import { HeaderBar } from "../../components"
import { CalendarView } from "./CalendarView.tsx"

export const Dashboard = () => {
	return (
		<>
			<HeaderBar title="Calendrier des Commandes" />
			<main className="grid gap-4">
				<CalendarView />
			</main>
		</>
	)
}
