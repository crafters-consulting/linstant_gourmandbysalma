import { useSupabaseClient } from './useSupabaseClient.ts'
import { useEffect, useState } from 'react'
import { Session } from '@supabase/supabase-js'

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

    return session
}
