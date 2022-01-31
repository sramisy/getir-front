import React from 'react';
import { Link } from 'react-router-dom';

import { Icon } from '@iconify/react';
import { useSelector } from 'react-redux';
import Product from '../../product/Product';

import emptyFavorites from '../../assets/images/favorites.svg';


function Favorites() {
    const { items } = useSelector(state => state.favorite);

    return (
        <>
            <Link to="/profile" reloadDocument className="go-back flex md:hidden items-center p-4 md:p-0 bg-white md:bg-gray-background mt-8 md:mt-0 mb-4">
                <button className="flex items-center justify-center w-6 h-6 border-0 rounded-lg bg-primary-light md:bg-gray-background mr-3 md:mr-2">
                    <Icon icon="akar-icons:chevron-left" className="text-primary" style={{ fontSize: '12px' }} />
                </button>
                <p className="text-primary font-semibold" style={{ fontSize: '13px' }}>Return to Profile</p>
            </Link>

            <h3 className="text-sm text-black font-semibold hidden md:block mb-4">Favorite Products</h3>

            <div className="bg-white md:border-0 md:rounded-xl">
                {items.length > 0 ? (
                    <div className="grid grid-cols-3 gap-y-10 py-4">
                        {items.map((item, _index) => (
                            <Product key={item.id} product={item} />
                        ))}
                    </div>
                ) : (
                    <div className="empty-favorites text-center px-6 py-20">
                        <figure>
                            <img src={emptyFavorites} alt="Empty Favorites" className="mx-auto" />
                        </figure>

                        <div className="mt-10">
                            <h3 className="text-black font-semibold">You don’t have any favorite products yet.</h3>
                            <p className="text-sm text-gray-storm mt-4">Click the heart icon on the top right to ADD product to favorites.</p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default Favorites;
