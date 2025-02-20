import './index.css';

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {HashRouter, Route, Routes} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {NavBar} from "./components/NavBar";
import {Authenticated} from "./pages/Auth";
import {Dashboard} from "./pages/Dashboard";
import {SaleForm, SaleList, SaleView} from "./pages/Sales";
import {PurchaseCreate, PurchaseList, PurchaseView} from "./pages/Purchases";
import {ReportTaxes} from "./pages/taxes";

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
                        <div className="py-30">
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
                                    <Route path="new" element={<PurchaseCreate/>}/>
                                    <Route path=":id" element={<PurchaseView/>}/>
                                </Route>
                                <Route path="report-taxes" element={<ReportTaxes/>}/>
                            </Routes>
                        </div>
                        <NavBar/>
                    </Authenticated>
                </div>
            </HashRouter>
        </QueryClientProvider>
    </StrictMode>
);
