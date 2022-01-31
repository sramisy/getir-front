import React from 'react';

import { Map as YandexMap } from 'react-yandex-maps';

import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { Icon } from "@iconify/react";

import houseIcon from "../assets/images/House.svg";
import parkIcon from "../assets/images/Park.svg";
import plazaIcon from "../assets/images/Plaza.svg";
import { Button } from './Buttons';
import { useDeliveryAddressContext } from './DeliveryAddressContext';
import Select from './form/Select';
import Option from './form/Option';

import { addAddress } from '../auth/authSlice';
import { toggleAddDeliveryAddressModal } from '../app/appSlice';
import { clearBasket } from '../basket/basketSlice';
import { useLocation } from 'react-router-dom';

function DeliveryForm() {
    const { register, handleSubmit } = useForm();
    const [loading, setLoading] = React.useState(false);
    const iconRef = React.useRef(null);

    const location = useLocation();

    const dispatch = useDispatch();

    const {
        setStep,
        address,
        setAddress,
        mapState,
        drivingTime,
        icon,
    } = useDeliveryAddressContext();

    const miniMapRef = React.useRef(null);

    const setMiniMapRef = React.useCallback(yandexMiniMap => {

        if (miniMapRef.current) {
            miniMapRef.current.destroy();
        }

        if (yandexMiniMap) {
            yandexMiniMap.behaviors.disable(['scrollZoom', 'click']);
        }

        miniMapRef.current = yandexMiniMap;

    }, []);


    const onSubmit = async (data) => {
        setLoading(true);

        const timeToCompare = 40 * 60; // in seconds 2400
        const eta = Math.ceil(drivingTime / 60);

        const userAddress = {
            title: data.addressTitle,
            icon: iconRef.current,
            street: data.address,
            building: data.building,
            floor: data.floor,
            apartment: data.apartment,
            direction: data.direction,
            active: true,
            available: (drivingTime <= timeToCompare),
            eta: `${eta} min`,
        };

        try {
            const response = await dispatch(
                addAddress(userAddress)
            ).unwrap();

            if (response.success) {
                await dispatch(clearBasket()).unwrap();

                setLoading(false);

                if (location.pathname.includes('profile')) {
                    window.location.pathname = '/profile/addresses';
                } else {
                    dispatch(toggleAddDeliveryAddressModal(false));

                }
            }

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <button className="mini-map w-full" onClick={() => setStep(1)}>
                <YandexMap
                    state={mapState}
                    style={{ width: '100%', height: '100%', borderRadius: '0.75rem' }}
                    options={{
                        suppressMapOpenBlock: true,
                    }}
                    instanceRef={setMiniMapRef}
                />
            </button>
            <div className={`mt-6 ${location.pathname.includes('profile') ? 'px-4' : ''}`}>
                <form name="delivery-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex gap-x-3">
                        <Select ref={iconRef}>
                            <Option default={icon === 'home'} value="home">
                                <figure>
                                    <img src={houseIcon} alt="House Icon" />
                                </figure>
                            </Option>

                            <Option default={icon === 'business'} value="business">
                                <figure>
                                    <img src={plazaIcon} alt="Plaza Icon" />
                                </figure>
                            </Option>

                            <Option default={icon === 'other'} value="other">
                                <figure>
                                    <img src={parkIcon} alt="Park Icon" />
                                </figure>
                            </Option>
                        </Select>
                        <div className="input-group has-floating-label">
                            <input
                                className="input-control"
                                placeholder="Title (Home, work)"
                                {...register('addressTitle', { required: true, value: 'Home' })}
                            />
                            <label htmlFor="title" className="label-control">
                                Title (Home, work)
                            </label>
                        </div>
                    </div>

                    <div className="input-group has-floating-label mt-5">
                        <input
                            className="input-control"
                            placeholder="Address"
                            {...register('address', {
                                required: true,
                                value: address,
                                onChange: (e) => setAddress(e.target.value)
                            })}
                        />
                        <label htmlFor="address" className="label-control">
                            Address
                        </label>
                    </div>

                    <div className="md:flex gap-x-5">
                        <div className="input-group has-floating-label mt-5">
                            <input
                                className="input-control"
                                placeholder="Building"
                                {...register('building')}
                            />
                            <label htmlFor="building" className="label-control">
                                Building
                            </label>
                        </div>

                        <div className="input-group has-floating-label mt-5">
                            <input
                                className="input-control"
                                placeholder="Floor"
                                {...register('floor')}
                            />
                            <label htmlFor="floor" className="label-control">
                                Floor
                            </label>
                        </div>

                        <div className="input-group has-floating-label mt-5">
                            <input
                                className="input-control"
                                placeholder="Apt. No"
                                {...register('apartment')}
                            />
                            <label htmlFor="apartment" className="label-control">
                                Apt. No
                            </label>
                        </div>
                    </div>

                    <div className="input-group has-floating-label mt-5">
                        <input
                            className="input-control"
                            placeholder="Add Directions"
                            {...register('direction')}
                        />
                        <label htmlFor="direction" className="label-control">
                            Add Directions
                        </label>
                    </div>

                    <div className="py-6">
                        <Button kind="primary" size="medium" className={loading ? 'cursor-not-allowed' : ''}>
                            {loading && <Icon icon="ph:spinner-bold" className="text-sm text-white mr-3 animate-spin-slow" />}
                            Save
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default DeliveryForm;
