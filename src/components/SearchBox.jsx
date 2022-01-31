import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { Icon } from '@iconify/react';

import PopularSearch from './PopularSearch';
import SearchResult from './SearchResult';

import houseIcon from '../assets/images/House.svg';
import parkIcon from '../assets/images/Park.svg';
import plazaIcon from '../assets/images/Plaza.svg';
import "./SearchBox.css";
import { toggleAddDeliveryAddressModal, toggleAddressSelectModal, toggleLoginModal, toggleOutServiceAreaModal } from '../app/appSlice';


function SearchBox() {
    const searchBoxRef = React.createRef(null);
    const [showSearchOverlay, setShowSearchOverlay] = React.useState(false);
    const { isAuth, user } = useSelector(state => state.auth);
    const [searchQuery, setSearchQuery] = React.useState('');

    const inputRef = React.useRef(null);
    const dispatch = useDispatch();

    const icons = new Map([
        ['home', houseIcon],
        ['other', parkIcon],
        ['business', plazaIcon],
    ])

    const [width, setWidth] = React.useState(window.innerWidth);
    const [results, setResults] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [popularSearches, setPopularSearches] = React.useState([]);

    const currentAddress = user?.addresses.find(address => address.active);

    const handleChange = e => {
        inputRef.current.value = e.target.value;
        setSearchQuery(inputRef.current.value);

        if (inputRef.current.value.length > 3) {
            startSearch();
        }
    }

    const handleFocus = () => {

        if (isAuth && !currentAddress) {
            dispatch(toggleAddDeliveryAddressModal(true));
            return;

        } else if (isAuth && !currentAddress.available) {
            dispatch(toggleOutServiceAreaModal(true));
            return;

        } else if (isAuth && currentAddress.available) {
            setShowSearchOverlay(true);
            return;
        }

        dispatch(toggleLoginModal(true));
    }

    const handleClick = () => {
        if (isAuth) {

            currentAddress === undefined
                ? dispatch(toggleAddDeliveryAddressModal(true))
                : dispatch(toggleAddressSelectModal(true));
            return;

        }

        dispatch(toggleLoginModal(true));
    }

    const onPopularSearchClick = name => {
        inputRef.current.value = name;
        console.log(showSearchOverlay);
        setSearchQuery(inputRef.current.value);
        startSearch();
    }

    const clearInput = () => {
        inputRef.current.value = '';
        setSearchQuery('');
        setResults([]);
        setLoading(false);
    }

    const startSearch = async () => {
        console.log("Start Search: ", inputRef.current.value);

        const url = `/api/search?q=${inputRef.current.value}`;
        console.log(url);
        setLoading(true);
        console.log(showSearchOverlay);

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


    React.useEffect(() => {
        window.addEventListener('resize', () => {
            setWidth(window.innerWidth);
        });

    }, [width]);

    React.useEffect(() => {
        const checkIfClickOutside = e => {
            if (searchBoxRef.current && !searchBoxRef.current.contains(e.target)) {
                setShowSearchOverlay(false);
                inputRef.current.value = '';
                setResults([]);
            }
        }

        document.addEventListener('mousedown', checkIfClickOutside);

        return () => {
            document.removeEventListener('mousedown', checkIfClickOutside);
        }

    }, [searchBoxRef]);


    React.useEffect(() => {
        document.body.style.overflow = showSearchOverlay ? "hidden" : "auto";

    }, [showSearchOverlay]);


    const renderContent = () => {

        if (isAuth) {

            if (currentAddress === undefined) {
                return (
                    <div className="search-box-container">
                        <div className="search-box">
                            <div className="input-group has-left-icon has-right-icon">
                                <input type="search" name="productSearch" id="productSearch" autoComplete="off" className="w-full bg-white border-0 rounded-lg px-3 py-3 placeholder-gray-storm text-sm pl-14 focus:outline-none" placeholder="Search Product" onFocus={handleFocus} />
                                <Icon icon="carbon:search" className="text-primary absolute left-5 top-3" style={{ fontSize: '20px' }} />
                                <button className="icon-text flex justify-center items-center h-8 px-2 border-0 rounded-lg bg-primary-light absolute right-2" style={{ top: '6px' }} onClick={handleClick}>
                                    <Icon icon="akar-icons:plus" className="text-primary" style={{ fontSize: '12px' }} />
                                    <span className="text-sm text-primary ml-2">Add New Address</span>
                                </button>
                            </div>
                        </div>
                    </div>

                )

            } else if (!currentAddress.available) {
                return (
                    <div className="flex search-box-container">
                        <div className="flex search-box">
                            <div className="input-group has-left-icon">
                                <input
                                    type="search"
                                    name="productSearch"
                                    id="productSearch"
                                    autoComplete="off"
                                    className="w-full bg-white border-0 rounded-l-lg px-3 py-3 placeholder-gray-storm text-sm pl-14 focus:outline-none"
                                    placeholder="Search Product"
                                    onFocus={handleFocus}
                                />
                                <Icon icon="carbon:search" className="text-primary absolute left-5 top-3" style={{ fontSize: '20px' }} />
                            </div>
                        </div>

                        <button className="flex flex-none items-center gap-x-2 bg-gray-background py-3 px-4 border-0 rounded-r-lg" onClick={handleClick}>
                            <figure>
                                <img src={icons.get(currentAddress.icon)} alt={`${currentAddress.icon} icon`} style={{ height: '18px' }} />
                            </figure>
                            <span className="text-sm text-black">{currentAddress.title}</span>
                            <Icon icon="akar-icons:chevron-right" className="text-primary" style={{ fontSize: '16px' }} />
                        </button>
                    </div>

                )
            }

            return (
                <>
                    <div className={`flex search-box-container relative bg-gray-background rounded-lg ${showSearchOverlay && (width > 1367) ? 'rounded-br-none' : ''}`}>
                        <div ref={searchBoxRef} className={`search-box bg-white border-0 rounded-lg ${showSearchOverlay && (width > 1367) ? 'rounded-b-none' : ''} ${inputRef.current?.value ? 'w-full' : ''}  `}>
                            <div className="flex">
                                <div className="input-group has-left-icon">
                                    <input ref={inputRef} type="text" name="productSearch" id="productSearch" autoComplete="off" className={`w-full border-0 rounded-l-lg ${inputRef.current?.value ? 'rounded-lg' : ''} ${showSearchOverlay ? 'bg-gray-background' : ''} px-3 py-3 placeholder-gray-storm text-sm pl-14 focus:outline-none`} placeholder="Search Product" onFocus={handleFocus} onChange={handleChange} />
                                    {loading ? (
                                        <Icon icon="ph:spinner" className="text-xl text-primary animate-spin-slow absolute left-5 top-3" />
                                    ) : (
                                        <Icon icon="carbon:search" className="text-xl text-primary absolute left-5 top-3" />
                                    )}
                                    {inputRef.current?.value.length > 0 && (
                                        <button onClick={clearInput} className="absolute top-3 right-3">
                                            <Icon icon="carbon:close" className="text-gray-mid text-xl" />
                                        </button>
                                    )}
                                </div>
                            </div>

                            {showSearchOverlay && (
                                <>
                                    {(/* inputRef.current?.value &&  */results.length > 0) ? (
                                        <div className="search-results">
                                            <ul className="">
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
                                </>
                            )}
                        </div>

                        {!(inputRef.current?.value.length > 0) && (
                            <div className={`flex flex-none items-center bg-brand-yellow border-0 rounded-r-lg`}>
                                <button className={`flex flex-none items-center h-full gap-x-2 py-3 px-3 border-0 rounded-r-full bg-white ${showSearchOverlay ? 'bg-gray-background' : ''}`} onClick={handleClick}>
                                    <figure>
                                        <img src={icons.get(currentAddress.icon)} alt={`${currentAddress.icon} icon`} style={{ height: '18px' }} />
                                    </figure>
                                    <span className="text-sm text-black font-semibold hidden xl:block">{currentAddress.title}</span>
                                    <Icon icon="akar-icons:chevron-right" className="text-primary" style={{ fontSize: '16px' }} />
                                </button>
                                <div className="px-3">
                                    <span className="text-sm text-primary font-semibold">ETA {currentAddress.eta}</span>
                                </div>
                            </div>
                        )}
                    </div>


                    {showSearchOverlay && (
                        <div className="search-overlay"></div>
                    )}

                </>
            )
        }
    }

    return (
        <>
            {renderContent()}
        </>

    );
}

export default SearchBox;
