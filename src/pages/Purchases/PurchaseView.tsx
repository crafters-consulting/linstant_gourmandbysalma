import {useParams} from 'react-router-dom';
import {usePurchaseByIdQuery} from "../../hooks";
import {PageHeader} from "../../components";

export function PurchaseView() {
    const {id} = useParams<{ id: string }>();
    const {data, isLoading} = usePurchaseByIdQuery(id!);

    return (
        <>
            <PageHeader title="Detail de l'Achat"
                        backUrl="/purchases"/>

            {isLoading || !data ? "Chargement..." : (
                <main className="card grid gap-4">
                    <p><strong>Date:</strong> {new Date(data.date).toLocaleDateString('fr-FR')}</p>
                    <p><strong>Amount:</strong> {data.amount.toLocaleString('fr-FR', {
                        style: 'currency',
                        currency: 'EUR'
                    })}</p>
                    <p><strong>Comment:</strong> {data.description}</p>
                </main>
            )}
        </>
    )
}
