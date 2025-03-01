import { Link } from "react-router"
import { HeaderBar } from "../../components"
import { usePurchaseListQuery } from "../../hooks"
import { format } from "date-fns"

export function PurchaseList() {
    const { data, isLoading } = usePurchaseListQuery()

    return (
        <>
            <HeaderBar
                title="Achats"
                createUrl="/purchases/new"
            />
            <main className="grid gap-4">
                {isLoading || !data
                    ? "Chargement..."
                    : data.map((it) => (
                          <Link
                              key={it.id}
                              to={`/purchases/${it.id}`}
                              className="card">
                              <div className="flex items-center justify-between">
                                  <h2 className="text-lg font-medium">
                                      {format(it.date, "dd/MM/yyyy")}
                                  </h2>
                                  <p className="text-lg font-bold">
                                      {it.amount.toLocaleString("fr-FR", {
                                          style: "currency",
                                          currency: "EUR",
                                      })}
                                  </p>
                              </div>
                              <p className="text-slate-500">{it.description}</p>
                          </Link>
                      ))}
            </main>
        </>
    )
}
