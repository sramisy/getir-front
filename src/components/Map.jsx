import React from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { Map as YandexMap, ZoomControl, withYMaps } from 'react-yandex-maps';
import _ from 'lodash';

import { Button } from './Buttons';
import Suggestions from './Suggestions';

import { useDeliveryAddressContext } from './DeliveryAddressContext';

import { Icon } from '@iconify/react';

import houseIcon from '../assets/images/House.svg';


import "./Map.css";

function Map(props) {
  const actionInterval = React.useRef(null);
  const searchInterval = React.useRef(null);
  const addressSearch = React.useRef(null);

  const location = useLocation();

  const {
    mapState,
    setMapState,
    setStep,
    address,
    setAddress,
    defaultCoordinates,
    setCoordinates,
    suggestions,
    setSuggestions,
    showSuggestions,
    setShowSuggestions,
    canProceed,
    setDrivingTime,
  } = useDeliveryAddressContext();

  const { ymaps } = props;
  const inputRef = React.useRef(null);
  const mapRef = React.useRef(null);

  const [loading, setLoading] = React.useState(false);

  const setMapRef = React.useCallback(yandexMap => {

    const onActionEnd = e => {
      setLoading(true);

      if (actionInterval.current) {
        clearTimeout(actionInterval.current);
      }

      actionInterval.current = setTimeout(() => {
        ymaps.geocode(yandexMap.getCenter()).then(res => {
          const firstGeoObject = res.geoObjects.get(0);
          const address = firstGeoObject.properties.get('text');

          setAddress(address);
          setCoordinates(yandexMap.getCenter());

          ymaps.route([defaultCoordinates, yandexMap.getCenter()]).then(route => {
            const drivingTime = parseInt(route.getJamsTime()); // drivingTime in seconds
            setDrivingTime(drivingTime);
          }, err => {
            console.log(err);
          })

        }, err => {
          console.log(err);
        });

        setLoading(false);
      }, 2000);
    }

    if (mapRef.current) {
      mapRef.current.destroy();
    }

    if (yandexMap) {
      yandexMap.events.add('actionend', onActionEnd);
    }

    mapRef.current = yandexMap;

  }, [ymaps, setAddress, setCoordinates, defaultCoordinates, setDrivingTime]);

  React.useEffect(() => {

    inputRef.current.addEventListener('keyup', () => {
      if (searchInterval.current) {
        clearTimeout(searchInterval.current);

      }

      let suggestions = [];

      const startSearch = () => {
        ymaps.geocode(inputRef.current.value).then(res => {
          res.geoObjects.each(item => {

            if (item.getCountryCode() === "TR") {
              const coordinates = item.geometry.getCoordinates();
              const address = item.properties.get('text');

              suggestions.push({
                coordinates,
                address,
              });
            }
          });

          setShowSuggestions(true);
          setSuggestions(suggestions);
        });

      }

      if (inputRef.current.value.length > 3) {
        console.log('searching');
        searchInterval.current = setTimeout(startSearch, 1000);
      }

      return () => {
        if (searchInterval.current) {
          searchInterval.current.cancel();
        }
      }
    });

  }, [setShowSuggestions, setSuggestions, ymaps])


  React.useEffect(() => {
    const checkIfClickOutside = e => {
      if (addressSearch.current && !addressSearch.current.contains(e.target)) {
        setShowSuggestions(false);
      }

    };

    document.addEventListener('click', checkIfClickOutside);

    return () => {
      document.removeEventListener('click', checkIfClickOutside);
    };
  });

  const detectLocation = () => {
    const geolocation = ymaps.geolocation;

    geolocation.get().then(res => {
      const geoObject = res.geoObjects.get(0);
      const bounds = geoObject.properties.get('boundedBy');
      const coordinates = geoObject.geometry.getCoordinates();
      const address = geoObject.properties.get('text');

      const mapState = {
        center: coordinates,
        bounds,
      };

      setAddress(address);
      setMapState(mapState);

    }, err => {
      console.log(err);
    });
  }

  return (
    <>
      <div className="relative rounded-lg">
        <div className="marker">
          <div className="address-wrapper">
            {loading && <Icon icon="ph:spinner-bold" className="text-sm text-gray-mid animate-spin-slow mr-2" />}
            <address className="address">{address || 'Drag pin to select address'}</address>
          </div>
          <div className="image">
            <figure>
              <img className="" src={houseIcon} alt="Address" />
            </figure>
          </div>
        </div>
        <div className="map" id="map">
          <YandexMap
            state={mapState}
            style={{ width: '100%', height: '100%', borderRadius: '0.75rem' }}
            options={{
              suppressMapOpenBlock: true,
              yandexMapDisablePoiInteractivity: true,
            }}
            instanceRef={setMapRef}
          >
            <ZoomControl
              options={{
                size: 'small',
                position: {
                  left: 10,
                  bottom: 10,
                }
              }}
            />
          </YandexMap>
        </div>

        <div className="w-full absolute left-0 top-0 rounded-lg">
          <div className="p-2 relative" ref={addressSearch}>
            <div className="input-group has-left-icon has-right-icon ">
              <input
                ref={inputRef}
                type="text"
                name="addressSearch"
                id="addressSearch"
                className="w-full bg-white rounded-lg md:rounded-xl px-3 py-4 md:py-5 placeholder-gray-storm text-sm pl-14 focus:outline-none"
                placeholder="Ex. Etiler Mah."
                autoComplete='off'
                onFocus={() => setShowSuggestions(true)}
              />
              <Icon
                icon="eva:search-outline"
                className="text-primary text-2xl absolute left-4 top-3 md:top-4"
              />
              <button onClick={detectLocation} className="icon-text flex justify-center items-center h-9 px-2 border-0 rounded-lg bg-primary-light absolute right-2 md:right-3  top-2 md:top-3">
                <Icon
                  icon="ic:baseline-location-searching"
                  className="text-primary text-xl"
                />
                <span className="text-sm text-primary ml-2 hidden md:inline">
                  Find my location
                </span>
              </button>
            </div>

            {showSuggestions && suggestions.length > 0 && <Suggestions ref={inputRef} data={suggestions} />}
          </div>



        </div>
      </div>

      <div className={`py-6 md:py-8 ${location.pathname.includes('profile') ? 'px-6 md:px-0' : ''}`}>
        <Button size="small" kind="primary" disabled={canProceed} onClick={() => {
          setStep(2);
          setMapState({ center: mapRef.current.getCenter(), zoom: mapRef.current.getZoom() });
        }}>
          Use this address
        </Button>
      </div>
    </>

  )
}

export default withYMaps(Map, true, ['suggest', 'geocode', 'geolocation', 'route']);
