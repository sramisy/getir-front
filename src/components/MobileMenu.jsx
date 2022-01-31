import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { toggleLanguageModal } from "../app/appSlice";
import { logout } from "../auth/authSlice";

import { Icon } from '@iconify/react';

import "./MobileMenu.css";
import MenuLinkItem from './MenuLinkItem';

function MobileMenu(props) {
    const contentRef = React.useRef(null);
    const { onClose } = props;

    const { user } = useSelector(state => state.auth);

    const currentAddress = user?.addresses.find(address => address.active);

    const dispatch = useDispatch();
    let navigate = useNavigate();

    const { language } = useSelector((state) => state.app);

    const handleLogout = async () => {
        await dispatch(logout()).unwrap();
        navigate('/', { replace: true });
    }

    React.useEffect(() => {

        const checkIfClickOutside = (e) => {
            if (contentRef.current && !contentRef.current.contains(e.target)) {
                onClose();
            }
        }

        document.addEventListener("mousedown", checkIfClickOutside);

        return () => {
            document.removeEventListener("mousedown", checkIfClickOutside);
        }

    }, [onClose]);

    return (
        <div className="mobile-menu">
            <div className="mobile-menu-content" ref={contentRef}>
                <div className="flex items-center justify-between px-6 py-5 border-b border-primary-light">
                    <Link to="/profile" className="flex items-center" reloadDocument>
                        <div className="border flex justify-center items-center rounded-lg border-input-border w-10 h-10 mr-3">
                            <Icon icon="bx:bxs-user" className="text-gray-storm" style={{ fontSize: '24px' }} />
                        </div>
                        <div>
                            <p className="text-sm text-black">{user?.fullName}</p>
                            <p className="text-xs text-gray-storm">{`+${user?.dialCode}${user?.phone}`}</p>
                        </div>
                    </Link>

                    <button onClick={onClose} className="w-8 h-8 border-0 rounded-lg bg-gray-light flex items-center justify-center">
                        <Icon icon="eva:close-outline" className="text-gray-dark" style={{ fontSize: '16px' }} />
                    </button>
                </div>
                <div className="pt-3 flex-1">
                    <ul>
                        {currentAddress?.available && (
                            <MenuLinkItem to="/promotions">
                                <Icon icon="bx:bxs-gift" className="text-gray-storm text-xl mr-4" />
                                Promotions
                            </MenuLinkItem>
                        )}

                        <MenuLinkItem to="/profile/addresses">
                            <Icon icon="carbon:location-filled" className="text-gray-storm text-xl mr-4" />
                            My Addresses
                        </MenuLinkItem>

                        <MenuLinkItem to="/profile/favorites">
                            <Icon icon="ant-design:heart-filled" className="text-gray-storm text-xl mr-4" />
                            Favorite Products
                        </MenuLinkItem>

                        <MenuLinkItem to="/profile/orders">
                            <Icon icon="bi:handbag-fill" className="text-gray-storm text-xl mr-4" />
                            Previous Orders
                        </MenuLinkItem>

                        <MenuLinkItem to="/profile/payment-methods">
                            <Icon icon="fluent:payment-24-filled" className="text-gray-storm text-xl mr-4" />
                            My Payment Methods
                        </MenuLinkItem>

                        <MenuLinkItem to="/profile/invoices">
                            <Icon icon="entypo:text-document-inverted" className="text-gray-storm text-xl mr-4" />
                            Invoice Information
                        </MenuLinkItem>

                        <MenuLinkItem to="/profile/change-password">
                            <Icon icon="subway:unlock-1" className="text-gray-storm text-xl mr-4" />
                            Change Password
                        </MenuLinkItem>

                        <MenuLinkItem to="/profile/communications">
                            <Icon icon="ic:round-email" className="text-gray-storm text-xl mr-4" />
                            Communication Preferences
                        </MenuLinkItem>

                        <li className="py-3 px-6">
                            <button onClick={handleLogout} className="flex items-center text-black">
                                <Icon icon="heroicons-solid:logout" className="text-gray-storm mr-4 text-xl" />
                                Log Out
                            </button>
                        </li>
                    </ul>
                </div>

                <div className="flex items-center justify-between bg-gray-background border-t border-input-border px-6 py-4">
                    <button className="flex items-center" onClick={() => dispatch(toggleLanguageModal(true))}>
                        <Icon icon="codicon:globe" className="text-gray-storm mr-2 text-2xl" />
                        <p className="text-gray-storm">Change Language: {language.fullName}</p>
                    </button>
                    <Icon icon="emojione:flag-for-united-states" className="text-2xl" />
                </div>
            </div>
        </div>
    );
}

export default MobileMenu;
