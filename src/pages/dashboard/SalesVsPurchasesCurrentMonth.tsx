import type React from "react"
import { useMemo } from "react"
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"
import type { DashboardData } from "../../hooks/useDashboardDataQuery.ts"

export const SalesVsPurchasesCurrentMonth: React.FC<{
    data: DashboardData
}> = ({ data }) => {
    const { data01, data02 } = useMemo(
        () => ({
            data01: [
                { name: "Acompte", value: data.deposit },
                {
                    name: "Restes à payer",
                    value: data.saleAmount - data.deposit,
                },
            ],
            data02: [
                { name: "Achat", value: data.purchase },
                { name: "Blanc", value: data.saleAmount - data.purchase },
            ],
        }),
        [data]
    )

    return (
        <div style={{ width: "100%", height: 250 }}>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={data01}
                        dataKey="value"
                        outerRadius={90}
                        fill="#8884d8"
                    >
                        <Cell key={`cell-0`} fill="#35eba2" />
                        <Cell key={`cell-1`} fill="#35a2eb" />
                    </Pie>
                    <Pie
                        data={data02}
                        dataKey="value"
                        innerRadius={92}
                        outerRadius={100}
                        fill="#82ca9d"
                    >
                        <Cell key={`cell-0`} fill="#ff6385" />
                        <Cell key={`cell-1`} fill="#ffffff" />
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}
