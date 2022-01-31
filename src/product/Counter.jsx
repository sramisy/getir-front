import React from 'react';

import { Icon } from '@iconify/react';

import styles from "./Counter.module.css";

function Counter(props) {
    const { count, onIncrease, onDecrease, className, loading } = props;

    const classes = [styles.counter, className].join(' ');

    return (
        <div className={classes}>
            <button className={styles.decreaseBtn} onClick={onDecrease} disabled={count < 2}>
                <Icon icon="akar-icons:minus" className="text-gray text-base" />
            </button>
            <div className={styles.count}>
                {loading ? (
                    <Icon icon="ph:spinner-bold" className="text-xl text-primary-light animate-spin-slow" />
                ) : (
                    count
                )}
            </div>
            <button className={styles.increaseBtn} onClick={onIncrease}>
                <Icon icon="akar-icons:plus" className="text-primary text-base" />
            </button>
        </div>
    );
}

export default Counter;
