import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useSupabaseClient } from "./useSupabaseClient.ts"

export function usePurchaseDeleteMutation({
    onSuccess,
}: {
    onSuccess?: () => void
}) {
    const queryClient = useQueryClient()
    const supabase = useSupabaseClient()

    return useMutation({
        mutationFn: async (purchaseId: string) => {
            // Supprimer l'achat
            const { error: purchaseError } = await supabase
                .from("purchases")
                .delete()
                .eq("id", purchaseId)
            if (purchaseError) throw purchaseError
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["purchases"] })
            onSuccess?.()
        },
    })
}
