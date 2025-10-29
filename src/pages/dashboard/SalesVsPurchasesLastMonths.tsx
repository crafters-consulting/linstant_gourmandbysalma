import type React from "react"
import {
    CartesianGrid,
    type LabelProps,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    XAxis,
} from "recharts"
import type { DashboardData } from "../../hooks/useDashboardDataQuery.ts"

export const CustomizedLabel: React.FC<LabelProps> = ({
    x,
    y,
    stroke,
    value,
}) => (
    <text x={x} y={y} dy={-5} fill={stroke} fontSize={8} textAnchor="middle">
        {(value as number).toFixed(2) + " €"}
    </text>
)

export const SalesVsPurchasesLastMonths: React.FC<{
    data: DashboardData[]
}> = ({ data }) => (
    <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
            <LineChart data={data}>
                <XAxis dataKey="date" />
                <Legend verticalAlign="top" height={36} />
                <CartesianGrid strokeDasharray="3 3" />
                <Line
                    name="Ventes"
                    type="monotone"
                    dataKey="saleAmount"
                    stroke="#35a2eb"
                    label={<CustomizedLabel />}
                />
                <Line
                    name="Acompte"
                    type="monotone"
                    dataKey="deposit"
                    stroke="#35eba2"
                    label={<CustomizedLabel />}
                />
                <Line
                    name="Dépenses"
                    type="monotone"
                    dataKey="purchase"
                    stroke="#ff6385"
                    label={<CustomizedLabel />}
                />
            </LineChart>
        </ResponsiveContainer>
    </div>
)
