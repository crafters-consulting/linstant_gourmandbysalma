import {useMemo} from 'react'
import {useQuery} from '@tanstack/react-query'
import {createClient, type SupabaseClient} from '@supabase/supabase-js'
import type {Database} from './database.types'

type Purchase = Database['public']['Tables']['purchases']['Row'];

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

export function useSaleListQuery() {
    const supabase = useSupabaseClient();

    return useQuery({
        queryKey: ['sale', 'list'],
        queryFn: () => supabase
            .from('salse')
            .select('*'),
    })
}

export function usePurchaseListQuery() {
    const supabase = useSupabaseClient();

    return useQuery({
        queryKey: ['purchase', 'list'],
        queryFn: () => supabase
            .from('purchases')
            .select('*'),
    })
}

export function usePurchaseByIdQuery(id: string) {
    const supabase = useSupabaseClient();

    return useQuery({
        queryKey: ['purchase', 'byId', id],
        queryFn: () => supabase
            .from('purchases')
            .select('*')
            .eq('id', id)
            .throwOnError()
            .single<Purchase>()
            .then(it => it.data),
    })
}

/*

  const { data: purchases = [], isLoading } = useQuery({
    queryKey: ['purchases'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('purchases')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!session,
  });


  const addPurchaseMutation = useMutation({
    mutationFn: async (label: string) => {
      const { error } = await supabase.from('purchases').insert([
        {
          label,
          user_id: session.user.id,
        },
      ]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purchases'] });
      setNewLabel('');
    },
  });

  const updatePurchaseMutation = useMutation({
    mutationFn: async ({ id, label }: { id: string; label: string }) => {
      const { error } = await supabase
        .from('purchases')
        .update({ label })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purchases'] });
      setEditingId(null);
    },
  });

  const deletePurchaseMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('purchases').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purchases'] });
    },
  });
 */