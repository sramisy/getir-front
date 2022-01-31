import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Icon } from "@iconify/react";

import mailIcon from '../../assets/images/mail.svg';
import phoneIcon from '../../assets/images/phone.svg';
import { toggleActivationModal, toggleEditProfileInfoModal } from '../../app/appSlice';

function ProfileInfo() {
    const { user } = useSelector(state => state.auth);
    const { isEditProfileInfoModalOpen } = useSelector(state => state.app);
    const dispatch = useDispatch();

    React.useEffect(() => {
        document.body.style.overflow = isEditProfileInfoModalOpen ? "hidden" : "auto";

    }, [isEditProfileInfoModalOpen]);

    return (
        <>
            <div className="profile-info">
                <button className="edit-info" onClick={() => dispatch(toggleEditProfileInfoModal(true))}>
                    <Icon icon="akar-icons:edit" className="text-primary text-2xl" />
                </button>
                <ul>
                    <li className="py-4">
                        <h3 className="text-black font-semibold">{user?.fullName}</h3>
                    </li>
                    <li className="flex items-center py-4 border-t border-input-border">
                        <figure className="mr-3">
                            <img src={mailIcon} alt="Mail Address" />
                        </figure>
                        <span className="text-xs text-gray-storm">{user?.email}</span>
                    </li>
                    <li className="flex items-center justify-between pt-4 border-t border-input-border">
                        <div className="flex items-center">
                            <figure className="mr-3">
                                <img src={phoneIcon} alt="Phone Number" />
                            </figure>
                            <span className="text-xs text-gray-storm">{`+${user?.dialCode}${user?.phone}`}</span>
                        </div>

                        {!user?.active && (
                            <button className="py-1 px-2 border border-primary rounded-lg text-sm text-primary" onClick={() => dispatch(toggleActivationModal(true))}>
                                Activate
                            </button>
                        )}
                    </li>
                </ul>
            </div>
        </>
    );
}

export default ProfileInfo;
