import React from 'react';

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { signup } from './authSlice';
import { toggleSignupModal, toggleActivationModal } from '../app/appSlice';

import { Icon } from '@iconify/react';
import { Button, FacebookBtn } from '../components/Buttons';

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import Checkbox from '../components/form/Checkbox';

const Signup = () => {

  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  const dispatch = useDispatch();

  const [country, setCountry] = React.useState('Turkey');
  const [dialCode, setDialCode] = React.useState('90');
  const [countryCode, setCountryCode] = React.useState('th');
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async data => {
    setLoading(true);

    const { phone, fullName, email } = data;
    const [firstName, lastName] = fullName.split(' ');

    try {
      const response = await dispatch(
        signup({
          dialCode,
          phone,
          firstName,
          lastName,
          fullName,
          email,
          country,
        })
      ).unwrap();

      setLoading(false);

      if (response.success) {
        dispatch(toggleSignupModal(false));
        dispatch(toggleActivationModal(true));
      }

    } catch (err) {
      console.error(err);
    }
  }

  React.useEffect(() => {
    if (sessionStorage.getItem('guest')) {
      const guest = JSON.parse(sessionStorage.getItem('guest'));
      setCountryCode(guest.countryCode);
      setDialCode(guest.dialCode);
      setCountry(guest.country);
      setValue('phone', guest.phone);
    }

    return () => {
      sessionStorage.removeItem('guest');
    }

  }, [setValue]);


  return (
    <div>
      <FacebookBtn>
        <Icon icon="akar-icons:facebook-fill" className="text-facebook-blue text-xl" />
        <span className="mx-auto text-sm font-semibold text-facebook-blue">Login with Facebook</span>
      </FacebookBtn>

      <div className="signup-form mt-8">
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

          <div className="input-group has-floating-label flex-grow mt-5">
            <input type="text" {...register("fullName", { required: true })} className={`input-control ${errors.fullName && 'error'}`} placeholder="Name Surname" />
            <label htmlFor="fullName" className="label-control">Name Surname</label>

            {errors.fullName?.type === 'required' ? (
              <p className="error-message">Enter your full name</p>
            ) : null}
          </div>

          <div className="input-group has-floating-label flex-grow mt-5">
            <input type="email" {...register("email", { required: true })} className={`input-control ${errors.email && 'error'}`} placeholder="Email" />
            <label htmlFor="email" className="label-control">Email</label>

            {errors.email?.type === 'required' ? (
              <p className="error-message">Enter email address</p>
            ) : null}
          </div>

          <div className="input-group has-floating-label flex-grow mt-5">
            <input type="password" {...register("password", { required: true, minLength: 6 })} className={`input-control ${errors.password && 'error'}`} placeholder="Password" />
            <label htmlFor="password" className="label-control">Password</label>

            {errors.password?.type === 'required' && (
              <p className="error-message">Enter your password</p>
            )}
            {errors.password?.type === 'minLength' && (
              <p className="error-message">Enter min 7 characters</p>
            )}
          </div>

          <p className="text-gray mt-2 text-xs">* Password must be at least 7 long and include at least one special character.</p>

          <div className="flex items-center mt-5">
            <Checkbox id="promoNotify" />
            <label htmlFor="promoNotify" className="text-gray text-xs ml-3">I want to be informed of special promotions and news regarding Getir.</label>
          </div>

          <div className="mt-8">
            <ul className="conditions">
              <li className="condition mb-4">
                You will have accepted <a className="text-xs text-primary underline">Terms & Conditions</a> by signing up.
              </li>
              <li className="condition">
                For the GDPR document regarding your personal information: <a className="text-xs text-primary underline">click</a>
              </li>
            </ul>
          </div>

          <div className="mt-16 mb-4">
            <Button kind="primary" size="medium">
              {loading && (<Icon icon="ph:spinner-bold" className="text-sm text-primary-light animate-spin-slow mr-3" />)}
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
