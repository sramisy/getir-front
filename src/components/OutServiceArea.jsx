import { Icon } from '@iconify/react';
import React from 'react';

import classNames from 'classnames';

function OutServiceArea(props) {
    const {
        className,
    } = props;

    const classes = classNames('out-service-area', className, 'bg-gray-storm');

    return (
        <div className={classes}>
            <div className="flex items-center p-4 md:px-10 xl:px-0 container">
                <Icon icon="ant-design:info-circle-filled" className="text-white text-2xl" />
                <p className="text-sm text-white font-semibold ml-2 tracking-normal">You are currently outside of our service area.</p>
            </div>
        </div>

    );
}

export default OutServiceArea;
