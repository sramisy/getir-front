import React from 'react';
import PropTypes from "prop-types";
import classNames from 'classnames';

import { Splide, SplideSlide } from "@splidejs/react-splide";

import '@splidejs/splide/dist/css/splide.min.css';
import "./Carousel.css";


const propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    type: PropTypes.string,
}

const defaultProps = {
    type: 'default',
};

function Carousel({ className, type, images }) {
    const defaultOptions = {
        type: 'loop',
        autoplay: true,
        arrows: false,
        pagination: false,
    };

    const promoOptions = {
        arrows: 'slider',
        perPage: 3,
        gap: '1rem',
        breakpoints: {
            1024: {
                perPage: 2,
                gap: '1rem',
                fixedWidth: '25rem',
            },
            767: {
                perPage: 1,
                gap: '0',
                fixedWidth: '100vw',
            },
        }
    }

    let options = type === 'promo' ? { ...defaultOptions, ...promoOptions } : defaultOptions;

    const classes = classNames('carousel', className, `${type === "promo" ? "promo" : ""}`);

    return (
        <div className={classes}>
            <Splide options={options} className="w-full h-full">
                {images.map((image, index) => (
                    <SplideSlide key={index} className="h-full">
                        {React.createElement('img', { src: image, alt: `Image ${index + 1}` })}
                    </SplideSlide>
                ))}
            </Splide>
        </div>
    );
}

Carousel.propTypes = propTypes;
Carousel.defaultProps = defaultProps;

export default Carousel;
