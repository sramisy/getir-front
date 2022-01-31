import React from 'react';

import { NavLink, useLocation } from "react-router-dom";

function NavLinkItem({ to, children }) {
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
                        color: isActive ? 'var(--color-primary)' : 'var(--color-gray-storm)',
                        padding: isActive ? '0 1.5rem' : '',
                    }
                }}
                reloadDocument
            >
                {children}
            </NavLink>
        </li>
    );
}

export default NavLinkItem;
