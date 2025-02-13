import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {Line} from 'react-chartjs-2';
import {PageHeader} from "../../components";
import {useDashboardDataQuery} from "../../hooks";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const Dashboard = () => {
    const {data, isLoading} = useDashboardDataQuery()

    return (
        <>
            <PageHeader title="Tableau de Board"/>
            <main>
                {isLoading || !data ? "Chargement..." : (
                    <div className="card mb-8">
                        <h2 className="mb-4">Ventes / Achats par mois</h2>

                        <Line data={{
                            labels: ['January', 'February', 'March'],
                            datasets: [
                                {
                                    label: 'Ventes',
                                    data: [200, 100, 300],
                                    borderColor: 'rgb(255, 99, 132)',
                                },
                                {
                                    label: 'Acompte',
                                    data: [70, 30, 100],
                                    borderColor: 'rgb(53, 162, 235)',
                                },
                                {
                                    label: 'Dépenses',
                                    data: [90, 35, 95],
                                    borderColor: 'rgb(53, 235, 162)',
                                },
                            ],
                        }}
                        />
                    </div>
                )}
            </main>
        </>
    )
}

/*
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
 */