import {useSupabaseClient} from "./useSupabaseClient.ts";
import {useQuery} from "@tanstack/react-query";
import {Sale} from "./index.ts";

export function useSaleByIdQuery(id: string) {
    const supabase = useSupabaseClient();

    return useQuery({
        queryKey: ['sales', 'byId', id],
        queryFn: async () => supabase
            .from('sales')
            .select('*')
            .eq('id', id)
            .throwOnError()
            .single<Sale>()
            .then(it => it.data),
    })
}