import { useSupabaseClient } from "./useSupabaseClient.ts"
import { useQuery } from "@tanstack/react-query"

export function useSaleListQuery() {
    const supabase = useSupabaseClient()

    return useQuery({
        queryKey: ["sales", "list"],
        queryFn: async () =>
            supabase
                .from("sales")
                .select("*")
                .order("deliveryDateTime", { ascending: false })
                .then((it) => it.data),
    })
}
