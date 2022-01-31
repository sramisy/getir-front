import React from "react";
import PropTypes from "prop-types";

import Dinero from 'dinero.js';

import "./Product.css";

import BasketActions from "../basket/BasketActions";
import Details from "./Details";

const propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.shape({
      old: PropTypes.number,
      current: PropTypes.number.isRequired,
    }),
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    measure: PropTypes.string.isRequired,
  }),
};

function Product({ product }) {
  const [showDetails, setShowDetails] = React.useState(false);

  React.useEffect(() => {
    document.body.style.overflow = showDetails ? "hidden" : "auto";

  }, [showDetails]);

  return (
    <>
      <div className="product">
        <div className="product-image">
          <button onClick={() => setShowDetails(true)}>
            <figure>
              <img src={product.images[0]} alt={product.title} />
            </figure>
          </button>

          <BasketActions product={product} />
        </div>

        <div className="product-info">
          <div>
            {product.price.old && (
              <span className="old-price">
                {`₺${Dinero({ amount: product.price.old }).toFormat('0,0.00')}`}
              </span>
            )}

            <span className="current-price">
              {`₺${Dinero({ amount: product.price.current }).toFormat('0,0.00')}`}
            </span>
          </div>

          <p className="product-title">{product.title}</p>
          <p className="product-measure">{product.measure}</p>
        </div>
      </div>

      {showDetails && (
        <Details product={product} onClose={() => setShowDetails(false)} />
      )}
    </>
  );
}

Product.propTypes = propTypes;

export default Product;
