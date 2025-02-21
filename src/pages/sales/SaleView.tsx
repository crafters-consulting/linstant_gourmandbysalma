import {Link, useParams} from 'react-router';
import {PageHeader} from "../../components";
import {Edit, Trash} from "lucide-react";
import {format, isFuture} from "date-fns";
import {fr} from "date-fns/locale";
import {useSaleByIdQuery} from "../../hooks";

export function SaleView() {
    const {id} = useParams<{ id: string }>();
    const {data, isLoading} = useSaleByIdQuery(id!);

    return (
        <>
            <PageHeader title="Detail de la Vente" backUrl="/sales"/>

            {isLoading || !data ? "Chargement..." : (
                <main className="grid gap-4">
                    <article className="card">
                        <label>Date de livraison</label>
                        <p>{format(data.deliveryDateTime, 'EEEE dd LLLL yyyy à HH:mm', {locale: fr})}</p>
                    </article>
                    <article className="card">
                        <label>Client</label>
                        <p>{data.clientName}</p>
                    </article>
                    <article className="card">
                        <label>Adresse de livraison</label>
                        <p>{data.deliveryAddress}</p>
                    </article>
                    <article className="card">
                        <label>Commentaire</label>
                        <p>{data.description}</p>
                    </article>

                    <article className="card flex justify-between gap-4">
                        <div>
                            <label>Montant</label>
                            <p>{data.amount.toLocaleString('fr-FR', {style: 'currency', currency: 'EUR'})}</p>
                        </div>
                        <div className="text-green-600">
                            <label>Acompte</label>
                            <p>{data.deposit.toLocaleString('fr-FR', {style: 'currency', currency: 'EUR'})}</p>
                        </div>
                        <div className="text-red-600">
                            <label>Restes à payer</label>
                            <p>{data.remaining.toLocaleString('fr-FR', {style: 'currency', currency: 'EUR'})}</p>
                        </div>
                    </article>
                    {isFuture(data.deliveryDateTime) && (
                        <>
                            <Link to={`/sales/${id}/edit`} className="button primary">
                                <Edit size={20}/> Modifier
                            </Link>
                            <button className="danger">
                                <Trash size={20}/> Supprimer
                            </button>
                        </>
                    )}
                </main>
            )}
        </>
    )
}
