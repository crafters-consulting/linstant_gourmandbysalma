import React, { useEffect } from "react"
import { useNavigate } from "react-router"
import { Save } from "lucide-react"
import { useForm } from "react-hook-form"
import { useDebounce } from 'use-debounce';
import { HeaderBar } from "../../components"
import { type Sale, useSaleUpsertMutation } from "../../hooks"

export const SaleForm: React.FC<{
    data: Partial<Sale>
    title: string
    backUrl: string
}> = ({ title, data, backUrl }) => {
    const navigate = useNavigate()
    const { register, watch, setValue, getValues, handleSubmit } = useForm<Sale>({
        defaultValues: data,
    })
    const [amount, deposit, remaining] = watch(["amount", "deposit", "remaining"])
    const [debouncedAmount] = useDebounce(amount, 500)
    const [debouncedDeposit] = useDebounce(deposit, 500)
    const [debouncedRemaining] = useDebounce(remaining, 500)
    const { mutate, isPending } = useSaleUpsertMutation({
        onSuccess: () => navigate("/sales"),
    })

    useEffect(() => {
        if (debouncedAmount !== undefined) {
            const remaining = Math.round((debouncedAmount * 0.7) / 10) * 10
            setValue("deposit", debouncedAmount - remaining)
        }
    }, [debouncedAmount, setValue])

    useEffect(() => {
        const amount = getValues("amount")
        if (amount !== undefined && debouncedDeposit !== undefined) {
            setValue("remaining", amount - debouncedDeposit)
        }
    }, [debouncedDeposit, setValue, getValues])

    useEffect(() => {
        const amount = getValues("amount")
        if (amount !== undefined && debouncedRemaining !== undefined) {
            setValue("deposit", amount - debouncedRemaining)
        }
    }, [debouncedRemaining, setValue, getValues])

    return (
        <form onSubmit={handleSubmit((it) => mutate(it))}>
            <HeaderBar
                title={title}
                backUrl={backUrl}
            />

            <main className="grid gap-4">
                <div className="card mb-6">
                    <div className="mb-6">
                        <label className="mb-2">Date de Livraison</label>
                        <input
                            type="datetime-local"
                            {...register("deliveryDateTime")}
                        />
                    </div>

                    <div className="mb-6">
                        <label className="mb-2">Client</label>
                        <input {...register("clientName")} />
                    </div>

                    <div className="mb-6">
                        <label className="mb-2">Adresse de Livraison</label>
                        <textarea
                            {...register("deliveryAddress")}
                            rows={2}
                        />
                    </div>

                    <div className="mb-6">
                        <label className="mb-2">Commentaire</label>
                        <textarea
                            {...register("description")}
                            rows={3}
                        />
                    </div>

                    <div className="mb-6">
                        <label className="mb-2">Montant</label>
                        <input
                            {...register("amount")}
                            type="number"
                            step="0.01"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="mb-2">Acompte</label>
                        <div className="flex gap-4">
                            <input
                                {...register("deposit")}
                                type="number"
                                step="0.01"
                            />
                            <select {...register("depositPaymentMethod")}>
                                <option value="Revolut">Revolut</option>
                                <option value="PayPal">PayPal</option>
                                <option value="Cash">Espèces</option>
                            </select>
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block font-medium mb-2">
                            Reste à Payer
                        </label>
                        <div className="flex gap-4">
                            <input
                                {...register("remaining")}
                                type="number"
                                step="0.01"
                            />
                            <select {...register("remainingPaymentMethod")}>
                                <option value="Cash">Espèces</option>
                                <option value="Revolut">Revolut</option>
                                <option value="PayPal">PayPal</option>
                            </select>
                        </div>
                    </div>
                </div>
                <button
                    type="submit"
                    className="primary"
                    disabled={isPending}>
                    <Save size={20} /> Enregistrer
                </button>
            </main>
        </form>
    )
}
