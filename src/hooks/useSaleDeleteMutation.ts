import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useSupabaseClient } from "./useSupabaseClient.ts"

export function useSaleDeleteMutation({
    onSuccess,
}: {
    onSuccess?: () => void
}) {
    const queryClient = useQueryClient()
    const supabase = useSupabaseClient()

    return useMutation({
        mutationFn: async (saleId: string) => {
            // 1. Supprimer les sale_items associés
            const { error: itemsError } = await supabase
                .from("sale_items")
                .delete()
                .eq("sale_id", saleId)
            if (itemsError) throw itemsError

            // 2. Supprimer la vente
            const { error: saleError } = await supabase
                .from("sales")
                .delete()
                .eq("id", saleId)
            if (saleError) throw saleError
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["sales"] })
            onSuccess?.()
        },
    })
}
