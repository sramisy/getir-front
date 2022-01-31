import React from 'react';
import { Link } from 'react-router-dom';

import { Icon } from '@iconify/react';

function Orders() {

    return (
        <>
            <Link to="/profile" reloadDocument className="go-back flex md:hidden items-center p-4 md:p-0 bg-white md:bg-gray-background mt-8 md:mt-0 mb-4">
                <button className="flex items-center justify-center w-6 h-6 border-0 rounded-lg bg-primary-light md:bg-gray-background mr-3 md:mr-2">
                    <Icon icon="akar-icons:chevron-left" className="text-primary" style={{ fontSize: '12px' }} />
                </button>
                <p className="text-primary font-semibold" style={{ fontSize: '13px' }}>Return to Profile</p>
            </Link>

            <h3 className="text-sm text-black font-semibold hidden md:block mb-4">Previous Orders</h3>

            <div className="bg-white md:border-0 md:rounded-xl">
                <div className="px-8 py-10 text-center">
                    <h3 className="text-black font-semibold">You haven’t placed an order yet</h3>
                    <p className="text-sm text-gray-storm mt-3">You can view all of your previous orders here.</p>
                </div>
            </div>
        </>
    );
}

export default Orders;
