import React from 'react';

import { useDispatch } from 'react-redux';

import classNames from 'classnames';

import { addItem } from "../basket/basketSlice";

import { Icon } from '@iconify/react';

import "./AddToBasket.css";


function AddToBasket(props) {
    const { icon, className, onClick } = props;

    const classes = classNames('add-to-basket', className);

    return (
        <button onClick={onClick} className={classes} style={{ boxShadow: 'var(--shadow-s) var(--shadow-color-primary)' }}>
            {icon || <Icon icon="fluent:add-16-filled" className="text-primary text-base" />}
        </button>
    );
}

export default AddToBasket;
