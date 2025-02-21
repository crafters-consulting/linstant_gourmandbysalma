import { useMemo } from 'react'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import type { Database } from './database.types.ts'

let client: SupabaseClient<Database>

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
