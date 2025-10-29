import { useQuery } from "@tanstack/react-query"
import { format } from "date-fns"
import { useSupabaseClient } from "./useSupabaseClient.ts"

export function useSalePendingQuery() {
    const supabase = useSupabaseClient()

    return useQuery({
        queryKey: ["sales", "list", "future"],
        queryFn: async () =>
            supabase
                .from("sales")
                .select("*")
                .gte("deliveryDateTime", format(new Date(), "yyyy-MM-dd "))
                .order("deliveryDateTime", { ascending: false })
                .then((it) => it.data),
    })
}
