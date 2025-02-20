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

                        <Line data={data}/>
                    </div>
                )}
            </main>
        </>
    )
}
