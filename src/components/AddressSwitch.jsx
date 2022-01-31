import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { toggleAddDeliveryAddressModal, toggleLoginModal, toggleAddressSelectModal } from "../app/appSlice";

import AddressSelectModal from './AddressSelectModal';

import { Icon } from '@iconify/react';

import houseIcon from '../assets/images/House.svg';
import parkIcon from '../assets/images/Park.svg';
import plazaIcon from '../assets/images/Plaza.svg';

function AddressSwitch(props) {
    const { disabled } = props;
    const { isAuth, user } = useSelector(state => state.auth);
    const { isAddressSelectModalOpen } = useSelector(state => state.app);

    const dispatch = useDispatch();

    const icons = new Map([
        ['home', houseIcon],
        ['other', parkIcon],
        ['business', plazaIcon],
    ])

    let currentAddress = user?.addresses.find(address => address.active);

    const handleClick = () => {
        if (isAuth) {

            currentAddress === undefined
                ? dispatch(toggleAddDeliveryAddressModal(true))
                : dispatch(toggleAddressSelectModal(true));

        } else {
            dispatch(toggleLoginModal(true));
        }
    }

    let content;

    const renderContent = () => {

        if (isAuth && currentAddress) {
            content = currentAddress.available ? (
                <button className="flex items-center bg-brand-yellow w-full md:hidden" disabled={disabled} onClick={handleClick}>
                    <div className="flex justify-between items-center p-3 w-full bg-white rounded-r-full">
                        <div className="flex items-center">
                            <figure className="flex-shrink-0">
                                <img src={icons.get(currentAddress.icon)} alt={`${currentAddress.icon} icon`} style={{ height: '18px' }} />
                            </figure>

                            <div className="w-px h-4 bg-primary-light ml-2 mr-1"></div>
                            <span className="text-sm font-semibold text-gray-mid mr-2">{currentAddress.title}</span>
                            <span className="text-sm text-gray-storm truncate" style={{ maxWidth: 'calc(100vw - 200px)' }}>{currentAddress.street}</span>
                        </div>
                        <Icon icon="akar-icons:chevron-right" className="text-primary flex-shrink-0" style={{ fontSize: '16px' }} />
                    </div>
                    <span className="text-sm text-center text-primary font-semibold px-3 flex-none">ETA <br />{currentAddress.eta}</span>
                </button>
            ) : (
                <button className="flex items-center justify-between w-full bg-white md:hidden" style={{ padding: '10px 0.75rem' }} onClick={handleClick}>
                    <div className="flex items-center">
                        <figure className="flex-shrink-0">
                            <img src={icons.get(currentAddress.icon)} alt={`${currentAddress.icon} icon`} style={{ height: '18px' }} />
                        </figure>

                        <div className="w-px h-4 bg-primary-light ml-2 mr-1"></div>
                        <span className="text-sm font-semibold text-gray-mid mr-2">{currentAddress.title}</span>
                        <span className="text-sm text-gray-storm truncate" style={{ maxWidth: 'calc(100vw - 160px)' }}>{currentAddress.street}</span>
                    </div>
                    <Icon icon="akar-icons:chevron-right" className="text-primary" style={{ fontSize: '16px' }} />
                </button >
            );

        } else {
            content = (
                <button className="w-full bg-white md:hidden" style={{ padding: '10px 0.75rem' }} onClick={handleClick}>
                    <div className="flex items-center w-full">
                        <Icon icon="carbon:location-filled" className="text-primary text-xl" />
                        <p className="ml-2 text-sm text-gray-mid font-semibold">Select Delivery Address</p>
                        <Icon icon="akar-icons:chevron-right" className="ml-auto text-primary text-xl" />
                    </div>
                </button>
            )
        }

        return content;
    }

    return (
        <>
            {renderContent()}
            {isAddressSelectModalOpen && <AddressSelectModal />}
        </>

    );
}

export default AddressSwitch;
