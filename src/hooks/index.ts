import {useEffect, useMemo, useState} from 'react'
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {createClient, Session, type SupabaseClient} from '@supabase/supabase-js'
import type {Database} from './database.types'

export type Purchase = Database['public']['Tables']['purchases']['Row'];
export type Sale = Database['public']['Tables']['sales']['Row'];

type TypedSupabaseClient = SupabaseClient<Database>
let client: TypedSupabaseClient

export function useSupabaseClient() {
    return useMemo(() => {
        if (!client) {
            client = createClient<Database>(
                import.meta.env.VITE_SUPABASE_URL!,
                import.meta.env.VITE_SUPABASE_ANON_KEY!
            )
        }

        return client
    }, [])
}

export function useSupabaseSession() {
    const supabaseClient = useSupabaseClient()
    const [session, setSession] = useState<Session | null>(null)

    useEffect(() => {
        supabaseClient.auth.getSession().then((result) => {
            setSession(result.data.session)
        })

        supabaseClient.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [supabaseClient])

    return session;
}

export function useSignInMutation() {
    const supabaseClient = useSupabaseClient()
    const signInWithPassword = async (form: { email: string, password: string }) => {
        const {data, error} = await supabaseClient.auth.signInWithPassword(form)
        if (error) throw ""
        return data;
    };

    return useMutation({mutationFn: signInWithPassword})
}

export function useSaleListQuery() {
    const supabase = useSupabaseClient();

    return useQuery({
        queryKey: ['sale', 'list'],
        queryFn: async () => supabase
            .from('sales')
            .select('*')
            .then(it => it.data)
    })
}

export function usePurchaseListQuery() {
    const supabase = useSupabaseClient();

    return useQuery({
        queryKey: ['purchase', 'list'],
        queryFn: async () => supabase
            .from('purchases')
            .select('*')
            .then(it => it.data)
    })
}

export function usePurchaseByIdQuery(id: string) {
    const supabase = useSupabaseClient();

    return useQuery({
        queryKey: ['purchase', 'byId', id],
        queryFn: async () => supabase
            .from('purchases')
            .select('*')
            .eq('id', id)
            .throwOnError()
            .single<Purchase>()
            .then(it => it.data),
    })
}

export function useSaleByIdQuery(id: string) {
    const supabase = useSupabaseClient();

    return useQuery({
        queryKey: ['purchase', 'byId', id],
        queryFn: async () => supabase
            .from('sales')
            .select('*')
            .eq('id', id)
            .throwOnError()
            .single<Sale>()
            .then(it => it.data),
    })
}

export function useSaveOrUpdatePurchaseMutation({onSuccess}: { onSuccess: () => void }) {
    const queryClient = useQueryClient()
    const supabase = useSupabaseClient();

    return useMutation({
        mutationFn: async ({id, ...data}: Omit<Purchase, 'id'> & { id?: string }) => {
            if (id) {
                const {error} = await supabase
                    .from('purchases')
                    .update(data)
                    .eq('id', id);
                if (error) throw error;
            } else {
                const {error} = await supabase
                    .from('purchases')
                    .insert([data])
                if (error) throw error;
            }
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ['purchases']});
            onSuccess()
        },
    })
}

export function useSaveOrUpdateSaleMutation({onSuccess}: { onSuccess: () => void }) {
    const queryClient = useQueryClient()
    const supabase = useSupabaseClient();

    return useMutation({
        mutationFn: async ({id, ...data}: Omit<Sale, 'id'> & { id?: string }) => {
            if (id) {
                const {error} = await supabase
                    .from('sales')
                    .update(data)
                    .eq('id', id);
                if (error) throw error;
            } else {
                const {error} = await supabase
                    .from('sales')
                    .insert([data])
                if (error) throw error;
            }
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ['sales']});
            onSuccess()
        },
    })
}
