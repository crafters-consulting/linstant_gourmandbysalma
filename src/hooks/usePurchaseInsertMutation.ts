import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useSupabaseClient } from "./useSupabaseClient.ts"
import { Purchase } from "./index.ts"

export const usePurchaseInsertMutation = ({
    onSuccess,
}: {
    onSuccess: () => void
}) => {
    const queryClient = useQueryClient()
    const supabase = useSupabaseClient()

    return useMutation({
        mutationFn: async ({
            affectedSales,
            ...data
        }: Omit<Purchase, "id"> & {
            id?: string
            affectedSales: string[]
        }) => {
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

            const { error: insertError } = await supabase
                .from("sale_purchases")
                .insert(
                    affectedSales.map((sale_id) => ({ purchase_id, sale_id }))
                )
            if (insertError) throw insertError
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["purchases"] })
            onSuccess()
        },
    })
}
