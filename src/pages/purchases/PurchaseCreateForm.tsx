import { format } from "date-fns"
import { Save } from "lucide-react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { HeaderBar } from "../../components"
import {
    type Purchase,
    usePurchaseInsertMutation,
    useSalePendingQuery,
} from "../../hooks"

export function PurchaseCreateForm() {
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm<
        Purchase & { affectedSales: string[] }
    >()
    const { data, isLoading } = useSalePendingQuery()
    const { mutate, isPending } = usePurchaseInsertMutation({
        onSuccess: () => navigate("/purchases"),
    })

    return (
        <form onSubmit={handleSubmit((it) => mutate(it))}>
            <HeaderBar title="Nouvel Achat" backUrl="/purchases" />

            <main className="grid gap-10">
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body gap-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">
                                    Date d'achat
                                </span>
                            </label>
                            <input
                                type="date"
                                {...register("date")}
                                className="input input-bordered"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">
                                    Montant
                                </span>
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                {...register("amount")}
                                className="input input-bordered"
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
                                    Ventes Concernées
                                </span>
                            </label>
                            <div className="border border-base-300 rounded-lg p-4 space-y-2">
                                {isLoading || !data
                                    ? "Chargement..."
                                    : data.map((it) => (
                                          <label
                                              key={it.id}
                                              className="flex items-center gap-3 cursor-pointer hover:bg-base-200 p-2 rounded"
                                          >
                                              <input
                                                  type="checkbox"
                                                  {...register("affectedSales")}
                                                  value={it.id}
                                                  className="checkbox checkbox-primary"
                                              />
                                              <span className="flex-1">
                                                  {format(
                                                      it.deliveryDateTime,
                                                      "dd/MM/yyyy"
                                                  )}{" "}
                                                  - {it.clientName}
                                              </span>
                                          </label>
                                      ))}
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
