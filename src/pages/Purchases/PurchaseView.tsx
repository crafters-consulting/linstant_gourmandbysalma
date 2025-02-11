import {useParams} from 'react-router-dom';
import {usePurchaseByIdQuery} from "../../hooks";
import {PageHeader} from "../../components";

export function PurchaseView() {
    const {id} = useParams<{ id: string }>();
    const {data, isLoading} = usePurchaseByIdQuery(id!);

    return (
        <div>
            <PageHeader title="Achat"
                        backUrl="/purchases"
                        editUrl={`/purchases/${id}/edit`}/>

            <div className="bg-white p-6 rounded-lg shadow-md grid gap-4">

                {isLoading || !data ? "" : (<>
                    <p><strong>Date:</strong> {new Date(data.date).toLocaleDateString('fr-FR')}</p>
                    <p><strong>Amount:</strong> {data.amount.toLocaleString('fr-FR', {
                        style: 'currency',
                        currency: 'EUR'
                    })}</p>
                    <p><strong>Comment:</strong> {data.comment}</p>
                </>)}
            </div>
        </div>
    );
}
