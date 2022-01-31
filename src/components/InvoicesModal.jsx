import React from 'react';

import { useDispatch } from 'react-redux';

import { toggleAddInvoiceModal, toggleInvoicesModal } from '../app/appSlice';
import { Modal, ModalBody, ModalFooter, ModalHeader } from './Modal';

function InvoicesModal() {
    const dispatch = useDispatch();

    return (
        <Modal center onClose={() => dispatch(toggleInvoicesModal(false))} className="invoices-modal">
            <ModalHeader closeBtn className="py-9 px-4 md:px-8">
                <h3>Add Invoice Info</h3>
            </ModalHeader>
            <ModalBody className="px-4 md:px-8 rounded-b-xl">
                <button className="w-full py-3 bg-primary-light text-sm text-primary border-0 rounded-lg">
                    I want standard e-Archive invoice
                </button>

                <p className="text-sm text-gray-storm text-center my-10">
                    There isn’t any invoice information.
                </p>
            </ModalBody>
            <ModalFooter className="px-4 md:px-8">
                <div className="flex flex-col gap-y-4 mb-8">
                    <button className="text-sm text-white font-semibold bg-gray border-0 rounded-lg py-3 w-full">Select</button>
                    <button
                        className="text-sm text-primary font-semibold bg-primary-light border-0 rounded-lg py-3 w-full"
                        onClick={() => {
                            dispatch(toggleAddInvoiceModal(true));
                            dispatch(toggleInvoicesModal(false));
                        }}>
                        Add Invoice Info
                    </button>
                </div>
            </ModalFooter>
        </Modal>
    );
}

export default InvoicesModal;

