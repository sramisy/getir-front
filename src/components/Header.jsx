import React from 'react';

import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

import classNames from 'classnames';
import PropTypes from 'prop-types';

import "./Header.css";

import SearchBox from './SearchBox';
import BasketSummary from '../basket/BasketSummary';

import getir from "../assets/images/getir.svg";

const propTypes = {
    className: PropTypes.string,
}

function Header(props) {
    const [width, setWidth] = React.useState(window.innerWidth);
    const { items } = useSelector(state => state.basket);

    const {
        className,
    } = props;

    React.useEffect(() => {
        window.addEventListener('resize', () => {
            setWidth(window.innerWidth);
        })

        return () => {
            window.removeEventListener('resize', () => {})
        }

    }, [width]);


    const classes = classNames('header', className);

    let content = (
        <>
            <Link to="/">
                <figure>
                    <img src={getir} alt="Getir Logo" className="logo" />
                </figure>
            </Link>

            {width > 1367 ? (
                <>
                    <SearchBox className="search-box" />
                    <div>
                        {items.length > 0 && <BasketSummary />}
                    </div>
                </>
            ) : (
                <div className="flex items-center md:gap-x-5 xl:justify-between">
                    <SearchBox />

                    {items.length > 0 && <BasketSummary />}
                </div>
            )}
        </>
    )

    const renderContent = () => {
        return (
            <div className={`header-wrapper`}>
                {content}
            </div>
        )
    }

    return (
        <>
            <header className={classes}>
                <div className="container">
                    {renderContent()}
                </div>
            </header>


        </>
    );
}

Header.propTypes = propTypes;

export default Header;
