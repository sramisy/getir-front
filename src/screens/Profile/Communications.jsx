import React from 'react';
import { Link } from 'react-router-dom';

import { Icon } from '@iconify/react';
import Switch from '../../components/form/Switch';


function Communications() {

    return (
        <>
            <Link to="/profile" reloadDocument className="go-back flex md:hidden items-center p-4 md:p-0 bg-white md:bg-gray-background mt-8 md:mt-0 mb-4">
                <button className="flex items-center justify-center w-6 h-6 border-0 rounded-lg bg-primary-light md:bg-gray-background mr-3 md:mr-2">
                    <Icon icon="akar-icons:chevron-left" className="text-primary" style={{ fontSize: '12px' }} />
                </button>
                <p className="text-primary font-semibold" style={{ fontSize: '13px' }}>Return to Profile</p>
            </Link>

            <h3 className="text-sm text-black font-semibold hidden md:block mb-4">Communication Preferences</h3>

            <div className="bg-white md:border-0 md:rounded-xl">
                <div className="py-6 md:pt-8 px-4 md:px-6">
                    <ul>
                        <li className="flex gap-x-4 items-center justify-between pb-4 border-b border-input-border">
                            <div>
                                <p className="text-xs text-black font-semibold">Email</p>
                                <p className="text-xs text-gray-storm mt-2">I want to receive e-mails regarding promotions.</p>
                            </div>

                            <div>
                                <Switch checked />
                            </div>
                        </li>
                        <li className="flex gap-x-4 items-center justify-between py-4 border-b border-input-border">
                            <div>
                                <p className="text-xs text-black font-semibold">Notifications</p>
                                <p className="text-xs text-gray-storm mt-2">I want to be informed about promotions.</p>
                            </div>

                            <div>
                                <Switch checked />
                            </div>
                        </li>
                        <li className="flex gap-x-4 items-center justify-between py-4 border-b border-input-border">
                            <div>
                                <p className="text-xs text-black font-semibold">SMS</p>
                                <p className="text-xs text-gray-storm mt-2">I want to receive SMS regarding promotions.</p>
                            </div>

                            <div>
                                <Switch checked />
                            </div>
                        </li>
                        <li className="flex gap-x-4 items-center justify-between py-4 border-b border-input-border">
                            <div>
                                <p className="text-xs text-black font-semibold">Phone</p>
                                <p className="text-xs text-gray-storm mt-2">I want to be called on the phone regarding promotions.</p>
                            </div>
                            <div>
                                <Switch checked />
                            </div>
                        </li>
                    </ul>

                    <p className="text-gray-storm mt-4" style={{ maxWidth: '340px', fontSize: '10px' }}>
                        When you close your promotion-related communication preferences,
                        you will still receive e-mails/notifications about your account.
                    </p>
                </div>
            </div>
        </>
    );
}

export default Communications;
