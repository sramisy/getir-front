import React from "react";

export const DeliveryAddressContext = React.createContext({
    mapState: {},
    setMapState: () => {},
    step: 1,
    setStep: () => {},
    address: '',
    setAddress: () => {},
    defaultCoordinates: {},
    setCoordinates: () => {},
    coordinates: [],
    suggestions: [],
    setSuggestions: () => {},
    showSuggestions: false,
    setShowSuggestions: () => {},
    clearInput: () => {},
    canProceed: false,
    available: false,
    setAvailable: () => {},
    drivingTime: 0,
    setDrivingTime: () => {},
    icon: 'home',
    setIcon: () => {},
});

export const useDeliveryAddressContext = () => {
    const context = React.useContext(DeliveryAddressContext);
    if (context === undefined) {
        throw new Error(
            "useDeliveryAddressContext must be used within a DeliveryAddressContextProvider"
        );
    }
    return context;
}