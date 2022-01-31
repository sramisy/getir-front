import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { togglePromoDetailsModal, togglePromosModal, toggleAddPromoCodeModal } from '../app/appSlice';

import { Icon } from '@iconify/react';

import { Modal, ModalBody, ModalFooter, ModalHeader } from './Modal';

function PromosModal() {
    const dispatch = useDispatch();

    const handlePromoClick = () => {
        dispatch(togglePromoDetailsModal(true));
        dispatch(togglePromosModal(false));
    }

    return (
        <Modal center onClose={() => dispatch(togglePromosModal(false))} className="promos-modal">
            <ModalHeader closeBtn className="py-9 px-4 md:px-8">
                <h3>Select Promotion</h3>
            </ModalHeader>
            <ModalBody className="px-4 md:px-8">
                <div>
                    <div className="input-group has-left-icon">
                        <input type="text" name="promoCode" id="promoCode" className="w-full py-4 pr-3 border border-input-border rounded-lg text-sm text-gray-dark focus:outline-none focus:border-primary placeholder-primary" style={{ paddingLeft: '60px' }} placeholder="Add Promo Code" />
                        <button
                            className="flex items-center justify-center w-8 h-7 border-0 rounded-md absolute left-4 bg-primary-light"
                            style={{ top: '14px' }}
                            onClick={() => {
                                dispatch(toggleAddPromoCodeModal(true));
                                dispatch(togglePromosModal(false));
                            }}
                        >
                            <Icon icon="fluent:add-16-filled" className="text-primary text-lg" />
                        </button>
                    </div>

                    <form className="mt-6">
                        <div className="flex items-center justify-between py-4 border-t border-b border-input-border">
                            <div className="flex items-center">
                                <div className="mr-4">
                                    <input type="radio" name="selectPromo" id="promo1" className="w-5 h-5" style={{ accentColor: 'var(--color-primary)' }} />
                                </div>
                                <p className="text-sm text-primary font-semibold">Get 30 TL discount on your first <br />Getir order!</p>
                            </div>
                            <button
                                className="flex items-center justify-center w-8 h-8 border-0 rounded-lg"
                                style={{ boxShadow: 'var(--shadow-s) var(--shadow-color-primary)' }}
                                onClick={handlePromoClick}
                            >
                                <Icon icon="ant-design:info-circle-outlined" className="text-primary text-base" />
                            </button>
                        </div>
                        <div className="flex items-center justify-between py-4 border-b border-input-border">
                            <div className="flex items-center">
                                <div className="mr-4">
                                    <input type="radio" name="selectPromo" id="promo2" className="w-5 h-5" style={{ accentColor: 'var(--color-primary)' }} />
                                </div>
                                <p className="text-sm text-primary font-semibold">20 TL discount special for you!</p>
                            </div>
                            <button
                                className="flex items-center justify-center w-8 h-8 border-0 rounded-lg"
                                style={{ boxShadow: 'var(--shadow-s) var(--shadow-color-primary)' }}
                                onClick={handlePromoClick}
                            >
                                <Icon icon="ant-design:info-circle-outlined" className="text-primary text-base" />
                            </button>
                        </div>
                        <div className="flex items-center justify-between py-4 border-b border-input-border">
                            <div className="flex items-center">
                                <div className="mr-4">
                                    <input type="radio" name="selectPromo" id="promo3" className="w-5 h-5" style={{ accentColor: 'var(--color-primary)' }} />
                                </div>
                                <p className="text-sm text-primary font-semibold">20 TL discount special for you!</p>
                            </div>
                            <button
                                className="flex items-center justify-center w-8 h-8 border-0 rounded-lg"
                                style={{ boxShadow: 'var(--shadow-s) var(--shadow-color-primary)' }}
                                onClick={handlePromoClick}
                            >
                                <Icon icon="ant-design:info-circle-outlined" className="text-primary text-base" />
                            </button>
                        </div>
                        <div className="flex items-center justify-between py-4 border-b border-input-border">
                            <div className="flex items-center">
                                <div className="mr-4">
                                    <input type="radio" name="selectPromo" id="promo4" className="w-5 h-5" style={{ accentColor: 'var(--color-primary)' }} />
                                </div>
                                <p className="text-sm text-primary font-semibold">20 TL discount special for you!</p>
                            </div>
                            <button
                                className="flex items-center justify-center w-8 h-8 border-0 rounded-lg"
                                style={{ boxShadow: 'var(--shadow-s) var(--shadow-color-primary)' }}
                                onClick={handlePromoClick}
                            >
                                <Icon icon="ant-design:info-circle-outlined" className="text-primary text-base" />
                            </button>
                        </div>
                        <div className="flex items-center justify-between py-4 border-b border-input-border">
                            <div className="flex items-center">
                                <div className="mr-4">
                                    <input type="radio" name="selectPromo" id="promo5" className="w-5 h-5" style={{ accentColor: 'var(--color-primary)' }} />
                                </div>
                                <p className="text-sm text-primary font-semibold">20 TL discount special for you!</p>
                            </div>
                            <button
                                className="flex items-center justify-center w-8 h-8 border-0 rounded-lg"
                                style={{ boxShadow: 'var(--shadow-s) var(--shadow-color-primary)' }}
                                onClick={handlePromoClick}
                            >
                                <Icon icon="ant-design:info-circle-outlined" className="text-primary text-base" />
                            </button>
                        </div>
                        <div className="flex items-center justify-between py-4 border-b border-input-border">
                            <div className="flex items-center">
                                <div className="mr-4">
                                    <input type="radio" name="selectPromo" id="promo6" className="w-5 h-5" style={{ accentColor: 'var(--color-primary)' }} />
                                </div>
                                <p className="text-sm text-primary font-semibold">20 TL discount special for you!</p>
                            </div>
                            <button
                                className="flex items-center justify-center w-8 h-8 border-0 rounded-lg"
                                style={{ boxShadow: 'var(--shadow-s) var(--shadow-color-primary)' }}
                                onClick={handlePromoClick}
                            >
                                <Icon icon="ant-design:info-circle-outlined" className="text-primary text-base" />
                            </button>
                        </div>
                        <div className="flex items-center justify-between py-4 border-b border-input-border">
                            <div className="flex items-center">
                                <div className="mr-4">
                                    <input type="radio" name="selectPromo" id="promo7" className="w-5 h-5" style={{ accentColor: 'var(--color-primary)' }} />
                                </div>
                                <p className="text-sm text-primary font-semibold">20 TL discount special for you!</p>
                            </div>
                            <button
                                className="flex items-center justify-center w-8 h-8 border-0 rounded-lg"
                                style={{ boxShadow: 'var(--shadow-s) var(--shadow-color-primary)' }}
                                onClick={handlePromoClick}
                            >
                                <Icon icon="ant-design:info-circle-outlined" className="text-primary text-base" />
                            </button>
                        </div>
                    </form>
                </div>
            </ModalBody>
            <ModalFooter className="mt-12 rounded-b-xl">
                <div className="px-4 md:px-8 mb-4 md:mb-8 flex flex-col gap-y-4">
                    <button className="w-full bg-white border border-input-border rounded-lg py-3 text-sm text-primary font-semibold">Continue Without Promotion</button>
                    <button className="w-full bg-gray rounded-lg py-3 text-sm text-white font-semibold">Select</button>
                </div>
            </ModalFooter>
        </Modal>
    );
}

export default PromosModal;
