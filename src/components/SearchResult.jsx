import React from 'react';

import BasketActions from '../basket/BasketActions';

import Dinero from 'dinero.js';

import Details from '../product/Details';

function SearchResult(props) {
    const {
        item,
    } = props;

    const [showDetails, setShowDetails] = React.useState(false);

    const handleClick = () => {
        setShowDetails(true);
    }

    return (
        <>
            <li className="result-item">
                <button className="flex items-center" onClick={handleClick}>
                    <figure className="mr-4">
                        <img src={item.images[0]} className="w-8 border border-input-border rounded" alt={item.title} />
                    </figure>
                    <div className="result-item-info text-left">
                        <p className="text-sm text-gray-storm">{item.title} <span className="text-primary text-sm capitalize">{item.category}</span></p>
                        <div className="mt-1">
                            <p className="text-sm text-gray-storm mb-1">{item.measure}</p>
                            <p className="text-sm text-primary font-semibold">
                                {`₺${Dinero({ amount: item.price.current }).toFormat('0,0.00')}`}
                            </p>
                        </div>
                    </div>
                </button>

                <BasketActions product={item} />
            </li>

            {showDetails && (
                <Details product={item} onClose={() => setShowDetails(!showDetails)} />
            )}
        </>
    );
}

export default SearchResult;
