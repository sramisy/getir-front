import React from 'react';

import { useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";

import classNames from 'classnames';

import { Icon } from '@iconify/react';

import { login } from "./authSlice";
import { toggleSignupModal, toggleLoginModal, toggleOtpModal } from "../app/appSlice";
import { Button, FacebookBtn } from '../components/Buttons';

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';


function Login(props) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();

    const [country, setCountry] = React.useState('Turkey');
    const [countryCode, setCountryCode] = React.useState('tr');
    const [dialCode, setDialCode] = React.useState('90');
    const [loading, setLoading] = React.useState(false);

    const onSubmit = async data => {
        setLoading(true);

        console.log(data);
        console.log(countryCode);
        console.log(country);

        try {
            const response = await dispatch(
                login({
                    dialCode,
                    phone: data.phone,
                    countryCode,
                    country,
                })
            ).unwrap();

            console.log(response);

            setLoading(false);

            if (response.success) {
                dispatch(toggleOtpModal(true));
                dispatch(toggleLoginModal(false));

            } else {
                dispatch(toggleSignupModal(true));
            }

        } catch (err) {
            console.error(err);
        }
    }

    const {
        className,
        children,
    } = props;

    const classes = classNames('login-form', className);

    return (
        <div className={classes}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex mb-3">
                    <div className="relative">
                        <PhoneInput
                            inputProps={{
                                name: 'countryCode',
                            }}
                            regions={['america', 'europe', 'asia']}
                            buttonStyle={{ position: "relative", backgroundColor: "white", width: "110px" }}
                            country={countryCode}
                            value={`${dialCode}`}
                            onChange={(value, country) => {
                                setDialCode(country.dialCode);
                                setCountryCode(country.countryCode);
                                setCountry(country.name);
                            }}
                        />
                        <span className="country-code">+{dialCode}</span>
                    </div>

                    <div className="input-group has-floating-label ml-3 flex-grow">
                        <input type="tel" {...register("phone", { required: true, minLength: 10 })} className={`input-control ${errors.phone && 'error'}`} placeholder="Mobile phone" />
                        <label htmlFor="phone" className="label-control">Mobile phone</label>

                        {errors.phone && <Icon icon="ant-design:info-circle-outlined" className="error-icon" />}
                        {errors.phone?.type === 'required' ? (
                            <p className="error-message">Enter phone number</p>
                        ) : null}

                        {errors.phone?.type === 'minLength' ? (
                            <p className="error-message">Enter correct phone number</p>
                        ) : null}
                    </div>
                </div>

                <Button size="medium" kind="brand" className="group">
                    {loading && (<Icon icon="ph:spinner-bold" className="text-sm text-primary group-hover:text-brand-yellow animate-spin-slow mr-3" />)}
                    Continue with phone number
                </Button>
            </form>

            {/* <p className="mt-3 text-xs text-gray">For the GDPR document regarding your personal information: <a className="text-primary text-xs">click</a></p>

            <div className="bg-input-border h-px w-1/2 mt-4 mb-6 mx-auto"></div> */}

            {children ? children : (<div className="h-px bg-primary-light w-full mt-5 mb-4"></div>)}

            <FacebookBtn>
                <Icon icon="akar-icons:facebook-fill" className="text-facebook-blue text-xl" />
                <span className="mx-auto text-sm font-semibold text-facebook-blue">Login with Facebook</span>
            </FacebookBtn>
        </div>
    );
}

export default Login;
