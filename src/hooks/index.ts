import type { Database, TablesInsert } from "./database.types"

export type Purchase = Database["public"]["Tables"]["purchases"]["Row"]
export type Sale = Database["public"]["Tables"]["sales"]["Row"]

export type { TablesInsert }

// Dashboard
export { usePurchaseByIdQuery } from "./usePurchaseByIdQuery"
export { usePurchaseInsertMutation } from "./usePurchaseInsertMutation"
// Purchases
export { usePurchaseListQuery } from "./usePurchaseListQuery"
export { usePurchaseSalesByPurchaseIdQuery } from "./usePurchaseSalesByPurchaseIdQuery"
// Taxes
export { useReportTaxesQuery } from "./useReportTaxesQuery"
export { useSaleByIdQuery } from "./useSaleByIdQuery"
// Sales
export { useSaleListQuery } from "./useSaleListQuery"
export { useSalePendingQuery } from "./useSalePendingQuery"
export { useSaleUpsertMutation } from "./useSaleUpsertMutation"
export { useSignInMutation } from "./useSignInMutation"
// Authentication
export { useSupabaseSession } from "./useSupabaseSession"
