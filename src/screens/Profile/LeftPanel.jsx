import React from 'react';

import { useLocation } from 'react-router-dom';

import ProfileInfo from './ProfileInfo';
import AsideMenu from './AsideMenu';

function LeftPanel() {
    const location = useLocation();

    return (
        <div className="left-panel">
            {location.pathname !== '/profile' && <ProfileInfo />}
            <AsideMenu />
        </div>

    );
}

export default LeftPanel;
