import React from 'react';
import { Link } from 'react-router-dom';

import { Icon } from '@iconify/react';
import { Button } from '../../components/Buttons';
import { useForm } from 'react-hook-form';

function ChangePassword() {
    const { register, handleSubmit, formState: { errors }, getValues } = useForm({
        mode: 'onBlur',
    });

    const onSubmit = async data => {
        console.log(data);
    }

    return (
        <>
            <Link to="/profile" reloadDocument className="go-back flex md:hidden items-center p-4 md:p-0 bg-white md:bg-gray-background mt-8 md:mt-0 mb-4">
                <button className="flex items-center justify-center w-6 h-6 border-0 rounded-lg bg-primary-light md:bg-gray-background mr-3 md:mr-2">
                    <Icon icon="akar-icons:chevron-left" className="text-primary" style={{ fontSize: '12px' }} />
                </button>
                <p className="text-primary font-semibold" style={{ fontSize: '13px' }}>Return to Profile</p>
            </Link>

            <h3 className="text-sm text-black font-semibold hidden md:block mb-4">Change Password</h3>

            <div className="bg-white md:border-0 md:rounded-xl">
                <div className="p-6 md:pt-8">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="input-group has-floating-label">
                            <input type="text" {...register('prevPass', { required: true })} className={`input-control ${errors.prevPass && 'error'}`} placeholder="Previous" />
                            <label htmlFor="oldPass" className="label-control">Previous Password</label>

                            {errors.prevPass && <Icon icon="ant-design:info-circle-outlined" className="error-icon" />}
                            {errors.prevPass?.type === 'required' && (
                                <p className="error-message">Please enter previous password.</p>
                            )}
                        </div>

                        <div className="hr hidden h-px bg-primary-light w-full md:block mt-4 mb-6"></div>

                        <div className="input-group has-floating-label mt-5">
                            <input type="text" {...register('newPass1', { required: true, minLength: 7 })} className={`input-control ${errors.newPass1 && 'error'}`} placeholder="New Password" />
                            <label htmlFor="newPass1" className="label-control">New Password (min 7 characters)</label>

                            {errors.newPass1 && <Icon icon="ant-design:info-circle-outlined" className="error-icon" />}
                            {errors.newPass1?.type === 'required' && (
                                <p className="error-message">Please enter new password.</p>
                            )}
                            {errors.newPass1?.type === 'minLength' && (
                                <p className="error-message">Please enter min 7 characters.</p>
                            )}
                        </div>
                        <div className="input-group has-floating-label mt-5">
                            <input type="text" {...register('newPass2', {
                                required: true,
                                validate: pass => {
                                    return pass === getValues('newPass1')
                                }
                            })}
                                className={`input-control ${getValues('newPass1') && errors.newPass2 && 'error'}`} placeholder="Enter new password again" />
                            <label htmlFor="newPass2" className="label-control">Enter new password again</label>

                            {getValues('newPass1') && errors.newPass2 && <Icon icon="ant-design:info-circle-outlined" className="error-icon" />}
                            {getValues('newPass1') && errors.newPass2?.type === 'required' && (
                                <p className="error-message">Please repeat new password.</p>
                            )}
                            {errors.newPass2?.type === 'validate' && (
                                <p className="error-message">Please repeat new password correctly.</p>
                            )}
                        </div>

                        <div className="mt-6 md:mt-8">
                            <Button kind="primary" size="medium">Save</Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ChangePassword;
