import React from "react";

import { Link, useLocation } from "react-router-dom";

import { Icon } from "@iconify/react";

import { YMaps } from 'react-yandex-maps';
import YandexMap from '../../components/Map';
import DeliveryForm from '../../components/DeliveryForm';
import _ from "lodash";
import { DeliveryAddressContext } from "../../components/DeliveryAddressContext";
import config from "../../config";


function AddAddress() {
  const location = useLocation();

  const defaultCoordinates = React.useMemo(() => [41.0053215, 29.0121795], []);
  const [step, setStep] = React.useState(1);
  const [address, setAddress] = React.useState('');
  const [coordinates, setCoordinates] = React.useState(defaultCoordinates);
  const [suggestions, setSuggestions] = React.useState([]);
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const [canProceed, setCanProceed] = React.useState(true);
  const [mapState, setMapState] = React.useState({ center: defaultCoordinates, zoom: 12 });
  const [drivingTime, setDrivingTime] = React.useState(null);
  const [icon, setIcon] = React.useState(location.state?.icon || 'home');

  const stepsMap = new Map([
    [1, <YandexMap />],
    [2, <DeliveryForm />],
  ]);

  React.useEffect(() => {

    setCanProceed(_.isEmpty(address));

  }, [address]);

  const renderContent = () => (
    <div className="bg-white md:p-6 md:pb-0 md:rounded-xl">
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
    </div>

  );

  return (
    <>
      <Link to="/profile/addresses" reloadDocument className="go-back flex items-center p-4 md:p-0 bg-white md:bg-gray-background mt-8 md:mt-0 mb-4">
        <button className="flex items-center justify-center w-6 h-6 border-0 rounded-lg bg-primary-light md:bg-gray-background mr-3 md:mr-2">
          <Icon icon="akar-icons:chevron-left" className="text-primary text-xs" />
        </button>
        <p className="text-primary font-semibold" style={{ fontSize: "13px" }}>
          Go back to My Addresses
        </p>
      </Link>

      {renderContent()}
    </>
  );
}

export default AddAddress;
