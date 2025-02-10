import React, {useState} from 'react';
import {useParams, useNavigate, Link} from 'react-router-dom';
import {Save, ArrowLeft} from 'lucide-react';
import {useForm, SubmitHandler} from "react-hook-form"
import {PageHeader} from "../../components";

export function SaleForm() {
    const {id} = useParams();
    const {register} = useForm();
    const navigate = useNavigate();
    const isEditing = Boolean(id);

    // Mock data for editing - replace with actual data fetching
    const initialData = isEditing ? {
        clientName: 'Acme Corp',
        deliveryAddress: '123 Business Ave, Suite 100, New York, NY 10001',
        deliveryDateTime: '2024-03-15T14:00',
        amount: 5000,
        deposit: 1500,
        balanceDue: 3500,
        status: 'Pending',
        paymentMethod: 'Bank Transfer'
    } : {
        clientName: '',
        deliveryAddress: '',
        deliveryDateTime: '',
        amount: '',
        deposit: '',
        balanceDue: '',
        status: 'Pending',
        paymentMethod: ''
    };

    const [formData, setFormData] = useState(initialData);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Form submitted:', formData);
        navigate('/');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData(prev => {
            const newData = {...prev, [name]: value};

            // Automatically calculate balance due when amount or deposit changes
            if (name === 'amount' || name === 'deposit') {
                const amount = parseFloat(newData.amount) || 0;
                const deposit = parseFloat(newData.deposit) || 0;
                newData.balanceDue = (amount - deposit).toString();
            }

            return newData;
        });
    };

    return (
        <div>
            <PageHeader title={isEditing ? 'Edit Sale' : 'Nouvelle Vente'}/>
            <form>
                <div className="bg-white p-6 mb-6 rounded-lg shadow-md grid gap-4">
                    <div className="mb-6">
                        <label className="block font-medium mb-2">Date de Livraison</label>
                        <input type="datetime-local"  {...register("deliveryDateTime")}
                               className="border border-gray-300 rounded-sm px-2 py-1 w-full"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block font-medium mb-2">Client</label>
                        <input {...register("clientName")}
                               className="border border-gray-300 rounded-sm px-2 py-1 w-full"/>
                    </div>

                    <div className="mb-6">
                        <label className="block font-medium mb-2">Adresse de Livraison</label>
                        <textarea {...register("deliveryAddress")}
                                  className="border border-gray-300 rounded-sm px-2 py-1 w-full"
                                  rows={3}
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block font-medium mb-2">Montant</label>
                        <input {...register("amount")} type="number"
                               className="border border-gray-300 rounded-sm px-2 py-1 w-full"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block font-medium mb-2">Acompte</label>
                        <div className="flex gap-4">
                            <input {...register("deposit")} type="number"
                                   className="border border-gray-300 rounded-sm px-2 py-1 w-full"
                            />
                            <select {...register("depositPaymentMethod")}
                                    className="border border-gray-300 rounded-sm px-2 py-1 w-full">
                                <option value="Revolut">Revolut</option>
                                <option value="PayPal">PayPal</option>
                                <option value="Cash">Espèces</option>
                            </select>
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block font-medium mb-2">Reste à Payer</label>
                        <div className="flex gap-4">
                            <input {...register("balanceDue")} type="number"
                                   className="border border-gray-300 rounded-sm px-2 py-1 w-full"
                                   readOnly
                                   disabled
                            />
                            <select {...register("balanceDuePaymentMethod")}
                                    className="border border-gray-300 rounded-sm px-2 py-1 w-full">
                                <option value="Cash">Espèces</option>
                                <option value="Revolut">Revolut</option>
                                <option value="PayPal">PayPal</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="flex gap-2 items-center rounded-sm bg-purple-800 text-white px-4 py-2 nowrap">
                        <Save size={20}/> Enregistrer
                    </button>
                </div>
            </form>
        </div>
    );
}
