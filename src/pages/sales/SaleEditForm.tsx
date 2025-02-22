import { useParams } from 'react-router'
import { useSaleByIdQuery } from '../../hooks'
import { SaleForm } from './SaleForm.tsx'


export const SaleEditForm = () => {
    const { id } = useParams()
    const { data, isLoading } = useSaleByIdQuery(id!)

    return isLoading || !data ? (
        'Chargement...'
    ) : (
        <SaleForm
            title="Modification de Vente"
            data={data}
            backUrl={`/sales/${data.id}`}
        />
    )
}