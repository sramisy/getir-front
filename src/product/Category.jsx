import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import "./Category.css";

const propTypes = {
  category: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }),
};


function Category({ category }) {
  const { title, image } = category;

  return (
    <Link to={`/categories/${category.id}/${category.subcategories[0]?.id}`} className="category" reloadDocument>
      <div>
        <figure>
          <img src={image} alt={title} />
        </figure>
      </div>
      <p>{title}</p>
    </Link>
  );
}

Category.propTypes = propTypes;

export default Category;
