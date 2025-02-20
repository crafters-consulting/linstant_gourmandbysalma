import {useEffect, useMemo, useState} from 'react'
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {createClient, Session, type SupabaseClient} from '@supabase/supabase-js'
import type {Database} from './database.types'
import {format} from "date-fns";
import {fr} from "date-fns/locale";

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
        queryKey: ['sales', 'list'],
        queryFn: async () => supabase
            .from('sales')
            .select('*')
            .order('deliveryDateTime', {ascending: false})
            .then(it => it.data)
    })
}

export function useFutureSalesQuery() {
    const supabase = useSupabaseClient();

    return useQuery({
        queryKey: ['sales', 'list', 'future'],
        queryFn: async () => supabase
            .from('sales')
            .select('*')
            .gte('deliveryDateTime', format(new Date(), 'yyyy-MM-dd '))
            .order('deliveryDateTime', {ascending: false})
            .then(it => it.data)
    })
}

export function usePurchaseListQuery() {
    const supabase = useSupabaseClient();

    return useQuery({
        queryKey: ['purchases', 'list'],
        queryFn: async () => supabase
            .from('purchases')
            .select('*')
            .order('date', {ascending: false})
            .then(it => it.data)
    })
}

export function usePurchaseByIdQuery(id: string) {
    const supabase = useSupabaseClient();

    return useQuery({
        queryKey: ['purchases', 'byId', id],
        queryFn: async () => supabase
            .from('purchases')
            .select('*')
            .eq('id', id)
            .throwOnError()
            .single<Purchase>()
            .then(it => it.data),
    })
}

export function usePurchaseSalesByPurchaseIdQuery(purchaseId: string) {
    const supabase = useSupabaseClient();

    return useQuery({
        queryKey: ['purchases', 'sales', purchaseId],
        queryFn: async () => supabase
            .from('sale_purchases')
            .select('sale_id, sales(deliveryDateTime, clientName)')
            .eq('purchase_id', purchaseId)
            .throwOnError()
            .then(it => it.data),
    })
}

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

export function useInsertPurchaseMutation({onSuccess}: { onSuccess: () => void }) {
    const queryClient = useQueryClient()
    const supabase = useSupabaseClient();

    return useMutation({
        mutationFn: async ({affectedSales, ...data}: Omit<Purchase, 'id'> & {
            id?: string,
            affectedSales: string[]
        }) => {

            const {data: inserted, error} = await supabase
                .from('purchases')
                .insert(data)
                .select()
            if (error) throw error;

            const purchase_id = inserted[0].id

            const {error: deleteError} = await supabase
                .from('sale_purchases')
                .delete()
                .eq("sale_id", purchase_id)
            if (deleteError) throw deleteError;

            const {error: insertError} = await supabase
                .from('sale_purchases')
                .insert(affectedSales.map(sale_id => ({purchase_id, sale_id})))
            if (insertError) throw insertError;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ['purchases']});
            onSuccess()
        },
    })
}

export function useUpsertSaleMutation({onSuccess}: { onSuccess: () => void }) {
    const queryClient = useQueryClient()
    const supabase = useSupabaseClient();

    return useMutation({
        mutationFn: async (data: Omit<Sale, 'id'> & { id?: string }) => {
            const {error} = await supabase
                .from('sales')
                .upsert(data);
            if (error) throw error;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ['sales']});
            onSuccess()
        },
    })
}

export function useDashboardDataQuery() {
    const {data: saleData, isLoading: isLoadingSales} = useSaleListQuery()
    const {data: purchaseData, isLoading: isLoadingPurchase} = usePurchaseListQuery()

    const data = useMemo(() => {

        const mergedData = [
            ...(saleData || []).map(it => ({
                date: it.deliveryDateTime,
                saleAmount: it.amount,
                saleDeposit: it.deposit,
                purchaseDeposit: 0
            })),
            ...(purchaseData || []).map(it => ({
                date: it.date,
                saleAmount: 0,
                saleDeposit: 0,
                purchaseDeposit: it.amount,
            })),
        ]
            .sort((a, b) => a.date.substring(0, 10).localeCompare(b.date.substring(0, 10)))
            .map(it => ({
                ...it,
                date: format(it.date, 'MMMM yyyy', {locale: fr}),
            }))
            .reduce((acc, it) => (
                    {...acc,
                        [it.date]: {
                            ...it,
                            saleAmount: ((acc[it.date])?.saleAmount || 0) + it.saleAmount,
                            saleDeposit: ((acc[it.date])?.saleDeposit || 0) + it.saleDeposit,
                            purchaseDeposit: ((acc[it.date])?.purchaseDeposit || 0) + it.purchaseDeposit
                        }
                    }),
                {}
            )

        const results = Object.values(mergedData)

        return {
             labels: results.map(it => it.date),
             datasets: [
                 {
                     label: 'Ventes',
                     data: results.map(it => it.saleAmount),
                     borderColor: 'rgb(255, 99, 132)',
                 },
                 {
                     label: 'Acompte',
                     data: results.map(it => it.saleDeposit),
                     borderColor: 'rgb(53, 162, 235)',
                 },
                 {
                     label: 'Dépenses',
                     data: results.map(it => it.purchaseDeposit),
                     borderColor: 'rgb(53, 235, 162)',
                 },
             ],
         }
    }, [saleData, purchaseData])

    return {
        isLoading: isLoadingSales && isLoadingPurchase,
        data
    }
}

type ReportTaxe = {
    date: string;
    dateMonth: string;
    amount: number;
};

function getReportTaxes(data: Sale[]) {
    return Object.values(
        data
            .map(it => ({
                date: it.deliveryDateTime,
                dateMonth: it.deliveryDateTime.substring(0, 7),
                amount: (it.depositPaymentMethod === 'Cash' ? 0 : it.deposit) + (it.remainingPaymentMethod === 'Cash' ? 0 : it.remaining)
            } as ReportTaxe))
            .filter(it => it.amount > 0)
            .reduce<Record<string, ReportTaxe>>((acc, it) => (
                    {...acc, [it.dateMonth]: {...it, amount: ((acc[it.dateMonth])?.amount || 0) + it.amount}}),
                {}
            )
    )
}

export function useReportTaxesQuery() {
    const {data, isLoading} = useSaleListQuery()
    const reportTaxes = useMemo(() => !data ? [] : getReportTaxes(data), [data])

    return {
        isLoading,
        data: reportTaxes,
    }
}