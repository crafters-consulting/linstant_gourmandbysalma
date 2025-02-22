import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { Save } from 'lucide-react'
import { format } from 'date-fns'
import { HeaderBar } from '../../components'
import {
    type Purchase,
    useSalePendingQuery,
    usePurchaseInsertMutation,
} from '../../hooks'

export function PurchaseCreateForm() {
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm<
        Purchase & { affectedSales: string[] }
    >()
    const { data, isLoading } = useSalePendingQuery()
    const { mutate, isPending } = usePurchaseInsertMutation({
        onSuccess: () => navigate('/purchases'),
    })

    return (
        <form onSubmit={handleSubmit((it) => mutate(it))}>
            <HeaderBar
                title='Nouvel Achat'
                backUrl='/purchases'
            />

            <main className='grid gap-10'>
                <div className='card'>
                    <div className='mb-6'>
                        <label>Date d'achat</label>
                        <input
                            type='date'
                            {...register('date')}
                        />
                    </div>
                    <div className='mb-6'>
                        <label>Montant</label>
                        <input
                            type='number'
                            step='0.01'
                            {...register('amount')}
                        />
                    </div>
                    <div className='mb-6'>
                        <label>Commentaire</label>
                        <textarea
                            {...register('description')}
                            rows={3}
                        />
                    </div>
                    <div className='mb-6'>
                        <label>Ventes Concernées</label>
                        <div className='border border-gray-300 rounded-sm px-3 py-2 w-full text-base'>
                            {isLoading || !data
                                ? 'Chargement...'
                                : data.map((it) => (
                                      <label
                                          key={it.id}
                                          className='!flex items-center'
                                      >
                                          <input
                                              className='!w-8'
                                              type='checkbox'
                                              {...register('affectedSales')}
                                              value={it.id}
                                          />
                                          <span className='grow'>
                                              {format(
                                                  it.deliveryDateTime,
                                                  'dd/MM/yyyy'
                                              )}{' '}
                                              - {it.clientName}
                                          </span>
                                      </label>
                                  ))}
                        </div>
                    </div>
                </div>
                <button
                    type='submit'
                    className='primary'
                    disabled={isPending}
                >
                    <Save size={20} /> Enregistrer
                </button>
            </main>
        </form>
    )
}
