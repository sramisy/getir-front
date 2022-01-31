import React from 'react';

import { useSelector } from 'react-redux';

import { Icon } from "@iconify/react";

import Carousel from './Carousel';

import getirHome from '../assets/images/getir-home.svg';

import getirMain1 from '../assets/images/getir-mainpage-1.jpg';
import getirMain2 from '../assets/images/getir-mainpage-2.jpg';
import getirMain3 from '../assets/images/getir-mainpage-3.jpg';
import getirMain4 from '../assets/images/getir-mainpage-4.jpg';
import Login from '../auth/Login';
import FindLocation from './FindLocation';

function Hero() {
  const { isAuth } = useSelector(state => state.auth);

  return (
    <div className="hero relative md:order-1">
      <Carousel images={[getirMain1, getirMain2, getirMain3, getirMain4]} className="hidden md:block h-full" />

      <div className="md:absolute top-0 left-0 w-full h-full" style={{ background: 'linear-gradient(90deg,var(--color-primary) 0%,rgba(93, 62, 188, 0) 100%)' }}>
        <div className="md:flex items-center justify-between md:px-6 lg:px-16 xl:px-0 md:py-25 mx-auto" style={{ maxWidth: '1232px' }}>
          <div className="hidden md:flex flex-col justify-between z-10">
            <figure className="mb-15">
              <img src={getirHome} alt="Getir Home" />
            </figure>

            <h1 className="text-white text-4xl font-bold">At your door in <br />minutes</h1>
          </div>

          {isAuth ? (
            <FindLocation />
          ) : (
            <div className="bg-white pt-6 pb-10 md:pb-8 px-4 md:px-6 md:rounded-xl md:w-100 z-10">
              <h3 className="font-semibold text-center text-primary">Login or register</h3>

              <Login className="mt-5" />
            </div>

          )}
        </div>
      </div>
    </div>
  );
}

export default Hero;
