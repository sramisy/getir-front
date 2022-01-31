import React, { useState } from 'react';

import ProfileInfo from './ProfileInfo';
import AsideMenu from './AsideMenu';

function Account() {
    const [width, setWidth] = useState(window.innerWidth);

    React.useEffect(() => {
        window.addEventListener('resize', () => {
            setWidth(window.innerWidth);
        })
    }, [width]);

    return (
        <>
            <div className="flex flex-col gap-y-6 px-4 md:px-0 order:1 md:order-2 w-full mt-16 md:mt-0">
                <ProfileInfo />

                {(width < 768) && <AsideMenu />}
            </div>
        </>
    );
}

export default Account;
