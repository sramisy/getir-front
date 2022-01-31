import React from 'react';

import { NavLink, useLocation } from "react-router-dom";

function MenuLinkItem({ to, children }) {
    const location = useLocation();
    const [active, setActive] = React.useState(false);

    React.useEffect(() => {
        setActive(location.pathname.includes(to));
    }, [location.pathname, to]);

    return (
        <li className={`menu-item ${active ? 'active' : ''}`}>
            <NavLink
                to={to}
                style={({ isActive }) => {

                    return {
                        color: isActive ? 'var(--color-primary)' : 'var(--color-black)',
                        backgroundColor: isActive ? 'var(--color-primary-light)' : '',
                    }
                }}
                reloadDocument
            >
                {children}
            </NavLink>
        </li>
    );
}

export default MenuLinkItem;
