import { Icon } from '@iconify/react';
import React from 'react';
import { Link } from 'react-router-dom';

function AllPaymentMethods() {

    return (
        <div>
            <Link to="/profile" reloadDocument className="go-back flex md:hidden items-center p-4 md:p-0 bg-white md:bg-gray-background mt-8 md:mt-0 mb-4">
                <button className="flex items-center justify-center w-6 h-6 border-0 rounded-lg bg-primary-light md:bg-gray-background mr-3 md:mr-2">
                    <Icon icon="akar-icons:chevron-left" className="text-primary" style={{ fontSize: '12px' }} />
                </button>
                <p className="text-primary font-semibold" style={{ fontSize: '13px' }}>Return to Profile</p>
            </Link>

            <h3 className="text-sm text-black font-semibold hidden md:block mb-4">My Payment Methods</h3>

            <div className="bg-white px-6 pt-6 pb-2 md:border-0 md:rounded-xl">
                <div className="">
                    <Link to="/profile/payment-methods/add-payment-method" className="flex items-center py-4 border-b border-primary-light">
                        <button className="flex items-center justify-center w-8 h-8 border-0 rounded-lg bg-primary-light mr-3">
                            <Icon icon="akar-icons:plus" className="text-primary" style={{ fontSize: '16px' }} />
                        </button>
                        <p className="text-sm text-primary font-semibold">Add Credit/Debit Card</p>
                    </Link>
                    <div className="flex items-center py-4 border-primary-light">
                        <button className="flex items-center justify-center w-8 h-8 border-0 rounded-lg bg-primary-light mr-3">
                            <Icon icon="akar-icons:plus" className="text-primary" style={{ fontSize: '16px' }} />
                        </button>
                        <p className="text-sm text-primary font-semibold">Add Card with BKM Express</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AllPaymentMethods;
