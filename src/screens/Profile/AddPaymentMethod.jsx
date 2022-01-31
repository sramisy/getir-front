import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { Icon } from '@iconify/react';

import visaLogo from '../../assets/images/visa.svg';
import masterpass from '../../assets/images/masterpass.svg'
import securityLogo from '../../assets/images/security.svg';
import americanExpress from '../../assets/images/american-express.svg';
import masterCard from '../../assets/images/master.svg';
import troy from '../../assets/images/troy.svg';
import Checkbox from '../../components/form/Checkbox';
import { Button } from '../../components/Buttons';


function AddPaymentMethod() {

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onBlur',
    });

    const onSubmit = async data => {
        console.log(data);
    }

    return (
        <div>
            <Link to="/profile/payment-methods" className="go-back flex items-center p-4 md:p-0 bg-white md:bg-gray-background mt-8 md:mt-0 mb-4 md:mb-6">
                <button className="flex items-center justify-center w-6 h-6 border-0 rounded-lg bg-primary-light md:bg-gray-background mr-3 md:mr-2">
                    <Icon icon="akar-icons:chevron-left" className="text-primary" style={{ fontSize: '12px' }} />
                </button>
                <p className="text-primary font-semibold" style={{ fontSize: '13px' }}>Return to Payment Methods</p>
            </Link>

            <h3 className="text-sm text-black font-semibold hidden md:block mb-4">Add Card</h3>

            <div className="bg-white md:border-0 md:rounded-xl">
                <div className="p-8 md:pt-9">
                    <div className="flex items-center">
                        <div className="border-0 rounded-lg w-20 h-20 flex flex-none items-center justify-center" style={{ boxShadow: 'var(--shadow-s) var(--shadow-color-primary)' }}>
                            <figure>
                                <img src={securityLogo} alt="Security Logo" className="" />
                            </figure>
                        </div>

                        <div className="ml-6">
                            <h4 className="text-sm text-black font-semibold">Security</h4>
                            <p className="text-xs text-gray-storm mt-3">Your credit card security is provided by MasterPass, a MasterCard service.</p>
                        </div>
                    </div>

                    <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
                        <div className="input-group has-floating-label mb-5">
                            <input type="text" {...register("nameOnCard", { required: true })} className={`input-control ${errors.nameOnCard && 'error'}`} placeholder="Name card (personal, work, etc.)" />
                            <label htmlFor="nameOnCard" className="label-control">Name card (personal, work, etc.)</label>

                            {errors.nameOnCard && <Icon icon="ant-design:info-circle-outlined" className="error-icon" />}
                            {errors.nameOnCard?.type === 'required' && (
                                <p className="error-message">Please fill in the card name.</p>
                            )}
                        </div>

                        <div className="input-group has-floating-label">
                            <input type="text" {...register("cardNumber", { required: true })} className={`input-control ${errors.cardNumber && 'error'}`} placeholder="Card Number" />
                            <label htmlFor="cardNumber" className="label-control">Card Number</label>

                            {errors.cardNumber && <Icon icon="ant-design:info-circle-outlined" className="error-icon" />}
                            {errors.cardNumber?.type === 'required' && (
                                <p className="error-message">Please fill in the card number.</p>
                            )}
                        </div>

                        <p className="text-sm text-gray-storm mt-6 mb-2">Expiration Date:</p>

                        <div className="flex gap-x-5">
                            <div className="custom-select">
                                <select {...register("month", { required: true })} className="py-4 px-3 border-2 border-input-border rounded-md text-sm text-gray-storm focus:outline-none focus:border-primary">
                                    <option defaultValue="">Month</option>
                                    <option value="1">01</option>
                                    <option value="2">02</option>
                                    <option value="3">03</option>
                                    <option value="4">04</option>
                                    <option value="5">05</option>
                                    <option value="6">06</option>
                                    <option value="7">07</option>
                                    <option value="8">08</option>
                                    <option value="9">09</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                </select>
                                <Icon icon="akar-icons:chevron-down" className="text-primary absolute top-5 right-3" style={{ fontSize: '16px', pointerEvents: 'none' }} />
                            </div>
                            <div className="custom-select">
                                <select {...register("year", { required: true })} className="py-4 px-3 border-2 border-input-border rounded-md text-sm text-gray-storm focus:outline-none focus:border-primary">
                                    <option value="">Year</option>
                                    <option value="2022">2022</option>
                                    <option value="2023">2023</option>
                                    <option value="2024">2024</option>
                                    <option value="2025">2025</option>
                                    <option value="2026">2026</option>
                                    <option value="2027">2027</option>
                                </select>
                                <Icon icon="akar-icons:chevron-down" className="text-primary absolute top-5 right-3" style={{ fontSize: '16px', pointerEvents: 'none' }} />
                            </div>
                        </div>

                        <div className="flex items-center my-6 mb-8">
                            <Checkbox id="terms" />
                            <label htmlFor="terms" className="text-sm text-gray-storm font-semibold ml-3">I read and accept <a className="text-sm text-primary font-semibold underline">Terms & Conditions</a></label>
                        </div>

                        <div>
                            <Button kind="primary" size="medium">Continue</Button>
                        </div>
                    </form>

                    <div className="flex items-center justify-between mt-8">
                        <figure>
                            <img src={masterpass} alt="MasterPass" />
                        </figure>

                        <div className="flex items-center gap-x-3">
                            <figure>
                                <img src={americanExpress} alt="American Express" />
                            </figure>
                            <figure>
                                <img src={masterCard} alt="Master Card" />
                            </figure>
                            <figure>
                                <img src={visaLogo} alt="Visa" />
                            </figure>
                            <figure>
                                <img src={troy} alt="Troy" />
                            </figure>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddPaymentMethod;
