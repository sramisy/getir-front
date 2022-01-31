
import React from 'react';

import { useParams } from 'react-router-dom';

import { Icon } from '@iconify/react';

import Product from '../product/Product';

function Products() {
    let { categoryId, subcategoryId } = useParams();

    const [category, setCategory] = React.useState(null);

    React.useEffect(() => {
        fetch(`/api/categories/${categoryId}`)
            .then(res => res.json())
            .then(data => setCategory(data));

    }, [categoryId]);

    return (
        <div>
            {category?.subcategories?.map((subcategory, index) => {
                const { products } = subcategory;
                
                return (
                    <div key={index}>
                        <div className="flex items-center gap-x-2 px-3 md:pl-0 py-4 md:pt-0 bg-white md:bg-gray-background">
                            {index === 0 && (
                                <>
                                    <span id={category.id} className="text-black text-sm font-semibold">
                                        {category.title}
                                    </span>
                                    <Icon
                                        icon="akar-icons:chevron-right"
                                        className="text-gray-dark"
                                        style={{ fontSize: "12px" }}
                                    />

                                </>
                            )}
                            <span className="text-black text-sm font-semibold" id={subcategory.id}>{subcategory.title}</span>
                        </div>

                        <div className="bg-white w-full md:rounded-xl md:mb-6">
                            <div className="grid grid-cols-3 gap-y-10 pt-4 pb-4">
                                {products.map((product, index) => (

                                    <Product key={product.id} product={product} />
                                ))}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

export default Products;
