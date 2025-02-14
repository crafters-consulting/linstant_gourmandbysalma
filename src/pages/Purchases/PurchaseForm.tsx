import {useNavigate, useParams} from 'react-router-dom';
import {Save} from 'lucide-react';
import {PageHeader} from "../../components";
import {useForm} from "react-hook-form";
import {Purchase, useSaveOrUpdatePurchaseMutation} from "../../hooks";

export function PurchaseForm() {
    const {id} = useParams();
    const navigate = useNavigate();
    const {register, handleSubmit} = useForm<Purchase>();
    const {mutate, isPending} = useSaveOrUpdatePurchaseMutation({
        onSuccess: () => navigate('/purchases')
    })

    return (
        <form onSubmit={handleSubmit(it => mutate(it))}>
            <PageHeader title={id ? "Modification d'Achat" : 'Nouvel Achat'}
            backUrl="/purchases"/>

            <main className="grid gap-10">
                <div className="card">
                    <div className="mb-6">
                        <label>Date d'achat</label>
                        <input type="date"  {...register("date")}/>
                    </div>
                    <div className="mb-6">
                        <label>Amount</label>
                        <input type="number" {...register("amount")} />
                    </div>

                    <div className="mb-6">
                        <label>Commentaire</label>
                        <textarea {...register("description")} rows={3}/>
                    </div>
                </div>
                <button type="submit" className="primary" disabled={isPending}>
                    <Save size={20}/> Enregistrer
                </button>
            </main>
        </form>
    );
}