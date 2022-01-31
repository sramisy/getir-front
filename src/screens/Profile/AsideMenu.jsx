import React from 'react';

import NavLinkItem from './NavLinkItem';

function AsideMenu() {
    return (
        <div className="aside-menu">
            <ul>
                <NavLinkItem to="/profile/addresses">My Addresses</NavLinkItem>
                <NavLinkItem to="/profile/favorites">Favorite Products</NavLinkItem>
                <NavLinkItem to="/profile/orders">Previous Orders</NavLinkItem>
                <NavLinkItem to="/profile/payment-methods">My Payment Methods</NavLinkItem>
                <NavLinkItem to="/profile/invoices">Invoice Information</NavLinkItem>
                <NavLinkItem to="/profile/change-password">Change Password</NavLinkItem>
                <NavLinkItem to="/profile/communications">Communication Preferences</NavLinkItem>
            </ul>
        </div>
    );
}

export default AsideMenu;
