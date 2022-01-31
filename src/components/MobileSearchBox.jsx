import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { Icon } from "@iconify/react";

import "./MobileSearchBox.css";
import PopularSearch from './PopularSearch';
import SearchResult from './SearchResult';
import { toggleAddDeliveryAddressModal, toggleLoginModal, toggleOutServiceAreaModal } from '../app/appSlice';


function MobileSearchBox(props) {
    const { showInput, onOpen, onClose } = props;

    const inputRef = React.useRef(null);
    const searchBoxRef = React.useRef(null);

    const { isAuth, user } = useSelector(state => state.auth);
    const [results, setResults] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [popularSearches, setPopularSearches] = React.useState([]);

    const currentAddress = user?.addresses.find(address => address.active);

    const dispatch = useDispatch();

    const handleChange = e => {
        inputRef.current.value = e.target.value;
        if (inputRef.current.value.length > 3) {
            startSearch();
        }
    }

    const handleClick = () => {
        if (isAuth) {

            if (currentAddress === undefined) {
                return dispatch(toggleAddDeliveryAddressModal(true));

            } else if (!currentAddress.available) {
                return dispatch(toggleOutServiceAreaModal(true));

            } else {
                return onOpen();
            }

        } else {
            return dispatch(toggleLoginModal(true));
        }
    }

    const onPopularSearchClick = name => {
        inputRef.current.value = name;
        console.log(inputRef.current.value);
        startSearch();
    }

    const clearInput = () => {
        inputRef.current.value = "";
        setResults([]);
        setLoading(false);
    }

    const startSearch = async () => {
        console.log("Start Search: ", inputRef.current.value);

        const url = `/api/search?q=${inputRef.current.value}`;
        console.log(url);
        setLoading(true);

        try {
            const response = await fetch(url);
            const data = await response.json();

            setResults(data);
            setLoading(false);

        } catch (err) {
            console.log(err);
        }
    }

    React.useEffect(() => {
        if (isAuth) {
            try {
                fetch(`/api/popular-searches`)
                    .then(res => res.json())
                    .then(results => {
                        setPopularSearches(results);
                    });

            } catch (err) {
                console.log(err);
            }

        }

        return () => {
            setPopularSearches([]);
        }

    }, [isAuth]);

    const renderedPopularSearches = popularSearches?.map((searchItem, index) => (
        <PopularSearch
            key={index}
            item={searchItem}
            onClick={() => onPopularSearchClick(searchItem)}
        />
    ));

    const renderedResults = results.map((result, index) => (
        <SearchResult key={index} item={result} />
    ));

    let content;

    content = showInput ? (
        <>
            <div className="relative w-full" ref={searchBoxRef}>
                <div className="flex items-center gap-x-3 w-full px-3">
                    <div className="input-group has-left-icon has-right-icon">
                        <input ref={inputRef} type="text" name="query" id="query" autoComplete="off" className="py-3 pl-14 pr-4 border-0 rounded-lg w-full text-sm focus:outline-none" placeholder="Search Product" onChange={handleChange} style={{ padding: '10px 0.75rem 10px 56px' }} />
                        {loading ? (
                            <Icon icon="ph:spinner" className="text-lg text-primary animate-spin-slow absolute left-5 top-3" style={{ top: '10px' }} />
                        ) : (
                            <Icon icon="carbon:search" className="text-xl text-primary absolute left-5 top-3" style={{ top: '10px' }} />
                        )}
                        {inputRef.current?.value ? (
                            <button onClick={clearInput} className="absolute top-3 right-3" style={{ top: '11px' }}>
                                <Icon icon="carbon:close" className="text-gray-mid text-xl" />
                            </button>
                        ) : null}
                    </div>

                    <button onClick={onClose}>
                        <Icon icon="eva:close-outline" className="text-white" style={{ fontSize: '24px' }} />
                    </button>
                </div>

                <div className="absolute left-0 z-40 w-full" style={{ top: '52px' }}>
                    {inputRef.current?.value && (results.length > 0) ? (
                        <div className="search-results">
                            <ul>
                                {renderedResults}
                            </ul>
                        </div>
                    ) : (
                        <div className="popular-searches">
                            <div className="border-t border-primary-light">
                                <h4 className="text-sm text-gray-storm text-center">Popular Search</h4>

                                <ul className="flex flex-wrap justify-center gap-2 mt-3">
                                    {renderedPopularSearches}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="overlay w-full fixed left-0 right-0 bottom-0 z-30 bg-white top-4 overflow-y-auto" style={{ backgroundColor: 'rgba(24, 17, 45, 0.72)', top: '104px' }}>
            </div>
        </>

    ) : (
        <button className={isAuth ? '' : 'invisible'} onClick={handleClick}>
            <Icon icon="carbon:search" className="text-2xl text-primary-light" />
        </button>
    )

    return (
        <>
            {content}
        </>
    );
}

export default MobileSearchBox;
