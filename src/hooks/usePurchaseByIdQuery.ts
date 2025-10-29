import { useQuery } from "@tanstack/react-query"
import type { Purchase } from "./index.ts"
import { useSupabaseClient } from "./useSupabaseClient.ts"

export function usePurchaseByIdQuery(id: string) {
    const supabase = useSupabaseClient()

    return useQuery({
        queryKey: ["purchases", "byId", id],
        queryFn: async () =>
            supabase
                .from("purchases")
                .select("*")
                .eq("id", id)
                .throwOnError()
                .single<Purchase>()
                .then((it) => it.data),
    })
}
