import React from 'react';

import { Icon } from '@iconify/react';
import { useSelector, useDispatch } from 'react-redux';

import styles from "./FindLocation.module.css";
import { toggleAddDeliveryAddressModal, toggleAddressSelectModal } from '../app/appSlice';

function FindLocation() {

    const { isAuth, user: { addresses } } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const currentAddress = addresses.find(address => address.active);

    const handleClick = () => {
        if (isAuth) {
            currentAddress === undefined
                ? dispatch(toggleAddDeliveryAddressModal(true))
                : dispatch(toggleAddressSelectModal(true));

        }
    }

    return (
        <div className={styles['find-location']}>
            <div className="input-group has-left-icon has-right-icon">
                <input type="text" name="addressSearch" id="addressSearch" autoComplete='off' placeholder="Ex. Etiler Mah." onClick={handleClick} />
                <Icon icon="carbon:search" className="text-primary absolute left-4 top-4 text-2xl" />
                <button className={styles['auto-detect-btn']} onClick={handleClick}>
                    <Icon icon="ic:baseline-location-searching" className="text-primary text-xl" />
                    <span>Find my location</span>
                </button>
            </div>
        </div>
    );
}

export default FindLocation;
