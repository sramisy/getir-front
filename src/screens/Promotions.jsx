import React from 'react';

import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { Icon } from '@iconify/react';

import promo from '../assets/images/promotion-1.jpeg';
import Navbar from '../components/Navbar';
import MobileHeader from '../components/MobileHeader';
import Header from '../components/Header';
import AddressSwitch from '../components/AddressSwitch';
import Footer from '../components/Footer';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../components/Modal';
import { toggleAddPromoCodeModal, togglePromoDetailsModal } from '../app/appSlice';
import AddPromoCode from '../components/AddPromoCode';
import { useSelector } from 'react-redux';
import PromoDetails from '../components/PromoDetails';
import { Button } from '../components/Buttons';

function Promotions() {
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const { isAddPromoCodeModalOpen, isPromoDetailsModalOpen } = useSelector(state => state.app);
    const { user } = useSelector(state => state.auth);

    const currentAddress = user?.addresses.find(address => address.active);

    const [showMobileHeader, setShowMobileHeader] = React.useState(false);
    const [width, setWidth] = React.useState(window.innerWidth);

    React.useEffect(() => {
        window.addEventListener('resize', () => {
            setWidth(window.innerWidth);
        })

        if (width < 768) {
            setShowMobileHeader(true);

        } else {
            setShowMobileHeader(false);

        }

    }, [width]);

    React.useEffect(() => {
        document.body.style.overflow = isAddPromoCodeModalOpen ? 'hidden' : 'auto';

        return () => {
            document.body.style.overflow = 'auto';
        }

    }, [isAddPromoCodeModalOpen]);

    React.useEffect(() => {
        (!currentAddress || !currentAddress?.available) && navigate('/');

    }, [currentAddress, navigate]);


    return (
        <>
            <div className="md:sticky top-0 md:z-50">
                <Navbar />

                {showMobileHeader ? <MobileHeader /> : <Header />}
            </div>

            <AddressSwitch />

            <div className="container">
                <div className="md:flex md:p-8 xl:px-0 md:gap-x-4 xl:gap-x-6">
                    <div className="md:w-80 md:flex-none">
                        <div className="flex md:flex-col mt-3 md:mt-0 border-0 rounded-lg">
                            <button className="bg-primary-light text-primary font-semibold w-full py-4 md:border-0 md:rounded-t-lg" style={{ fontSize: '13px' }}>
                                Promotions
                            </button>
                            <button className="bg-white text-gray-storm font-semibold w-full py-4 md:border-0 md:rounded-b-lg" style={{ fontSize: '13px' }}>
                                Annotations
                            </button>
                        </div>

                        {width < 768 ? (
                            <button
                                className="add-promo-code flex items-center py-4 px-6 bg-white mt-4 w-full"
                                onClick={() => dispatch(toggleAddPromoCodeModal(true))}
                            >
                                <div className="flex items-center justify-center w-8 h-8 border-0 rounded-lg bg-primary-light mr-3">
                                    <Icon icon="akar-icons:plus" className="text-primary text-base" />
                                </div>
                                <p className="text-primary font-semibold" style={{ fontSize: '13px' }}>Add Promotion Code</p>
                            </button>
                        ) : (
                            <div className="p-6 bg-white border-0 rounded-lg mt-8">
                                <h3 className="text-sm text-gray-mid font-semibold">Add Promotion Code</h3>

                                <div className="mt-4">
                                    <form>
                                        <input type="text" className="w-full p-4 border-2 border-input-border rounded-md text-sm text-black focus:outline-none focus:border-primary" name="promoCode" placeholder="Promo Code" />

                                        <button className="w-full bg-primary text-sm text-white font-semibold py-3 border-0 rounded-lg mt-5">Approve</button>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mt-6 md:mt-0 mb-44 md:w-full">
                        <div className="px-4 md:px-0">
                            <h3 className="md:text-xl text-black font-semibold mb-4">Promotions</h3>

                            <div className="input-group has-left-icon">
                                <input type="text" name="promoQuery" id="promoQuery" className="pl-14 pr-3 w-full border-2 rounded-md border-input-border focus:outline-none focus:border-primary text-sm" placeholder="Search Promotions" style={{ paddingTop: '14px', paddingBottom: '14px' }} />
                                <Icon icon="carbon:search" className="text-gray-storm text-2xl absolute left-4" style={{ top: '14px' }} />
                            </div>
                        </div>

                        {/* 
                            <div className="mt-8">
                                <figure>
                                    <img src={promoIcon} alt="Empty Promotions" className="mx-auto" />
                                </figure>

                                <p className="text-sm text-gray-mid text-center mt-6">Unfortunately promotions is not currently available</p>
                            </div> 
                        */}

                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-y-8 md:gap-y-4 xl:gap-x-5 px-4 md:px-0 mt-6">
                            <article className="p-4 pb-6 md:p-6 bg-white border-0 rounded-xl cursor-pointer" onClick={() => dispatch(togglePromoDetailsModal(true))}>
                                <figure>
                                    <img src={promo} alt="Promotion 1" className="w-full border-0 rounded-lg xl:h-44 object-cover" />
                                </figure>
                                <div className="mt-4 md:mt-6 flex justify-between gap-x-2">
                                    <div>
                                        <h3 className="text-primary font-semibold">Get 2 fresh Turkish bagels for free!</h3>
                                        <p className="text-xs text-gray-mid mt-1 md:mt-2 mr-5">To use the promo you must add Turkish bagel to your basket</p>
                                    </div>

                                    <button className="w-9 h-9 md:w-12 md:h-12 border-0 rounded-lg flex flex-none items-center justify-center" style={{ boxShadow: 'var(--shadow-s) var(--shadow-color-primary)' }}>
                                        <Icon icon="akar-icons:chevron-right" className="text-primary text-base md:text-2xl" />
                                    </button>
                                </div>
                            </article>

                            <article className="p-4 pb-6 md:p-6 bg-white border-0 rounded-xl cursor-pointer" onClick={() => dispatch(togglePromoDetailsModal(true))}>
                                <figure>
                                    <img src={promo} alt="Promotion 1" className="w-full border-0 rounded-lg xl:h-44 object-cover" />
                                </figure>
                                <div className="mt-4 md:mt-6 flex justify-between gap-x-2">
                                    <div>
                                        <h3 className="text-primary font-semibold">Get 2 fresh Turkish bagels for free!</h3>
                                        <p className="text-xs text-gray-mid mt-1 md:mt-2 mr-5">
                                            To use the promo you must add Turkish bagel to your basket
                                        </p>
                                    </div>

                                    <button className="w-9 md:w-12 h-9 md:h-12 border-0 rounded-lg flex flex-none items-center justify-center" style={{ boxShadow: 'var(--shadow-s) var(--shadow-color-primary)' }}>
                                        <Icon icon="akar-icons:chevron-right" className="text-primary text-base md:text-2xl" />
                                    </button>
                                </div>
                            </article>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />

            {isAddPromoCodeModalOpen && (
                <Modal center onClose={() => dispatch(toggleAddPromoCodeModal(false))} className="add-promo-code-modal">
                    <ModalHeader className="py-9 px-4 md:px-8" closeBtn backBtn onBack={() => {
                        dispatch(toggleAddPromoCodeModal(false));
                    }}>
                        <h3>Add Promo Code</h3>
                    </ModalHeader>
                    <ModalBody className="px-4 md:px-8 rounded-b-xl">
                        <AddPromoCode />
                    </ModalBody>
                </Modal>
            )}

            {isPromoDetailsModalOpen && (
                <Modal center onClose={() => dispatch(togglePromoDetailsModal(false))} className="promo-details-modal">
                    <ModalHeader className="py-9 px-4 md:px-8" closeBtn>
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
        </>
    );
}

export default Promotions;
