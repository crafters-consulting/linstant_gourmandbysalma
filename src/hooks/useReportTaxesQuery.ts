import { useSaleListQuery } from "./useSaleListQuery.ts"
import { useMemo } from "react"
import { Sale } from "./index.ts"

type ReportTaxe = {
    date: string
    dateMonth: string
    amount: number
}

function getReportTaxes(data: Sale[]) {
    return Object.values(
        data
            .map(
                (it) =>
                    ({
                        date: it.deliveryDateTime,
                        dateMonth: it.deliveryDateTime.substring(0, 7),
                        amount:
                            (it.depositPaymentMethod === "Cash"
                                ? 0
                                : it.deposit) +
                            (it.remainingPaymentMethod === "Cash"
                                ? 0
                                : it.remaining),
                    }) as ReportTaxe
            )
            .filter((it) => it.amount > 0)
            .reduce<Record<string, ReportTaxe>>(
                (acc, it) => ({
                    ...acc,
                    [it.dateMonth]: {
                        ...it,
                        amount: (acc[it.dateMonth]?.amount || 0) + it.amount,
                    },
                }),
                {}
            )
    )
}

export function useReportTaxesQuery() {
    const { data, isLoading } = useSaleListQuery()
    const reportTaxes = useMemo(
        () => (!data ? [] : getReportTaxes(data)),
        [data]
    )

    return {
        isLoading,
        data: reportTaxes,
    }
}
