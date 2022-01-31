import React from 'react';

import { Outlet } from 'react-router-dom';

function Addresses() {

    return (
        <div>
            <Outlet />
        </div>
    );
}

export default Addresses;
