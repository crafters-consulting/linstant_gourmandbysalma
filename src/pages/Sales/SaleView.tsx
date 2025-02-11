import {useParams} from 'react-router-dom';
import {PageHeader} from "../../components";
import {useSaleByIdQuery} from "../../hooks";

export function SaleView() {
    const {id} = useParams<{ id: string }>();
    const {data, isLoading} = useSaleByIdQuery(id!);

    return isLoading || !data ? "Chargement..." : (
        <div>
            <PageHeader title={data.clientName}
                        backUrl="/sales"
                        editUrl={`/sales/${id}/edit`}/>

            <div className="card grid gap-4">
                <p><strong>Date de livraison:</strong> {new Date(data.deliveryDateTime).toLocaleString('fr-FR')}</p>
                <p><strong>Adresse de livraison:</strong> {data.deliveryAddress}</p>
                <p><strong>Montant:</strong> {data.amount.toLocaleString('fr-FR', {
                    style: 'currency',
                    currency: 'EUR'
                })}</p>
                <p><strong>Acompte:</strong> {data.deposit.toLocaleString('fr-FR', {
                    style: 'currency',
                    currency: 'EUR'
                })}</p>
                <p><strong>Restes à payer:</strong> {data.remaining.toLocaleString('fr-FR', {
                    style: 'currency',
                    currency: 'EUR'
                })}</p>
            </div>
        </div>
    )
}
