import './index.css';

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {HashRouter, Route, Routes} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {NavBar} from "./components/NavBar";
import {Authenticated} from "./pages/Auth";
import {Dashboard} from "./pages/Dashboard";
import {SaleForm, SaleList, SaleView} from "./pages/Sales";
import {PurchaseForm, PurchaseList, PurchaseView} from "./pages/Purchases";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60, // 1 minute
            retry: 1,
        },
    },
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <HashRouter>
                <div className="h-screen">
                    <Authenticated>
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
                    </Authenticated>
                    <footer className="text-sm text-center py-6 mx-4 border-t-1 border-gray-300 text-gray-400">
                        <p>A project by Crafters</p>
                        <p>Copyright © {new Date().getFullYear()} L'instant Groumand by Salma</p>
                    </footer>
                </div>
            </HashRouter>
        </QueryClientProvider>
    </StrictMode>
);
