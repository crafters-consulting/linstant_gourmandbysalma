import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { Purchase } from "./index.ts"
import { useSupabaseClient } from "./useSupabaseClient.ts"

export const usePurchaseInsertMutation = ({
    onSuccess,
}: {
    onSuccess: () => void
}) => {
    const queryClient = useQueryClient()
    const supabase = useSupabaseClient()

    return useMutation({
        mutationFn: async ({
            ...data
        }: Omit<Purchase, "id"> & { id?: string }) => {
            const { data: inserted, error } = await supabase
                .from("purchases")
                .insert(data)
                .select()
            if (error) throw error

            const purchase_id = inserted[0].id

            const { error: deleteError } = await supabase
                .from("sale_purchases")
                .delete()
                .eq("sale_id", purchase_id)
            if (deleteError) throw deleteError
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["purchases"] })
            onSuccess()
        },
    })
}
