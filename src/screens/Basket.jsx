import React from 'react';

import { useNavigate, Link } from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux';

import { Icon } from '@iconify/react';

import getir from '../assets/images/getir.svg';

import houseIcon from '../assets/images/House.svg';
import plazaIcon from '../assets/images/Plaza.svg';
import parkIcon from '../assets/images/Park.svg';

import AddressSwitch from '../components/AddressSwitch';

import Dinero from 'dinero.js';
import BasketActions from '../basket/BasketActions';

import { toggleLanguageModal } from "../app/appSlice";
import { clearBasket } from '../basket/basketSlice';
import { Modal, ModalBody, ModalHeader } from '../components/Modal';
import LanguageChangeForm from '../components/LanguageChangeForm';

const Basket = () => {

    let navigate = useNavigate();
    const dispatch = useDispatch();

    const [width, setWidth] = React.useState(window.innerWidth);
    const { isAuth, user } = useSelector(state => state.auth);
    const { items, total } = useSelector(state => state.basket);
    const { language, isLanguageModalOpen } = useSelector(state => state.app);

    const currentAddress = user?.addresses.find(address => address.active);

    const icons = new Map([
        ['home', houseIcon],
        ['business', plazaIcon],
        ['other', parkIcon],
    ]);

    const handleClick = async () => {

        try {
            await dispatch(clearBasket()).unwrap();
            window.location.pathname = "/categories";

        } catch (err) {
            console.log(err);

        }
    }

    React.useEffect(() => {
        items.length === 0 && (window.location.pathname = "/categories");

    }, [items]);

    React.useEffect(() => {
        !isAuth && navigate('/');

    }, [isAuth, navigate]);

    React.useEffect(() => {
        window.addEventListener('resize', () => {
            setWidth(window.innerWidth);
        });

        return () => {
            window.removeEventListener('resize', () => { });
        }

    }, [width]);

    return (
        <>
            <div className="bg-primary-background">
                <div className="container-2">
                    <div className="flex items-center justify-between px-2 md:px-8 xl:px-0 py-5 md:py-4">
                        {width < 768 && (
                            <button onClick={() => navigate(-1)}>
                                <Icon icon="akar-icons:chevron-left" className="text-primary-light text-2xl" />
                            </button>
                        )}

                        <a href="/">
                            <figure>
                                <img src={getir} alt="Getir Logo" className="logo" />
                            </figure>
                        </a>

                        {width > 767 ? (
                            <div className="flex flex-none items-center bg-brand-yellow border-0 rounded-lg">
                                <button className="flex flex-none items-center h-full gap-x-2 py-3 px-3 border-0 rounded-l-2xl bg-white" style={{ borderTopRightRadius: '3rem', borderBottomRightRadius: '3rem' }}>
                                    <figure>
                                        <img src={icons.get(currentAddress.icon)} alt={`${currentAddress.icon} icon`} style={{ height: '18px' }} />
                                    </figure>
                                    <span className="text-sm text-black font-semibold">{currentAddress.title}</span>
                                    <Icon icon="akar-icons:chevron-right" className="text-primary" style={{ fontSize: '16px' }} />
                                </button>
                                <div className="px-3">
                                    <span className="text-sm text-primary font-semibold">{currentAddress.eta}</span>
                                </div>
                            </div>
                        ) : (<div></div>)}
                    </div>
                </div>
            </div>

            {width < 768 && <AddressSwitch disabled />}

            <main className="md:mb-8" style={{ minHeight: 'calc(100vh - 204px )' }}>
                <div className="container-2">
                    <div className="md:flex md:gap-x-6 md:px-8 xl:px-0 md:pt-16">
                        <div className="basket-details md:w-2/3">
                            <div className="flex items-center justify-between px-4 md:px-0 mt-6 md:mt-0 mb-4">
                                <h4 className="text-sm text-black font-semibold">My Basket</h4>
                                <button className="flex items-center text-primary font-semibold" style={{ fontSize: '13px' }} onClick={handleClick}>
                                    <Icon icon="lucide:trash-2" className="text-primary text-2xl mr-2" />
                                    Clear Basket
                                </button>
                            </div>

                            <div className="bg-white px-6 border-0 md:rounded-lg">
                                {items?.map((item, index) => (
                                    <article key={item.id} className={`flex items-center justify-between py-6 ${(items.length - 1) !== index && 'border-b border-primary-light'}`}>
                                        <div className="flex items-center">
                                            <figure>
                                                <img src={item.images[0]} alt={item.title} className="w-16 border rounded-lg border-input-border" />
                                            </figure>
                                            <div className="ml-4">
                                                {item.price.old && (
                                                    <span className="text-sm text-gray-storm line-through mr-3">
                                                        {`₺${Dinero({ amount: item.price.old }).toFormat('0,0.00')}`}
                                                    </span>
                                                )}
                                                <span className="text-primary font-semibold" style={{ fontSize: '15px' }}>
                                                    {`₺${Dinero({ amount: item.price.current }).toFormat('0,0.00')}`}
                                                </span>
                                                <p className="text-sm text-gray-dark mt-2">{item.title}</p>
                                                <p className="text-gray-storm mt-1" style={{ fontSize: '13px' }}>{item.measure}</p>
                                            </div>
                                        </div>

                                        <BasketActions orientation="vertical" product={item} className="flex-col md:flex-row-reverse" />
                                    </article>
                                ))}
                            </div>
                        </div>

                        <div className="right-panel mt-36 md:mt-0 mb-4 md:mb-0 md:w-1/3">
                            <div className=" sticky top-4">
                                <h4 className="text-sm text-black font-semibold ml-4 md:ml-0 mb-4">Address</h4>

                                <div className="flex items-center bg-white p-4 border-t border-b border-primary-light md:border-0 md:rounded-lg">
                                    <Icon icon="feather:map-pin" className="text-primary text-2xl mr-3 flex-none" />
                                    <p className="text-sm text-gray-dark">{currentAddress.street}</p>
                                </div>

                                {width > 767 && (
                                    <>
                                        <h4 className="text-sm text-black font-semibold ml-4 md:ml-0 mb-4 mt-8">Basket Subtotal</h4>

                                        <div className="flex items-center justify-between bg-white p-6 border-t border-b border-primary-light md:border-0 md:rounded-lg">
                                            <span className="text-sm text-gray-dark font-semibold">Basket Total</span>
                                            <span className="text-sm text-gray-storm font-semibold">{`₺${Dinero({ amount: total }).toFormat('0,0.00')}`}</span>
                                        </div>
                                    </>
                                )}

                                <div className="p-4 mt-4 md:mt-6 md:p-0">
                                    <div className="flex items-center border-2 border-primary rounded-lg">
                                        <Link to="/checkout" reloadDocument className="bg-primary text-sm text-white text-center font-semibold py-3 w-full">
                                            Go to Checkout
                                        </Link>
                                        <div className="bg-white px-8 md:hidden">
                                            <span className="text-sm text-primary font-semibold">
                                                {`₺${Dinero({ amount: total }).toFormat('0,0.00')}`}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {width > 767 && (
                <footer>
                    <div className="bg-white md:px-6 md:py-7">
                        <div className="container-2">
                            <div className="md:flex justify-between items-center text-center mt-16 md:mt-0">
                                <div className="flex flex-col md:flex-row">
                                    <span className="text-gray-mid md:mr-6" style={{ fontSize: '13px' }}>2021 Getir &copy;</span>
                                    <a className="text-primary mt-3 md:mt-0" style={{ fontSize: '13px' }}>Information Society Services</a>
                                </div>

                                <div className="flex justify-center items-center mt-3 md:mt-0">
                                    <ul className="social-links hidden md:flex gap-x-5 mr-6">
                                        <li className="social-link">
                                            <a>
                                                <Icon icon="akar-icons:facebook-fill" className="text-gray-storm" style={{ fontSize: '20px' }} />
                                            </a>
                                        </li>
                                        <li className="social-link">
                                            <a>
                                                <Icon icon="akar-icons:twitter-fill" className="text-gray-storm" style={{ fontSize: '20px' }} />
                                            </a>
                                        </li>
                                        <li className="social-link">
                                            <a>
                                                <Icon icon="akar-icons:instagram-fill" className="text-gray-storm" style={{ fontSize: '20px' }} />
                                            </a>
                                        </li>
                                    </ul>

                                    <button onClick={() => dispatch(toggleLanguageModal(true))} className="flex items-center text-gray-storm p-2 border border-input-border rounded-lg hover:bg-primary-light hover:text-primary group" style={{ fontSize: '13px' }}>
                                        <Icon icon="codicon:globe" className="mr-2 text-base group-hover:text-primary" />
                                        {language.fullName} <span className="uppercase text-sm font-medium ml-1 group-hover:text-primary">({language.shortName})</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </footer>
            )}

            {isLanguageModalOpen && (
                <Modal center onClose={() => dispatch(toggleLanguageModal(false))} className="languages-modal">
                    <ModalHeader className="px-4 pt-6 pb-8 md:px-8" closeBtn>
                        <h3>Choose a Language</h3>
                    </ModalHeader>
                    <ModalBody className="md:rounded-b-xl">
                        <LanguageChangeForm />
                    </ModalBody>
                </Modal>
            )}
        </>
    )
}

export default Basket;