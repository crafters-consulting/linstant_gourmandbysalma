import { Save } from "lucide-react"
import type React from "react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { useDebounce } from "use-debounce"
import { HeaderBar } from "../../components"
import { type Sale, useSaleUpsertMutation } from "../../hooks"

const isValidAmount = (amount: string | number) => {
    return (
        amount !== "" &&
        !isNaN(parseFloat(amount as string)) &&
        isFinite(amount as number)
    )
}

export const SaleForm: React.FC<{
    data: Partial<Sale>
    title: string
    backUrl: string
}> = ({ title, data, backUrl }) => {
    const navigate = useNavigate()
    const { register, watch, setValue, getValues, handleSubmit } =
        useForm<Sale>({
            defaultValues: data,
        })
    const [amount, deposit] = watch(["amount", "deposit"])
    const [debouncedAmount] = useDebounce(amount, 500)
    const [debouncedDeposit] = useDebounce(deposit, 500)
    const { mutate, isPending } = useSaleUpsertMutation({
        onSuccess: () => navigate("/sales"),
    })

    useEffect(() => {
        if (isValidAmount(debouncedAmount)) {
            const remaining = Math.ceil((debouncedAmount * 0.7) / 10) * 10
            setValue("deposit", debouncedAmount - remaining)
            setValue("remaining", remaining)
        }
    }, [debouncedAmount, setValue])

    useEffect(() => {
        const amount = getValues("amount")
        if (isValidAmount(amount) && isValidAmount(debouncedDeposit)) {
            setValue("remaining", amount - debouncedDeposit)
        }
    }, [debouncedDeposit, setValue, getValues])

    return (
        <form onSubmit={handleSubmit((it) => mutate(it))}>
            <HeaderBar title={title} backUrl={backUrl} />

            <main className="grid gap-4">
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body gap-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">
                                    Date de Livraison
                                </span>
                            </label>
                            <input
                                type="datetime-local"
                                {...register("deliveryDateTime")}
                                className="input input-bordered"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">
                                    Client
                                </span>
                            </label>
                            <input
                                {...register("clientName")}
                                className="input input-bordered"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">
                                    Adresse de Livraison
                                </span>
                            </label>
                            <textarea
                                {...register("deliveryAddress")}
                                rows={2}
                                className="textarea textarea-bordered"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">
                                    Commentaire
                                </span>
                            </label>
                            <textarea
                                {...register("description")}
                                rows={3}
                                className="textarea textarea-bordered"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">
                                    Montant
                                </span>
                            </label>
                            <input
                                {...register("amount")}
                                type="number"
                                step="0.01"
                                className="input input-bordered"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">
                                    Acompte
                                </span>
                            </label>
                            <div className="flex gap-4">
                                <input
                                    {...register("deposit")}
                                    type="number"
                                    step="0.01"
                                    className="input input-bordered flex-1"
                                />
                                <select
                                    {...register("depositPaymentMethod")}
                                    className="select select-bordered"
                                >
                                    <option value="Revolut">Revolut</option>
                                    <option value="PayPal">PayPal</option>
                                    <option value="Cash">Espèces</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">
                                    Reste à Payer
                                </span>
                            </label>
                            <div className="flex gap-4">
                                <input
                                    {...register("remaining")}
                                    type="number"
                                    readOnly
                                    className="input input-bordered flex-1"
                                />
                                <select
                                    {...register("remainingPaymentMethod")}
                                    className="select select-bordered"
                                >
                                    <option value="Cash">Espèces</option>
                                    <option value="Revolut">Revolut</option>
                                    <option value="PayPal">PayPal</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    type="submit"
                    className="btn btn-primary btn-lg gap-2"
                    disabled={isPending}
                >
                    {isPending && <span className="loading loading-spinner" />}
                    <Save size={20} /> Enregistrer
                </button>
            </main>
        </form>
    )
}
