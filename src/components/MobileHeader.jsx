import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import MobileMenu from './MobileMenu';
import MobileSearchBox from './MobileSearchBox';

import { toggleSignupModal } from '../app/appSlice';

import { Icon } from "@iconify/react";

import getir from "../assets/images/getir.svg";

import "./Header.css";


function MobileHeader(props) {

    const { className } = props;

    const [showMobileMenu, setShowMobileMenu] = React.useState(false);
    const [showInput, setShowInput] = React.useState(false);

    const { isSignupModalOpen } = useSelector((state) => state.app);
    const { isAuth } = useSelector(state => state.auth);

    const dispatch = useDispatch();

    const classes = classNames('header', className);

    let hidden = showMobileMenu || showInput;

    React.useEffect(() => {
        document.body.style.overflow = hidden ? "hidden" : "auto";

    }, [hidden]);

    let content = showInput ? <MobileSearchBox showInput={showInput} onClose={() => setShowInput(false)} /> : (
        <div className="flex items-center justify-between px-3">
            {isAuth ? (
                <button onClick={() => setShowMobileMenu(!showMobileMenu)} className="md:hidden">
                    <Icon icon="gg:menu" className="text-primary-light text-2xl" />
                </button>
            ) : (
                <button className="md:hidden" onClick={() => dispatch(toggleSignupModal(!isSignupModalOpen))}>
                    <Icon icon="bx:bxs-user" className="text-2xl text-primary-light" />
                </button>
            )}

            <Link to="/" reloadDocument>
                <figure>
                    <img src={getir} alt="Getir Logo" className="logo" />
                </figure>
            </Link>

            <div className="flex items-center md:gap-x-5 xl:justify-between">
                <MobileSearchBox showInput={showInput} onOpen={() => setShowInput(true)} onClose={() => setShowInput(false)} />
            </div>
        </div>
    )

    return (
        <>
            <header className={classes}>
                <div className="container">
                    <div className={`${showInput ? 'py-3' : 'py-5'} md:py-4 md:px-8`}>
                        {content}
                    </div>
                </div>
            </header>

            {showMobileMenu && <MobileMenu onClose={() => setShowMobileMenu(!showMobileMenu)} />}
        </>
    );
}

export default MobileHeader;
