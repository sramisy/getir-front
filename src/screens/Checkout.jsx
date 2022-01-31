import React from 'react';

import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

import { Icon } from '@iconify/react';

import getir from '../assets/images/getir.svg';

import houseIcon from '../assets/images/House.svg';
import plazaIcon from '../assets/images/Plaza.svg';
import parkIcon from '../assets/images/Park.svg';

import masterpass from '../assets/images/masterpass.svg'

import {
    toggleLanguageModal,
    toggleAddPaymentModal,
    toggleInvoicesModal,
    toggleAddInvoiceModal,
    togglePromosModal,
    togglePromoDetailsModal,
    toggleAddPromoCodeModal,
} from "../app/appSlice";

import AddressSwitch from '../components/AddressSwitch';
import Checkbox from '../components/form/Checkbox';
import { Modal, ModalBody, ModalHeader, ModalFooter } from '../components/Modal';
import LanguageChangeForm from '../components/LanguageChangeForm';

import Dinero from 'dinero.js';
import AddPaymentModal from '../components/AddPaymentModal';
import InvoicesModal from '../components/InvoicesModal';
import AddInvoice from './Profile/AddInvoice';
import PromosModal from '../components/PromosModal';
import PromoDetails from '../components/PromoDetails';
import { Button } from '../components/Buttons';
import AddPromoCode from '../components/AddPromoCode';

function Checkout() {
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const [width, setWidth] = React.useState(window.innerWidth);
    const { user } = useSelector(state => state.auth);
    const { total } = useSelector(state => state.basket);
    const { language,
        isLanguageModalOpen,
        isAddPaymentModalOpen,
        isInvoicesModalOpen,
        isAddInvoiceModalOpen,
        isPromosModalOpen,
        isPromoDetailsModalOpen,
        isAddPromoCodeModalOpen,
    } = useSelector(state => state.app);

    let hidden = isLanguageModalOpen || isAddPaymentModalOpen ||
        isInvoicesModalOpen || isAddInvoiceModalOpen || isPromosModalOpen ||
        isPromoDetailsModalOpen || isAddPromoCodeModalOpen;

    const currentAddress = user?.addresses.find(address => address.active);

    const icons = new Map([
        ['home', houseIcon],
        ['business', plazaIcon],
        ['other', parkIcon],
    ]);

    React.useEffect(() => {
        window.addEventListener('resize', () => {
            setWidth(window.innerWidth);
        });

        return () => {
            window.removeEventListener('resize', () => { });

        }

    }, [width]);

    React.useEffect(() => {
        document.body.style.overflow = hidden ? 'hidden' : 'auto';
    }, [hidden])

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

            <div className="container-2">
                <div className="md:flex md:px-8 xl:px-0 md:py-12 md:gap-x-4">
                    <div className="md:w-4/6 mt-5 md:mt-0">
                        <div>
                            <h4 className="text-sm text-black font-semibold ml-4 md:ml-0 mb-4">Address</h4>

                            <div className="flex items-start bg-white px-4 md:px-5 pt-6 pb-5 py-6 border-t border-b border-primary-light md:border-0 md:rounded-lg">
                                <div>
                                    <Icon icon="carbon:location-filled" className="text-primary text-2xl mr-3" />
                                </div>

                                <div>
                                    <p className="text-sm text-black font-semibold">{currentAddress.title}</p>
                                    <p className="text-sm text-gray-storm opacity-80">{currentAddress.street}</p>
                                </div>
                            </div>
                        </div>

                        <div className="add-note mt-8">
                            <h4 className="text-sm text-black font-semibold ml-4 md:ml-0 mb-4">Add Note</h4>

                            <div className="bg-white px-4 py-6 md:p-6 md:pr-14 border-t border-b border-primary-light md:border-0 md:rounded-lg">
                                <textarea className="w-full p-4 text-gray-storm border border-input-border rounded-md text-sm focus:outline-none focus:border-primary" rows="3" placeholder="You can add delivery note here."></textarea>

                                <div className="hr h-px w-full bg-primary-light my-5 md:hidden"></div>

                                <div className="flex items-center md:mt-6">
                                    <Checkbox id="notRingBell" />
                                    <label htmlFor="notRingBell" className="ml-3 text-sm text-gray-storm opacity-80">Don’t Ring Bell</label>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <h4 className="text-sm text-black font-semibold ml-4 md:ml-0 mb-4">Payment Methods</h4>

                            <div className="bg-white px-4 py-6 md:p-6 border-t border-b border-primary-light md:border-0 md:rounded-lg">
                                {/* <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="mr-4">
                                        <input type="radio" />
                                    </div>
                                    <div className="flex items-center">
                                        <div className="flex items-center justify-center w-10 h-8 bg-white border-0 rounded-lg mr-3" style={{ boxShadow: 'var(--shadow-s) var(--shadow-color-primary)' }}>
                                            <figure>
                                                <img src={visaLogo} alt="Visa Logo" />
                                            </figure>
                                        </div>

                                        <div>
                                            <p className="text-sm text-black font-semibold">Ramis S</p>
                                            <p className="text-sm text-gray-storm font-semibold">418249********41</p>
                                        </div>
                                    </div>
                                </div>

                                <button className="border border-primary rounded-lg text-sm text-primary font-semibold px-4 py-2">Change</button>
                            </div> */}

                                <div>
                                    <button className="flex items-center py-5 border-b border-primary-light" onClick={() => dispatch(toggleAddPaymentModal(true))}>
                                        <div className="flex items-center justify-center w-8 h-8 border-0 rounded-lg bg-primary-light mr-3">
                                            <Icon icon="akar-icons:plus" className="text-primary text-base" />
                                        </div>
                                        <p className="text-sm text-primary font-semibold">Add Credit/Debit Card</p>
                                    </button>
                                    <button className="flex items-center py-5 border-b border-primary-light">
                                        <div className="flex items-center justify-center w-8 h-8 border-0 rounded-lg bg-primary-light mr-3">
                                            <Icon icon="akar-icons:plus" className="text-primary text-base" />
                                        </div>
                                        <p className="text-sm text-primary font-semibold">Add Card with BKM Express</p>
                                    </button>
                                </div>

                                <div className="flex justify-between mt-6 md:mt-8">
                                    <p className="text-xs text-gray-storm">Your card info is safely kept by MasterPass</p>

                                    <figure>
                                        <img src={masterpass} alt="MasterPass" />
                                    </figure>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="md:w-2/6 mt-8 md:mt-0">
                        <div className="mt-8 md:mt-0">
                            <h4 className="text-sm text-black font-semibold ml-4 md:ml-0 mb-4">Payment Summary</h4>

                            <div className="bg-white border-0 md:rounded-lg p-4 pb-6 md:p-6">
                                <button
                                    className="select-campaign flex items-center justify-between w-full"
                                    onClick={() => dispatch(togglePromosModal(true))}
                                >
                                    <div className="flex items-center">
                                        <Icon icon="ant-design:gift-filled" className="text-primary mr-3" style={{ fontSize: '32px' }} />
                                        <p className="text-sm text-primary font-semibold truncate">Choose Campaign</p>
                                    </div>
                                    <Icon icon="akar-icons:chevron-right" className="text-primary text-base" />
                                </button>

                                <div className="hr h-px w-full bg-primary-light my-4 mb-5 md:my-4"></div>

                                <button className="flex items-center justify-between w-full" onClick={() => dispatch(toggleInvoicesModal(true))}>
                                    <div className="flex items-center">
                                        <div className="flex items-center justify-center w-8 h-8 border-0 rounded-lg bg-primary-light mr-3">
                                            <Icon icon="akar-icons:plus" className="text-primary text-base" />
                                        </div>
                                        <p className="text-sm text-primary font-semibold">Add Invoice Info</p>
                                    </div>

                                    <Icon icon="akar-icons:chevron-right" className="text-primary text-base" />
                                </button>

                                <ul className="mt-4">
                                    <li className="flex items-center justify-between border-t border-b border-primary-light py-4">
                                        <span className="text-sm text-gray-mid font-semibold">Total</span>
                                        <span className="text-sm text-gray-storm font-semibold">
                                            {`₺${Dinero({ amount: total }).toFormat('0,0.00')}`}
                                        </span>
                                    </li>
                                    <li className="flex items-center justify-between border-b border-primary-light py-4">
                                        <span className="text-sm text-gray-mid font-semibold">Delivery</span>
                                        <span className="text-sm text-gray-storm font-semibold">
                                            {`₺${Dinero({ amount: 499 }).toFormat('0,0.00')}`}
                                        </span>
                                    </li>
                                    <li className="flex items-center justify-between border-b border-primary-light py-4">
                                        <span className="text-sm text-gray-mid font-semibold">Bag Fee (1)</span>
                                        <span className="text-sm text-gray-storm font-semibold">
                                            {`₺${Dinero({ amount: 25 }).toFormat('0,0.00')}`}
                                        </span>
                                    </li>
                                    <li className="flex items-center justify-between pt-4">
                                        <span className="text-sm text-primary font-semibold">Charge Amount</span>
                                        <span className="text-sm text-primary font-semibold">
                                            {`₺${Dinero({ amount: total }).subtract(Dinero({ amount: 524 })).toFormat('0,0.00')}`}
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="p-4 pb-10 md:px-6 md:py-4 md:pr-14 bg-white mt-8 md:my-6 border-t border-b border-primary-light md:border-0 md:rounded-lg">
                            <div className="flex items-start">
                                <Checkbox id="terms" />
                                <label htmlFor="terms" className="text-sm text-gray-storm ml-3">
                                    I read and accept {' '}
                                    <a className="text-sm text-primary">
                                        Pre-Disclosure Form and Distance Sales Agreement.
                                    </a>
                                </label>
                            </div>
                        </div>

                        <div className="p-4 md:p-0 mt-8 md:mt-0">
                            <div className="flex items-center border-2 border-primary rounded-lg">
                                <button className="bg-primary text-sm text-white font-semibold py-3 w-full">
                                    Order
                                </button>
                                <div className="bg-white px-6 md:hidden">
                                    <span className="text-sm text-primary font-semibold">
                                        {`₺${Dinero({ amount: total }).subtract(Dinero({ amount: 524 })).toFormat('0,0.00')}`}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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

            {isAddPaymentModalOpen && <AddPaymentModal />}
            {isInvoicesModalOpen && <InvoicesModal />}
            {isAddInvoiceModalOpen && (
                <Modal center onClose={() => dispatch(toggleAddInvoiceModal(false))} className="add-invoice-modal">
                    <ModalHeader className="py-9 px-4 md:px-8" closeBtn backBtn onBack={() => {
                        dispatch(toggleAddInvoiceModal(false));
                        dispatch(toggleInvoicesModal(true));
                    }}>
                        <h3>Add Invoice Information</h3>
                    </ModalHeader>
                    <ModalBody className="px-4 md:px-8 md:rounded-b-xl">
                        <AddInvoice />
                    </ModalBody>
                </Modal>
            )}

            {isPromosModalOpen && <PromosModal />}
            {isPromoDetailsModalOpen && (
                <Modal center onClose={() => dispatch(togglePromoDetailsModal(false))} className="promo-details-modal">
                    <ModalHeader className="py-9 px-4 md:px-8" closeBtn backBtn onBack={() => {
                        dispatch(togglePromoDetailsModal(false));
                        dispatch(togglePromosModal(true));
                    }}>
                        <h3>Promotion Detail</h3>
                    </ModalHeader>
                    <ModalBody className="px-4 md:px-8">
                        <PromoDetails />
                    </ModalBody>
                    <ModalFooter className="mt-12 mb-4 md:mb-8 px-4 md:px-8">
                        <Button kind="primary" size="medium" disabled>Select</Button>
                    </ModalFooter>
                </Modal>
            )}

            {isAddPromoCodeModalOpen && (
                <Modal center onClose={() => dispatch(toggleAddPromoCodeModal(false))} className="add-promo-code-modal">
                    <ModalHeader className="py-9 px-4 md:px-8" closeBtn backBtn onBack={() => { 
                        dispatch(toggleAddPromoCodeModal(false));
                        dispatch(togglePromosModal(true));
                    }}>
                        <h3>Add Promo Code</h3>
                    </ModalHeader>
                    <ModalBody className="px-4 md:px-8 rounded-b-xl">
                        <AddPromoCode />
                    </ModalBody>
                </Modal>
            )}
        </>
    );
}

export default Checkout;
