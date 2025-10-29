import { useQuery } from "@tanstack/react-query"
import { startOfDay } from "date-fns"
import { useSupabaseClient } from "./useSupabaseClient.ts"

export function useUpcomingSalesQuery() {
	const supabase = useSupabaseClient()

	return useQuery({
		queryKey: ["sales", "upcoming"],
		queryFn: async () => {
			const today = startOfDay(new Date()).toISOString()
			const { data, error } = await supabase
				.from("sales")
				.select("*")
				.gte("deliveryDateTime", today)
				.order("deliveryDateTime", { ascending: true })

			if (error) throw error
			return data
		},
	})
}
