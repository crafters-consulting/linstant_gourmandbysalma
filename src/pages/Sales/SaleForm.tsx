import {useNavigate, useParams} from 'react-router-dom';
import {Save} from 'lucide-react';
import {useForm} from "react-hook-form"
import {PageHeader} from "../../components";
import {Sale, useSaveOrUpdateSaleMutation} from "../../hooks";

export function SaleForm() {
    const {id} = useParams();
    const navigate = useNavigate();
    const {register, handleSubmit} = useForm<Sale>();
    const {mutate, isPending} = useSaveOrUpdateSaleMutation({
        onSuccess: () => navigate('/sales')
    })

    return (
        <form onSubmit={handleSubmit(it => mutate({...it, id}))}>
            <PageHeader title={id ? 'Modification de Vente' : 'Nouvelle Vente'}/>

            <div className="card mb-6">
                <div className="mb-6">
                    <label className="mb-2">Date de Livraison</label>
                    <input type="datetime-local"  {...register("deliveryDateTime")}/>
                </div>

                <div className="mb-6">
                    <label className="mb-2">Client</label>
                    <input {...register("clientName")} />
                </div>

                <div className="mb-6">
                    <label className="mb-2">Adresse de Livraison</label>
                    <textarea {...register("deliveryAddress")} rows={3}/>
                </div>

                <div className="mb-6">
                    <label className="mb-2">Montant</label>
                    <input {...register("amount")} type="number"/>
                </div>

                <div className="mb-6">
                    <label className="mb-2">Acompte</label>
                    <div className="flex gap-4">
                        <input {...register("deposit")} type="number"/>
                        <select {...register("depositPaymentMethod")}>
                            <option value="Revolut">Revolut</option>
                            <option value="PayPal">PayPal</option>
                            <option value="Cash">Espèces</option>
                        </select>
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block font-medium mb-2">Reste à Payer</label>
                    <div className="flex gap-4">
                        <input {...register("remaining")} type="number" />
                        <select {...register("remainingPaymentMethod")}>
                            <option value="Cash">Espèces</option>
                            <option value="Revolut">Revolut</option>
                            <option value="PayPal">PayPal</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="flex justify-end">
                <button type="submit" className="primary" disabled={isPending}>
                    <Save size={20}/> Enregistrer
                </button>
            </div>
        </form>
    );
}
