import { useSupabaseClient } from './useSupabaseClient.ts'
import { useQuery } from '@tanstack/react-query'

export function usePurchaseListQuery() {
    const supabase = useSupabaseClient()

    return useQuery({
        queryKey: ['purchases', 'list'],
        queryFn: async () =>
            supabase
                .from('purchases')
                .select('*')
                .order('date', { ascending: false })
                .then((it) => it.data),
    })
}
