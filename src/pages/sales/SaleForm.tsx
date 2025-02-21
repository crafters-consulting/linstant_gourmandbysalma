import React, {useEffect} from "react";
import {useNavigate, useParams} from 'react-router';
import {Save} from 'lucide-react';
import {useForm} from "react-hook-form"
import {PageHeader} from "../../components";
import {Sale, useSaleByIdQuery, useUpsertSaleMutation} from "../../hooks";

export function SaleForm() {
    const {id} = useParams();
    return id ? <SaleEditForm id={id}/> : <SaleCreateForm/>
}

const SaleEditForm: React.FC<{ id: string }> = ({id}) => {
    const {data, isLoading} = useSaleByIdQuery(id)

    return isLoading || !data
        ? "Chargement..."
        : <SaleFormWithDefaultValues
            title="Modification de Vente"
            data={data}
            backUrl={`/sales/${data.id}`}
        />
}

const SaleCreateForm: React.FC = () => {
    return <SaleFormWithDefaultValues
        title="Nouvelle Vente"
        data={{} as Sale}
        backUrl="/sales"
    />
}

const SaleFormWithDefaultValues: React.FC<{
    data: Sale, title: string, backUrl: string
}> = ({title, data, backUrl}) => {
    const navigate = useNavigate();
    const {register, watch, setValue, handleSubmit} = useForm<Sale>({defaultValues: data});
    const amount = watch('amount');
    const {mutate, isPending} = useUpsertSaleMutation({
        onSuccess: () => navigate('/sales')
    })

    useEffect(() => {
        if (amount !== undefined) {
            const deposit = Math.ceil(Math.ceil(amount * .3))
            setValue('deposit', deposit);
            setValue('remaining', amount - deposit);
        }
    }, [amount, setValue]);

    return (
        <form onSubmit={handleSubmit(it => mutate(it))}>
            <PageHeader title={title} backUrl={backUrl}/>

            <main className="grid gap-4">
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
                        <textarea {...register("deliveryAddress")} rows={2}/>
                    </div>

                    <div className="mb-6">
                        <label className="mb-2">Commentaire</label>
                        <textarea {...register("description")} rows={3}/>
                    </div>

                    <div className="mb-6">
                        <label className="mb-2">Montant</label>
                        <input {...register("amount")} type="number" step="0.01"/>
                    </div>

                    <div className="mb-6">
                        <label className="mb-2">Acompte</label>
                        <div className="flex gap-4">
                            <input {...register("deposit")} type="number" step="0.01"/>
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
                            <input {...register("remaining")} type="number" step="0.01"/>
                            <select {...register("remainingPaymentMethod")}>
                                <option value="Cash">Espèces</option>
                                <option value="Revolut">Revolut</option>
                                <option value="PayPal">PayPal</option>
                            </select>
                        </div>
                    </div>
                </div>
                <button type="submit" className="primary" disabled={isPending}>
                    <Save size={20}/> Enregistrer
                </button>
            </main>
        </form>
    );
}
