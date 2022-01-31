import React from 'react';

import { useNavigate, useLocation } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLoginModal, toggleOtpModal } from '../app/appSlice';
import { otpCheck } from '../auth/authSlice';

import { Button } from '../components/Buttons';

import { Modal, ModalHeader, ModalBody, ModalFooter } from '../components/Modal';


import { Icon } from '@iconify/react';

function OtpModal() {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    let location = useLocation();

    const { register, handleSubmit, setError, formState: { errors }, setValue } = useForm();
    const [canApprove, setCanApprove] = React.useState(true);
    const [loading, setLoading] = React.useState(false);
    const { user } = useSelector(state => state.auth);

    const currentAddress = user?.addresses.find(address => address.active);

    const handleChange = (e) => {
        const regexp = /[^0-9]/;
        let code = e.target.value.replace(regexp, '');

        if (code.length < 4) {
            setValue('code', code, { shouldValidate: true });
        }

        if (code.length === 4) {
            setCanApprove(false);
        } else {
            setCanApprove(true);
        }
    }

    const onSubmit = async data => {
        setLoading(true);

        try {
            const response = await dispatch(
                otpCheck({
                    code: data.code,
                })
            ).unwrap();

            setLoading(false);

            if (response.success) {

                if (currentAddress) {
                    window.location.pathname = '/categories';
                } else {
                    dispatch(toggleOtpModal(false));
                    window.location.pathname = '/';
                }

            } else {

                setError('code', {
                    type: 'manual',
                    message: response.message,
                }, {
                    shouldFocus: true
                });
            }

        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div>
            <Modal center onClose={() => dispatch(toggleOtpModal(false))} className="otp-modal">
                <ModalHeader className="px-4 md:px-8 pt-6 pd:pt-8 pb-8" backBtn onBack={() => {
                    dispatch(toggleOtpModal(false));
                    dispatch(toggleLoginModal(true));
                }} closeBtn>
                    <h3>One-Time Password</h3>
                </ModalHeader>
                <ModalBody className="px-4 md:px-8 md:rounded-b-xl flex-1">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <p className="text-sm text-gray-storm text-center mb-8 tracking-normal px-4">
                            Please enter the code sent to you at {user.phone}
                        </p>
                        <div className="input-group">
                            <input type="text" {...register('code', {
                                onChange: handleChange,
                                minLength: 4,
                                required: true,
                            })}
                                className="input-control"
                                maxLength="4"
                            />

                            {errors.code?.type === 'manual' ? (
                                <p className="error-message">{`${errors.code.message}: Type 1234`}</p>
                            ) : null}
                        </div>

                        <div className="mt-10 m">
                            <Button size="medium" kind="primary" disabled={canApprove}>
                                {loading && (<Icon icon="ph:spinner-bold" className="text-sm text-primary-light animate-spin-slow mr-3" />)}
                                Approve and Login
                            </Button>
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter className="bg-gray-light border-0 md:rounded-b-xl md:mt-8">
                    <div className="py-4 flex justify-center items-center">
                        <span className="text-sm text-gray-storm mr-3">
                            Haven't received your code?
                        </span>
                        <button className="text-primary text-sm hover:underline">
                            Send password again
                        </button>
                    </div>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default OtpModal;
