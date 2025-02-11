import {Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, XAxis, YAxis} from 'recharts';
import {PageHeader} from "../../components";

const data = [
    {name: 'Sep', diffAmount: 4000, purchaseAmount: 2400},
    {name: 'Oct', diffAmount: 4000, purchaseAmount: 2400},
    {name: 'Nov', diffAmount: 4000, purchaseAmount: 2400},
    {name: 'Déc', diffAmount: 4000, purchaseAmount: 2400},
    {name: 'Jan', diffAmount: 4000, purchaseAmount: 2400},
    {name: 'Fév', diffAmount: 4000, purchaseAmount: 2400},
];

const data2 = [
    {name: 'Group A', value: 400},
    {name: 'Group B', value: 300},
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const Dashboard = () => (
    <div>
        <PageHeader title="Tableau de Board"/>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-lg font-medium mb-4">Ventes / Achats du mois courant</h2>
            <ResponsiveContainer height={350}>
                <PieChart>
                    <Pie
                        data={data2}
                        cx="50%"
                        cy="50%"
                        dataKey="value"
                        fill="#8884d8"
                        label={(entry) => entry.name}
                    >
                        {data2.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-lg font-medium mb-4">Ventes / Achats</h2>
            <ResponsiveContainer height={350}>
                <PieChart>
                    <Pie
                        data={data2}
                        cx="50%"
                        cy="50%"
                        dataKey="value"
                        fill="#8884d8"
                        label={(entry) => entry.name}
                    >
                        {data2.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-lg font-medium mb-4">Ventes / Achats par mois</h2>
            <ResponsiveContainer height={350}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <Bar dataKey="purchaseAmount" stackId="a" fill="#ff0000"/>
                    <Bar dataKey="diffAmount" stackId="a" fill="#00ff00"/>
                </BarChart>
            </ResponsiveContainer>
        </div>
    </div>
)