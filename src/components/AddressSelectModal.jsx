import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { toggleAddDeliveryAddressModal, toggleAddressSelectModal } from '../app/appSlice';

import { Modal, ModalBody, ModalFooter, ModalHeader } from './Modal';

import { Icon } from '@iconify/react';
import { Button } from '../components/Buttons';

import houseIcon from '../assets/images/House.svg';
import parkIcon from '../assets/images/Park.svg';
import plazaIcon from '../assets/images/Plaza.svg';
import { selectActiveAddress, updateCurrentAddress } from '../auth/authSlice';

import styles from "./AddressSelectModal.module.css";
import { clearBasket } from '../basket/basketSlice';

function AddressSelectModal() {
    const dispatch = useDispatch();

    const icons = new Map([
        ['home', houseIcon],
        ['other', parkIcon],
        ['business', plazaIcon],
    ])

    const { user: { addresses } } = useSelector(state => state.auth);
    const activeAddress = useSelector(state => selectActiveAddress(state));

    const [currentAddress, setCurrentAddress] = React.useState(activeAddress.id);
    const [loading, setLoading] = React.useState(false);
    const [width, setWidth] = React.useState(window.innerWidth);

    const canUpdate = currentAddress !== activeAddress.id;

    const handleChange = e => {
        setCurrentAddress(e.target.value);
    }

    const handleClick = () => {
        dispatch(toggleAddressSelectModal(false));
        dispatch(toggleAddDeliveryAddressModal(true));
    }

    const confirmAddress = async () => {
        setLoading(true);

        try {
            const response = await dispatch(
                updateCurrentAddress(currentAddress)
            ).unwrap();

            if (response.success) {
                await dispatch(clearBasket()).unwrap();
                setLoading(false);
                dispatch(toggleAddressSelectModal(false));
            }
        } catch (err) {
            console.log(err);
        }
    }

    const renderContent = () => {
        return addresses.map((address, index) => {
            return (
                <div key={index} className="flex justify-between items-center overflow-hidden">
                    <div className="mb-6">
                        <div className="flex items-center">
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    name="address"
                                    value={address.id}
                                    id={address.id}
                                    checked={currentAddress === address.id}
                                    className="radio-control"
                                    onChange={handleChange} />
                            </div>
                            <label className="flex items-center" htmlFor={address.id}>
                                <figure className="ml-4 mr-3 flex-none" style={{ width: '22px' }}>
                                    <img src={icons.get(address.icon)} alt={address.title} />
                                </figure>
                                <span className="text-sm text-gray-dark mr-1">{address.title}</span>
                                <span className={styles['street-address']}>({address.street})</span>
                            </label>
                        </div>
                    </div>
                </div>
            );
        });
    }


    React.useEffect(() => {
        window.onresize = () => {
            setWidth(window.innerWidth);
        }

    }, [width]);

    return (
        <div>
            <Modal center onClose={() => dispatch(toggleAddressSelectModal(false))} className="addresses">
                <ModalHeader closeBtn className="py-9 px-4 md:px-8">
                    <h3>My Addresses</h3>
                </ModalHeader>
                <ModalBody className="px-4 md:px-6 flex-1">
                    {renderContent()}

                    {width > 767 && (
                        <div className="my-8">
                            <Button kind="primary" size="medium" className={loading ? 'cursor-not-allowed' : ''} disabled={!canUpdate} onClick={confirmAddress}>
                                {loading && <Icon icon="ph:spinner-bold" className="text-sm text-white animate-spin-slow mr-2" />}
                                Confirm Address
                            </Button>
                        </div>
                    )}

                </ModalBody>
                <ModalFooter>
                    {width > 767 ? (
                        <div className="py-4 flex justify-center items-center bg-gray-light rounded-b-xl">
                            <span className="text-sm text-gray-storm mr-3">
                                Are you in another address?
                            </span>
                            <button className="text-primary text-sm font-semibold hover:underline" onClick={handleClick}>
                                Add Address
                            </button>
                        </div>
                    ) : (
                        <div className="flex gap-x-5 items-center p-4 bg-gray-light">
                            <Button kind="secondary" size="medium" onClick={() => dispatch(toggleAddDeliveryAddressModal(true))}>Add Address</Button>
                            <Button kind="primary" size="medium" disabled={!canUpdate} onClick={confirmAddress}>
                                {loading && <Icon icon="ph:spinner-bold" className="text-sm text-white animate-spin-slow mr-2" />}
                                Confirm Address
                            </Button>
                        </div>
                    )}
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default AddressSelectModal;
