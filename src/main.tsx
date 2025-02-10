import './index.css';

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Dashboard} from "./pages/Dashboard";
import {SaleForm, SaleList, SaleView} from "./pages/Sales";
import {PurchaseForm, PurchaseList, PurchaseView} from "./pages/Purchases";
import {NavBar} from "./components/NavBar";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <div className="h-screen">
                <NavBar/>
                <main className="px-4 py-8">
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
                    <p>Copyright © 2025 L'instant Groumand by Salma</p>
                </footer>
            </div>
        </BrowserRouter>
    </StrictMode>
);
