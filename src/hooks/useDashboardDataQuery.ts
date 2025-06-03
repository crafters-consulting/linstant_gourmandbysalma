import { useSaleListQuery } from "./useSaleListQuery.ts"
import { useMemo } from "react"
import { format, isAfter, subMonths, startOfMonth } from "date-fns"
import { fr } from "date-fns/locale"
import { usePurchaseListQuery } from "./usePurchaseListQuery.ts"
import { Purchase, Sale } from "./index.ts"

export type DashboardData = {
    date: string
    saleAmount: number
    deposit: number
    purchase: number
}

const saleToDashboardData = (it: Sale) =>
    ({
        date: it.deliveryDateTime,
        saleAmount: it.amount,
        deposit: it.deposit,
        purchase: 0,
    }) as DashboardData

const purchaseToDashboardData = (it: Purchase) =>
    ({
        date: it.date,
        saleAmount: 0,
        deposit: 0,
        purchase: it.amount,
    }) as DashboardData

function joinSalesAndPurchase(
    saleData: Sale[] | null | undefined,
    purchaseData: Purchase[] | null | undefined
) {
    return [
        ...(saleData || []).map(saleToDashboardData),
        ...(purchaseData || []).map(purchaseToDashboardData),
    ]
}

export function useDashboardDataQuery() {
    const { data: saleData, isLoading: isLoadingSales } = useSaleListQuery()
    const { data: purchaseData, isLoading: isLoadingPurchase } = usePurchaseListQuery()
    const chartStart = startOfMonth(subMonths(new Date(), 3))

    const data = useMemo(() => {
        const results = Object.values(
            joinSalesAndPurchase(saleData, purchaseData)
                .filter(({date}) => isAfter(date, chartStart))
                .sort((a, b) =>
                    a.date
                        .substring(0, 10)
                        .localeCompare(b.date.substring(0, 10))
                )
                .map((it) => ({
                    ...it,
                    date: format(it.date, "MMM", { locale: fr }),
                }))
                .reduce<Record<string, DashboardData>>(
                    (acc, it) => ({
                        ...acc,
                        [it.date]: {
                            date: it.date,
                            saleAmount:
                                (acc && acc[it.date]
                                    ? acc[it.date].saleAmount
                                    : 0) + it.saleAmount,
                            deposit:
                                (acc && acc[it.date]
                                    ? acc[it.date].deposit
                                    : 0) + it.deposit,
                            purchase:
                                (acc && acc[it.date]
                                    ? acc[it.date].purchase
                                    : 0) + it.purchase,
                        },
                    }),
                    {} as Record<string, DashboardData>
                )
        )

        const currentMonth = format(new Date(), "MMM", { locale: fr })

        return {
            currentMonth: results.find((it) => it.date === currentMonth) || {},
            lastMonths: results,
        }
    }, [saleData, purchaseData, chartStart])

    return {
        isLoading: isLoadingSales && isLoadingPurchase,
        data,
    }
}
