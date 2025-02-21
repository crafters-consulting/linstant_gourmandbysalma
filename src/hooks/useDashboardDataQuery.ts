import {useSaleListQuery} from "./useSaleListQuery.ts";
import {useMemo} from "react";
import {format} from "date-fns";
import {fr} from "date-fns/locale";
import {usePurchaseListQuery} from "./usePurchaseListQuery.ts";
import {Purchase, Sale} from "./index.ts";

type DashboardData = {
    date: string;
    saleAmount: number;
    deposit: number;
    purchase: number;
}

const saleToDashboardData = (it: Sale) => ({
    date: it.deliveryDateTime,
    saleAmount: it.amount,
    deposit: it.deposit,
    purchase: 0
}) as DashboardData

const purchaseToDashboardData = (it: Purchase) => ({
    date: it.date,
    saleAmount: 0,
    deposit: 0,
    purchase: it.amount,
}) as DashboardData

function joinSalesAndPurchase(saleData: Sale[] | null | undefined, purchaseData: Purchase[] | null | undefined) {
    return [
        ...(saleData || []).map(saleToDashboardData),
        ...(purchaseData || []).map(purchaseToDashboardData)
    ]
}

export function useDashboardDataQuery() {
    const {data: saleData, isLoading: isLoadingSales} = useSaleListQuery()
    const {data: purchaseData, isLoading: isLoadingPurchase} = usePurchaseListQuery()

    const data = useMemo(() => {

        const results = Object.values(
            joinSalesAndPurchase(saleData, purchaseData)
                .sort((a, b) => a.date.substring(0, 10).localeCompare(b.date.substring(0, 10)))
                .map(it => ({
                    ...it,
                    date: format(it.date, 'MMMM yyyy', {locale: fr}),
                }))
                .reduce<Record<string, DashboardData>>((acc, it) => ({
                        ...acc,
                        [it.date]: {
                            date: it.date,
                            saleAmount: (acc && acc[it.date] ? acc[it.date].saleAmount : 0) + it.saleAmount,
                            deposit: (acc && acc[it.date] ? acc[it.date].deposit : 0) + it.deposit,
                            purchase: (acc && acc[it.date] ? acc[it.date].purchase : 0) + it.purchase
                        }
                    }),
                    {} as Record<string, DashboardData>
                )
        )

        return {
            labels: results.map(it => it.date),
            datasets: [
                {
                    label: 'Ventes',
                    data: results.map(it => it.saleAmount),
                    borderColor: 'rgb(255, 99, 132)',
                },
                {
                    label: 'Acompte',
                    data: results.map(it => it.deposit),
                    borderColor: 'rgb(53, 162, 235)',
                },
                {
                    label: 'Dépenses',
                    data: results.map(it => it.purchase),
                    borderColor: 'rgb(53, 235, 162)',
                },
            ],
        }
    }, [saleData, purchaseData])

    return {
        isLoading: isLoadingSales && isLoadingPurchase,
        data
    }
}