import React from 'react';
import { useForm } from 'react-hook-form';

import { Button } from './Buttons';

function AddPromoCode() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group">
                    <input type="text" {...register('promoCode', { required: true })} className="input-control" placeholder="Enter Promo code" />
                    {errors.promoCode?.type === 'required' && <p className="error-message">Promo code is required</p>}
                </div>

                <div className="mt-8 mb-4 md:mb-8">
                    <Button kind="primary" size="medium">Add</Button>
                </div>
            </form>
        </div>
    );
}

export default AddPromoCode;
