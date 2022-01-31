import React from 'react';

import { useSelector } from 'react-redux';

import Dinero from 'dinero.js';
import { Link } from 'react-router-dom';

function GoToBasket() {
    const { items, total } = useSelector(state => state.basket);

    let showBtn = items.length > 0;

    const renderContent = () => {
        return showBtn && (
            <div className="fixed left-0 bottom-0 p-4 w-full z-20 bg-white md:hidden">
                <div className="flex items-center border-2 border-primary rounded-lg">
                    <Link to="/basket" reloadDocument className="bg-primary text-sm text-white text-center font-semibold py-3 w-full">
                        Go to Basket
                    </Link>
                    <div className="bg-white px-8">
                        <span className="text-sm text-primary font-semibold">{`₺${Dinero({ amount: total }).toFormat('0,0.00')}`}</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        renderContent()
    );
}

export default GoToBasket;
