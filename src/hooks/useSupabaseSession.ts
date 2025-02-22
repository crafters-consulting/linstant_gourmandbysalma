import { useSupabaseClient } from "./useSupabaseClient.ts"
import { useEffect, useState } from "react"
import { Session } from "@supabase/supabase-js"

export function useSupabaseSession() {
    const supabaseClient = useSupabaseClient()
    const [session, setSession] = useState<Session | null>(null)
    const [isLoading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        setLoading(true)
        supabaseClient.auth.getSession()
            .then((result) => setSession(result.data.session))
            .finally(() => setLoading(false))

        const { data: listener } = supabaseClient.auth
            .onAuthStateChange((_event, session) => {
                setSession(session)
                setLoading(false)
            })

        return () => listener.subscription.unsubscribe()
    }, [supabaseClient])

    return { session, isLoading }
}
