import React from "react";

import { useSelector } from "react-redux";
import classNames from "classnames";

import bagSmall from '../assets/images/bag-small.svg';

import Dinero from 'dinero.js';

import "./BasketTotal.css";

function BasketTotal(props) {
    const {
        className,
        onClick,
    } = props;

    const { total } = useSelector(state => state.basket);

    const classes = classNames('basket-total', className);

    return (
        <button className={classes} onClick={onClick}>
            <div className="small-bag">
                <figure>
                    <img src={bagSmall} alt="Bag Small" />
                </figure>
            </div>
            <div className="total">
                <span>{`₺${Dinero({ amount: total }).toFormat('0,0.00')}`}</span>
            </div>
        </button>
    )
}

export default BasketTotal;