import React from 'react';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import { Modal, ModalBody, ModalHeader } from '../../components/Modal';

import { Icon } from '@iconify/react';
import { toggleAddInvoiceModal } from '../../app/appSlice';
import AddInvoice from './AddInvoice';

function Invoices() {
    const dispatch = useDispatch();
    const { isAddInvoiceModalOpen } = useSelector(state => state.app);

    return (
        <>
            <Link to="/profile" reloadDocument className="go-back flex md:hidden items-center p-4 md:p-0 bg-white md:bg-gray-background mt-8 md:mt-0 mb-4 md:mb-6">
                <button className="flex items-center justify-center w-6 h-6 border-0 rounded-lg bg-primary-light md:bg-gray-background mr-3 md:mr-2">
                    <Icon icon="akar-icons:chevron-left" className="text-primary text-xs" />
                </button>
                <p className="text-primary font-semibold" style={{ fontSize: '13px' }}>Return to Profile</p>
            </Link>

            <h3 className="text-sm text-black font-semibold hidden md:block mb-4">Invoice Information</h3>

            <div className="bg-white md:border-0 md:rounded-xl px-6 pt-6 pb-2">
                <div className="text-center">
                    <h3 className="text-black font-semibold">There isn’t any invoice information.</h3>
                </div>
                <div className="mt-12">
                    <div className="">
                        <button className="flex items-center py-4" onClick={() => dispatch(toggleAddInvoiceModal(true))}>
                            <div className="flex items-center justify-center w-8 h-8 border-0 rounded-lg bg-primary-light mr-3">
                                <Icon icon="akar-icons:plus" className="text-primary text-base" />
                            </div>
                            <p className="text-sm text-primary font-semibold">Add Invoice Info</p>
                        </button>
                    </div>
                </div>
            </div>

            {isAddInvoiceModalOpen && (
                <Modal center onClose={() => dispatch(toggleAddInvoiceModal(false))} className="add-invoice-modal">
                    <ModalHeader className="py-9 px-4 md:px-8" closeBtn>
                        <h3>Add Invoice Information</h3>
                    </ModalHeader>
                    <ModalBody className="px-4 md:px-8 md:rounded-b-xl">
                        <AddInvoice />
                    </ModalBody>
                </Modal>
            )}
        </>
    );
}

export default Invoices;
