import './index.css';

import {StrictMode, useState, useEffect} from 'react';
import {createRoot} from 'react-dom/client';
import {HashRouter, Route, Routes} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Dashboard} from "./pages/Dashboard";
import {SaleForm, SaleList, SaleView} from "./pages/Sales";
import {PurchaseForm, PurchaseList, PurchaseView} from "./pages/Purchases";
import {NavBar} from "./components/NavBar";
import {useSupabaseClient} from "./hooks";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60, // 1 minute
            retry: 1,
        },
    },
});

const Auth = () => {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const supabaseClient = useSupabaseClient()

    const handleLogin = async (event) => {
        event.preventDefault()

        setLoading(true)
        const {error} = await supabaseClient.auth.signInWithPassword({email, password,})

        if (error) {
            alert(error.error_description || error.message)
        } else {
            alert('Check your email for the login link!')
        }
        setLoading(false)
    }

    return (
        <div className="row flex flex-center">
            <div className="col-6 form-widget">
                <h1 className="header">Supabase + React</h1>
                <form className="form-widget" onSubmit={handleLogin}>
                    <div>
                        <input
                            type="email"
                            placeholder="Your email"
                            value={email}
                            required={true}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <button className={'button block'} disabled={loading}>
                            {loading ? <span>Loading</span> : <span>Send</span>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

const App = () => {
    const supabaseClient = useSupabaseClient()
    const [session, setSession] = useState(null)

    useEffect(() => {
        supabaseClient.auth.getSession().then((result) => {
            setSession(result.data.session)
        })

        supabaseClient.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [supabaseClient])

    if (!session) return <Auth/>

    return (
        <div className="h-screen">
            <NavBar/>
            <main className="px-4 py-25">
                <Routes>
                    <Route index element={<Dashboard/>}/>
                    <Route path="sales">
                        <Route index element={<SaleList/>}/>
                        <Route path="new" element={<SaleForm/>}/>
                        <Route path=":id" element={<SaleView/>}/>
                        <Route path=":id/edit" element={<SaleForm/>}/>
                    </Route>
                    <Route path="purchases">
                        <Route index element={<PurchaseList/>}/>
                        <Route path="new" element={<PurchaseForm/>}/>
                        <Route path=":id" element={<PurchaseView/>}/>
                        <Route path=":id/edit" element={<PurchaseForm/>}/>
                    </Route>
                </Routes>
            </main>
            <footer className="text-sm text-center py-6 mx-4 border-t-1 border-gray-300 text-gray-400">
                <p>A project by Crafters</p>
                <p>Copyright © {new Date().getFullYear()} L'instant Groumand by Salma</p>
            </footer>
        </div>
    )
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <HashRouter>
                <App/>
            </HashRouter>
        </QueryClientProvider>
    </StrictMode>
);
