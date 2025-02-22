import './index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Route, Routes } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Authenticated, NavBar } from './components'
import { Dashboard } from './pages/dashboard'
import { SaleCreateForm, SaleEditForm, SaleList, SaleView } from './pages/sales'
import { PurchaseCreateForm, PurchaseList, PurchaseView } from './pages/purchases'
import { ReportTaxes } from './pages/taxes'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60, // 1 minute
            retry: 1,
        },
    },
})

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <HashRouter>
                <div className='h-screen'>
                    <Authenticated>
                        <div className='py-30'>
                            <Routes>
                                <Route
                                    index
                                    element={<Dashboard />}
                                />
                                <Route path='sales'>
                                    <Route
                                        index
                                        element={<SaleList />}
                                    />
                                    <Route
                                        path='new'
                                        element={<SaleCreateForm />}
                                    />
                                    <Route
                                        path=':id'
                                        element={<SaleView />}
                                    />
                                    <Route
                                        path=':id/edit'
                                        element={<SaleEditForm />}
                                    />
                                </Route>
                                <Route path='purchases'>
                                    <Route
                                        index
                                        element={<PurchaseList />}
                                    />
                                    <Route
                                        path='new'
                                        element={<PurchaseCreateForm />}
                                    />
                                    <Route
                                        path=':id'
                                        element={<PurchaseView />}
                                    />
                                </Route>
                                <Route
                                    path='report-taxes'
                                    element={<ReportTaxes />}
                                />
                            </Routes>
                        </div>
                        <NavBar />
                    </Authenticated>
                </div>
            </HashRouter>
        </QueryClientProvider>
    </StrictMode>
)
