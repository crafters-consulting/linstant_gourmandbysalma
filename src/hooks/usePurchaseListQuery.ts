import { useQuery } from "@tanstack/react-query"
import { useSupabaseClient } from "./useSupabaseClient.ts"

export function usePurchaseListQuery() {
    const supabase = useSupabaseClient()

    return useQuery({
        queryKey: ["purchases", "list"],
        queryFn: async () =>
            supabase
                .from("purchases")
                .select("*")
                .order("date", { ascending: false })
                .then((it) => it.data),
    })
}
