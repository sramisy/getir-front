import React from 'react';

import { Icon } from '@iconify/react';

import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '../../components/Buttons';
import { toggleEditProfileInfoModal } from '../../app/appSlice';
import { updateProfile } from '../../auth/authSlice';

function EditProfileInfo() {

    const { user: { fullName, email, dialCode, phone } } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [loading, setLoading] = React.useState(false);

    const { register, handleSubmit, formState: { errors, isDirty } } = useForm({
        defaultValues: {
            fullName,
            email,
        }
    });

    const onSubmit = async (data) => {
        setLoading(true);

        try {
            const response = await dispatch(
                updateProfile(data)
            ).unwrap();

            if (response.success) {
                setLoading(false);
                dispatch(toggleEditProfileInfoModal(false));
            }

        } catch (err) {
            console.log(err);
        }

    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group">
                    <input type="text" {...register('fullName', {
                        required: true, validate: value => {
                            const [firstName, lastName] = value.split(' ');

                            return !!(firstName && lastName);
                        }
                    })}
                        autoComplete="off" className="input-control text-black" placeholder="Name Surname" defaultValue={fullName} />
                    {/* <label htmlFor="fullName" class="label-control">Name Surname</label> */}
                    {errors.fullName?.type === 'required' && (
                        <p className="error-message">Enter Name Surname</p>
                    )}
                    {errors.fullName?.type === "validate" && (
                        <p className="error-message">Enter correct Name Surname</p>
                    )}
                </div>

                <div className="input-group has-floating-label mt-5">
                    <input type="email" {...register('email', { required: true })}
                        autoComplete="off" className="input-control text-black" placeholder="Email Address" defaultValue={email} />
                    {/* <label htmlFor="email" class="label-control">Email Address</label> */}
                    {errors.email?.type === 'required' && (
                        <p className="error-message">Enter Email</p>
                    )}
                </div>

                <div className="input-group has-floating-label mt-5 group">
                    <input type="tel" name="phoneNumber" id="phoneNumber" className="input-control text-gray-storm group-hover:border-input-border" disabled={true} placeholder="Phone Number" defaultValue={`+${dialCode}${phone}`} style={{ backgroundColor: 'var(--color-gray-light)' }} />
                    {/* <label htmlFor="phoneNumber" class="label-control">Phone Number</label> */}
                </div>

                <div className="mt-6">
                    <Button size="medium" kind="primary" disabled={!isDirty}>
                        {loading && (
                            <Icon icon="ph:spinner-bold" className="text-sm text-white animate-spin-slow mr-2" />
                        )}
                        Save
                    </Button>
                </div>
            </form>
        </div>

    );
}

export default EditProfileInfo;
