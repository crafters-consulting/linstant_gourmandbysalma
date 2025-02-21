import type { Database } from './database.types'

export type Purchase = Database['public']['Tables']['purchases']['Row']
export type Sale = Database['public']['Tables']['sales']['Row']

// Authentication
export { useSupabaseSession } from './useSupabaseSession'
export { useSignInMutation } from './useSignInMutation'

// Dashboard
export { useDashboardDataQuery } from './useDashboardDataQuery'

// Sales
export { useSaleListQuery } from './useSaleListQuery'
export { useSalePendingQuery } from './useSalePendingQuery'
export { useSaleByIdQuery } from './useSaleByIdQuery'
export { useSaleUpsertMutation } from './useSaleUpsertMutation'

// Purchases
export { usePurchaseListQuery } from './usePurchaseListQuery'
export { usePurchaseByIdQuery } from './usePurchaseByIdQuery'
export { usePurchaseSalesByPurchaseIdQuery } from './usePurchaseSalesByPurchaseIdQuery'
export { usePurchaseInsertMutation } from './usePurchaseInsertMutation'

// Taxes
export { useReportTaxesQuery } from './useReportTaxesQuery'
