import React from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis } from 'recharts'
import { DashboardData } from '../../hooks/useDashboardDataQuery.ts'


export const SalesVsPurchasesLastMonths: React.FC<{ data: DashboardData[] }> = ({ data }) => (
    <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
            <LineChart data={data}>
                <XAxis dataKey="date" />
                <Legend verticalAlign="top" height={36} />
                <CartesianGrid strokeDasharray="3 3" />
                <Line name="Ventes"  type="monotone" dataKey="saleAmount" stroke="#35a2eb" />
                <Line name="Acompte"  type="monotone" dataKey="deposit" stroke="#35eba2" />
                <Line name="Dépenses"  type="monotone" dataKey="purchase" stroke="#ff6385" />
            </LineChart>
        </ResponsiveContainer>
    </div>
)