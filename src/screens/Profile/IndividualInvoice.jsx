
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/Buttons';
import Checkbox from '../../components/form/Checkbox';

import { Icon } from '@iconify/react';

export function IndividualInvoice() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onBlur',
    });

    const onSubmit = async (data) => {
        console.log(data);
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group has-floating-label mb-5">
                    <input type="text" {...register('idNumber', { required: true })} className={`input-control ${errors.idNumber && 'error'}`} placeholder="ID number" />
                    <label htmlFor="idNumber" className="label-control">ID number</label>

                    {errors.idNumber && <Icon icon="ant-design:info-circle-outlined" className="error-icon" />}
                    {errors.idNumber?.type === 'required' && (
                        <p className="error-message">Please enter VAT number.</p>
                    )}
                </div>

                <div className="input-group has-floating-label">
                    <input type="text" name="invoiceTitle" id="invoiceTitle" className="input-control" placeholder="Invoice Title" disabled={true} style={{ backgroundColor: 'var(--color-gray-light)' }} />
                    <label htmlFor="invoiceTitle" className="label-control">Invoice Title</label>
                </div>

                <div className="flex items-center my-6">
                    <Checkbox id="deliveryAsInvoice" />
                    <label htmlFor="deliveryAsInvoice" className="text-xs text-gray-storm ml-3">Use delivery address as invoice address.</label>
                </div>

                <div className="input-group has-floating-label mb-5">
                    <input type="text" name="invoiceAddress" id="invoiceAddress" className="input-control" placeholder="Invoice Address" disabled={true} style={{ backgroundColor: 'var(--color-gray-light)' }} />
                    <label htmlFor="invoiceAddress" className="label-control">Address</label>
                </div>

                <div className="flex gap-x-5">
                    <div className="input-group has-floating-label">
                        <input type="text" name="invoiceAddress" id="invoiceAddress" className="input-control" placeholder="Invoice Address" disabled={true} style={{ backgroundColor: 'var(--color-gray-light)' }} />
                        <label htmlFor="invoiceAddress" className="label-control">Province</label>
                    </div>

                    <div className="input-group has-floating-label">
                        <input type="text" name="invoiceAddress" id="invoiceAddress" className="input-control" placeholder="Invoice Address" disabled={true} style={{ backgroundColor: 'var(--color-gray-light)' }} />
                        <label htmlFor="invoiceAddress" className="label-control">District</label>
                    </div>
                </div>

                <div className="mt-6">
                    <Button kind="primary" size="small">Save</Button>
                </div>
            </form>
        </div>
    );
}
