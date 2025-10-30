import { ArrowLeft, Save } from "lucide-react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router"
import { HeaderBar } from "../../components"
import { type Purchase, usePurchaseInsertMutation } from "../../hooks"

export function PurchaseCreateForm() {
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm<Purchase>()
    const { mutate, isPending } = usePurchaseInsertMutation({
        onSuccess: () => navigate("/purchases"),
    })

    return (
        <form onSubmit={handleSubmit((it) => mutate(it))}>
            <HeaderBar title="Nouvel Achat" />

            <main>
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body gap-6">
                        <fieldset className="fieldset">
                            <label
                                className="fieldset-legend"
                                htmlFor="supplierName"
                            >
                                Date d'achat
                            </label>
                            <input
                                type="date"
                                {...register("date")}
                                className="input w-full"
                            />
                        </fieldset>
                        <fieldset className="fieldset">
                            <label className="fieldset-legend" htmlFor="amount">
                                Montant
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                {...register("amount")}
                                className="input w-full"
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
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <Link to="/purchases" className="btn py-10">
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
