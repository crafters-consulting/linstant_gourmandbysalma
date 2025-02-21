import {useSupabaseClient} from "./useSupabaseClient.ts";
import {useMutation} from "@tanstack/react-query";

export function useSignInMutation() {
    const supabaseClient = useSupabaseClient()
    const signInWithPassword = async (form: { email: string, password: string }) => {
        const {data, error} = await supabaseClient.auth.signInWithPassword(form)
        if (error) throw ""
        return data;
    };

    return useMutation({mutationFn: signInWithPassword})
}