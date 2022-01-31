import React from 'react';

import { useDispatch } from 'react-redux';

import _ from 'lodash';

import { YMaps } from 'react-yandex-maps';

import { toggleAddDeliveryAddressModal } from '../app/appSlice';

import YandexMap from './Map';
import DeliveryForm from './DeliveryForm';
import { Modal, ModalBody, ModalHeader } from './Modal';
import { DeliveryAddressContext } from './DeliveryAddressContext';
import config from '../config';


function AddDeliveryAddressModal() {
    const defaultCoordinates = React.useMemo(() => [41.0053215, 29.0121795], []);
    const [step, setStep] = React.useState(1);
    const [address, setAddress] = React.useState('');
    const [coordinates, setCoordinates] = React.useState(defaultCoordinates);
    const [suggestions, setSuggestions] = React.useState([]);
    const [showSuggestions, setShowSuggestions] = React.useState(false);
    const [canProceed, setCanProceed] = React.useState(true);
    const [mapState, setMapState] = React.useState({ center: defaultCoordinates, zoom: 12 });
    const [drivingTime, setDrivingTime] = React.useState(null);
    const [icon, setIcon] = React.useState('home');

    const dispatch = useDispatch();

    const stepsMap = new Map([
        [1, <YandexMap />],
        [2, <DeliveryForm />],
    ]);

    React.useEffect(() => {

        setCanProceed(_.isEmpty(address));

    }, [address]);

    return (
        <Modal center className="add-delivery-address" onClose={() => dispatch(toggleAddDeliveryAddressModal(false))}>
            <ModalHeader className="py-9 px-4 md:px-9" closeBtn backBtn={step === 1 ? 'invisible' : true} onBack={() => setStep(1)}>
                <h3>Add Delivery Address</h3>
            </ModalHeader>
            <ModalBody className="px-4 md:px-9 md:rounded-b-xl">
                <DeliveryAddressContext.Provider value={{
                    mapState,
                    setMapState,
                    step,
                    setStep,
                    address,
                    setAddress,
                    defaultCoordinates,
                    coordinates,
                    setCoordinates,
                    suggestions,
                    setSuggestions,
                    showSuggestions,
                    setShowSuggestions,
                    canProceed,
                    drivingTime,
                    setDrivingTime,
                    icon,
                    setIcon,
                }}>
                    <YMaps
                        query={{
                            lang: 'en_US',
                            apikey: config.yandexApiKey,
                        }}
                    >
                        {stepsMap.get(step)}
                    </YMaps>
                </DeliveryAddressContext.Provider>
            </ModalBody>
        </Modal>
    );
}

export default AddDeliveryAddressModal;
