import { ArrowLeft, Save } from "lucide-react"
import type React from "react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router"
import { useDebounce } from "use-debounce"
import { HeaderBar } from "../../components"
import { type Sale, useSaleUpsertMutation } from "../../hooks"

const isValidAmount = (amount: string | number) => {
    return (
        amount !== "" &&
        !Number.isNaN(parseFloat(amount as string)) &&
        Number.isFinite(amount as number)
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
            <HeaderBar title={title} />

            <main>
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body gap-6">
                        <fieldset className="fieldset">
                            <label
                                className="fieldset-legend"
                                htmlFor="deliveryDateTime"
                            >
                                Date de Livraison
                            </label>
                            <input
                                type="datetime-local"
                                {...register("deliveryDateTime")}
                                className="input w-full"
                            />
                        </fieldset>

                        <fieldset className="fieldset">
                            <label
                                className="fieldset-legend"
                                htmlFor="clientName"
                            >
                                Client
                            </label>
                            <input
                                {...register("clientName")}
                                className="input w-full"
                            />
                        </fieldset>

                        <fieldset className="fieldset">
                            <label
                                className="fieldset-legend"
                                htmlFor="deliveryAddress"
                            >
                                Adresse de Livraison
                            </label>
                            <textarea
                                {...register("deliveryAddress")}
                                rows={2}
                                className="textarea w-full"
                            />
                        </fieldset>

                        <fieldset className="fieldset">
                            <label
                                className="fieldset-legend"
                                htmlFor="description"
                            >
                                Commentaire
                            </label>
                            <textarea
                                {...register("description")}
                                rows={3}
                                className="textarea w-full"
                            />
                        </fieldset>

                        <fieldset className="fieldset">
                            <label className="fieldset-legend" htmlFor="amount">
                                Montant
                            </label>
                            <input
                                {...register("amount")}
                                type="number"
                                step="0.01"
                                className="input w-full"
                            />
                        </fieldset>

                        <fieldset className="fieldset">
                            <label
                                className="fieldset-legend"
                                htmlFor="deposit"
                            >
                                Acompte
                            </label>
                            <div className="grid grid-cols-3 gap-4">
                                <input
                                    {...register("deposit")}
                                    type="number"
                                    step="0.01"
                                    className="input col-span-2"
                                />
                                <select
                                    {...register("depositPaymentMethod")}
                                    className="select"
                                >
                                    <option value="Revolut">Revolut</option>
                                    <option value="PayPal">PayPal</option>
                                    <option value="Cash">Espèces</option>
                                </select>
                            </div>
                        </fieldset>

                        <fieldset className="fieldset">
                            <label
                                className="fieldset-legend"
                                htmlFor="remaining"
                            >
                                Reste à Payer
                            </label>
                            <div className="grid grid-cols-3 gap-4">
                                <input
                                    {...register("remaining")}
                                    type="number"
                                    readOnly
                                    className="input col-span-2"
                                />
                                <select
                                    {...register("remainingPaymentMethod")}
                                    className="select"
                                >
                                    <option value="Cash">Espèces</option>
                                    <option value="Revolut">Revolut</option>
                                    <option value="PayPal">PayPal</option>
                                </select>
                            </div>
                        </fieldset>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <Link to={backUrl} className="btn py-10">
                        <ArrowLeft size={30} />
                    </Link>
                    <button
                        type="submit"
                        className="btn btn-primary gap-2 py-10"
                        disabled={isPending}
                    >
                        {isPending && (
                            <span className="loading loading-spinner" />
                        )}
                        <Save size={30} />
                    </button>
                </div>
            </main>
        </form>
    )
}
