import type { FC, PropsWithChildren } from 'react'
import { useSupabaseSession } from '../../hooks'
import { SignIn } from './SignIn.tsx'

export const Authenticated: FC<PropsWithChildren> = ({ children }) => {
    const session = useSupabaseSession()
    return session ? children : <SignIn />
}
