import { useSupabaseClient } from "./useSupabaseClient.ts"
import { useQuery } from "@tanstack/react-query"

export function usePurchaseSalesByPurchaseIdQuery(purchaseId: string) {
    const supabase = useSupabaseClient()

    return useQuery({
        queryKey: ["purchases", "sales", purchaseId],
        queryFn: async () =>
            supabase
                .from("sale_purchases")
                .select("sale_id, sales(deliveryDateTime, clientName)")
                .eq("purchase_id", purchaseId)
                .throwOnError()
                .then((it) => it.data),
    })
}
