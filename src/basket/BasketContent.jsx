import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import BasketActions from "./BasketActions";
import { fetchBasket } from "./basketSlice";

import emptyBasket from '../assets/images/basket.svg';

import Dinero from 'dinero.js';

import "./BasketContent.css";

function BasketContent() {

    const dispatch = useDispatch();

    const { items, total } = useSelector(state => state.basket);
    const { isAuth } = useSelector(state => state.auth);

    const renderedItems = items.map((item, _index) => (
        <li key={item.id} className="basket-item">
            <div>
                <p className="item-title">{item.title} {item.measure && `(${item.measure})`}</p>
                <p className="item-price">{`₺${Dinero({ amount: item.price.current }).toFormat('0,0.00')}`}</p>
            </div>

            <BasketActions orientation="horizontal" product={item} />
        </li>
    ));

    React.useEffect(() => {

        if (isAuth) dispatch(fetchBasket());

    }, [dispatch, isAuth]);

    const renderContent = () => {
        return items.length > 0 ? (
            <div>
                <ul className="mb-6">
                    {renderedItems}
                </ul>

                <div className="flex items-center border-2 border-primary rounded-lg">
                    <Link to="/basket" reloadDocument className="bg-primary text-sm text-white text-center font-semibold py-3 w-full">
                        Go to Basket
                    </Link>
                    <div className="bg-white px-4">
                        <span className="text-sm text-primary font-semibold">
                            {`₺${Dinero({ amount: total }).toFormat('0,0.00')}`}
                        </span>
                    </div>
                </div>
            </div>
        ) : (
            <div className="pt-15 pb-10 px-2 text-center">
                <figure className="mb-8">
                    <img src={emptyBasket} className="mx-auto" alt="Empty Basket" />
                </figure>

                <h3 className="text-base text-primary font-semibold">Your basket is empty</h3>
                <p className="text-sm text-gray-storm mt-4">
                    Add product(s) to your basket to place an order.
                </p>
            </div>
        )
    }

    return (
        <div className="basket-content">
            {renderContent()}
        </div>
    );
}

export default BasketContent;
