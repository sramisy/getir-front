import React from 'react';

import staticMap from '../assets/images/static-map.png';

import bagIcon from "../assets/images/bag.svg";
import courierIcon from "../assets/images/courier-pin.svg";

import styles from "./InfoBar.module.css";

function InfoBar() {
    return (
        <div className={styles['info-bar']}>
            <div className="z-10">
                <div className="flex">
                    <figure className="hidden md:block">
                        <img src={bagIcon} alt="Minimum Price" className="h-10" />
                    </figure>
                    <div
                        className="flex md:flex-col items-center md:items-start p-2 md:p-0 border border-primary-light md:border-0 rounded-lg w-32 md:w-auto justify-center md:justify-start md:ml-3" /* style={{ boxShadow: 'var(--shadow-s) var(--shadow-color-primary)' }} */
                    >
                        <p className="text-xs text-gray-storm mr-1 md:mr-0 md:mb-1 md:uppercase">
                            Minimum
                        </p>
                        <p className="text-sm md:text-base text-gray-storm md:text-black font-semibold">
                            ₺25,00
                        </p>
                    </div>
                </div>

                <div className="flex">
                    <figure className="hidden md:block">
                        <img
                            src={courierIcon}
                            alt="Delivery Price"
                            className="h-10"
                        />
                    </figure>
                    <div
                        className="flex md:flex-col items-center md:items-start p-2 md:p-0 border border-primary-light rounded-lg md:border-0 w-32 md:w-auto justify-center md:justify-start md:ml-3" /* style={{ boxShadow: 'var(--shadow-s) var(--shadow-color-primary)' }} */
                    >
                        <p className="text-xs text-gray-storm mr-1 md:mr-0 md:mb-1 md:uppercase">
                            Delivery
                        </p>
                        <p className="text-sm md:text-base text-gray-storm md:text-black font-semibold">
                            ₺4,99
                        </p>
                    </div>
                </div>
            </div>


            <figure className={styles.staticMap}>
                <img src={staticMap} alt="" style={{
                    objectFit: 'cover',
                    height: '100%',
                    width: '100%',
                }} />
            </figure>
        </div>
    );
}

export default InfoBar;
