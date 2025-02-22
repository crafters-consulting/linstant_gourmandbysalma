import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useSupabaseClient } from "./useSupabaseClient.ts"
import { Sale } from "./index.ts"

export function useSaleUpsertMutation({
    onSuccess,
}: {
    onSuccess: () => void
}) {
    const queryClient = useQueryClient()
    const supabase = useSupabaseClient()

    return useMutation({
        mutationFn: async (data: Omit<Sale, "id"> & { id?: string }) => {
            const { error } = await supabase.from("sales").upsert(data)
            if (error) throw error
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["sales"] })
            onSuccess()
        },
    })
}
