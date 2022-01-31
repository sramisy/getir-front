import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import MobileHeader from "../components/MobileHeader";
import Login from '../auth/Login';
import Signup from "../auth/Signup";
import ActivationModal from "../auth/ActivationModal";
import AddDeliveryAddressModal from "../components/AddDeliveryAddressModal";
import OtpModal from "../auth/OtpModal";
import Carousel from "../components/Carousel";
import Category from "../product/Category";
import Product from "../product/Product";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import AddressSwitch from "../components/AddressSwitch";
import LanguageChangeForm from "../components/LanguageChangeForm";
import FindLocation from "../components/FindLocation";
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../components/Modal';

import {
  toggleLanguageModal,
  toggleSignupModal,
  toggleLoginModal,
} from "../app/appSlice";

import promo1 from "../assets/images/promotion-1.jpeg";
import promo2 from "../assets/images/promotion-2.jpeg";
import promo3 from "../assets/images/promotion-3.jpeg";
import promo4 from "../assets/images/promotion-4.jpeg";

import getirHome from '../assets/images/getir-home.svg';

import getirMain1 from '../assets/images/getir-mainpage-1.jpg';
import getirMain2 from '../assets/images/getir-mainpage-2.jpg';
import getirMain3 from '../assets/images/getir-mainpage-3.jpg';
import getirMain4 from '../assets/images/getir-mainpage-4.jpg';

import appStore from "../assets/images/app-store.svg";
import playStore from "../assets/images/play-store.svg";
import appGallery from "../assets/images/app-gallery.svg";

import value1 from "../assets/images/getir-value-1.svg";
import value2 from "../assets/images/getir-value-2.svg";
import value3 from "../assets/images/getir-value-3.svg";

function Home() {

  const [width, setWidth] = React.useState(window.innerWidth);
  const [showMobileHeader, setShowMobileHeader] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [categories, setCategories] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);

  const {
    isSignupModalOpen,
    isLoginModalOpen,
    isLanguageModalOpen,
    isActivationModalOpen,
    isOtpModalOpen,
    isAddDeliveryAddressModalOpen,
    isAddressSelectModalOpen,
  } = useSelector((state) => state.app);

  const { isAuth, user } = useSelector(state => state.auth);
  const currentAddress = user?.addresses.find(address => address.active);

  const dispatch = useDispatch();
  let navigate = useNavigate();

  let hidden = isSignupModalOpen || isLoginModalOpen || isLanguageModalOpen
    || isActivationModalOpen || isOtpModalOpen || isAddDeliveryAddressModalOpen
    || isAddressSelectModalOpen;

  React.useEffect(() => {
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth);
    });

    if (width < 768) {
      setShowMobileHeader(true);

    } else {
      setShowMobileHeader(false);

    }

  }, [width]);

  React.useEffect(() => {
    document.body.style.overflow = hidden ? "hidden" : "auto";

  }, [hidden]);

  React.useEffect(() => {
    if (isAuth && currentAddress) {
      window.location.pathname = "/categories";
    }

  }, [isAuth, currentAddress, navigate]);

  React.useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "auto";

  }, [loading]);

  React.useEffect(() => {
    let response;

    async function fetchData() {
      try {
        response = await fetch('/api/categories');
        const categoriesData = await response.json();
        setCategories(categoriesData);

        response = await fetch('/api/favorites');
        const favoritesData = await response.json();
        setFavorites(favoritesData);

      } catch (err) {
        console.log(err);
      }

      setLoading(false);
    }

    fetchData();

  }, []);

  return (
    <>
      <Navbar />
      {showMobileHeader && <MobileHeader />}

      <AddressSwitch />

      <main className="md:flex flex-col">
        <div className="promo-wrapper">
          <h4 className="mb-4 text-black text-sm font-semibold hidden md:block">
            Promotions
          </h4>

          <Carousel type="promo" images={[promo1, promo2, promo3, promo4]} />
        </div>

        <div className="hero relative md:order-1">
          <Carousel images={[getirMain1, getirMain2, getirMain3, getirMain4]} className="hidden md:block h-full" />

          <div className="md:absolute top-0 left-0 w-full h-full" style={{ background: 'linear-gradient(90deg, var(--color-primary) 0%,rgba(93, 62, 188, 0) 100%)' }}>
            <div className="md:flex items-center justify-between md:px-6 lg:px-16 xl:px-0 md:py-25 mx-auto" style={{ maxWidth: '1232px' }}>
              <div className="getir-slogan z-10">
                <figure className="mb-15">
                  <img src={getirHome} alt="Getir Home" />
                </figure>

                <h1 className="text-white text-4xl font-bold">At your door in <br />minutes</h1>
              </div>

              {isAuth ? (<FindLocation />) : (
                <div className="bg-white pt-6 pb-10 md:pb-8 px-4 md:px-6 md:rounded-xl md:w-100 z-10">
                  <h3 className="font-semibold text-center text-primary">Login or register</h3>

                  <Login className="mt-5" />
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Categories */}
        <section className="categories">
          <div className="container">
            <h4 className="ml-4 md:ml-0 mb-4 lg:mb-6 text-black text-sm font-semibold">
              Categories
            </h4>

            <div className="grid grid-cols-4 md:grid-cols-5 xl:grid-cols-10 gap-y-6 md:gap-y-8">
              {categories.map((category, index) => (
                <Category key={index} category={category} />
              ))}
            </div>
          </div>
        </section>

        {/* Favorites */}
        <section className="favorites">
          <h4 className="ml-4 md:ml-0 mb-8 md:mb-4 text-black text-sm font-semibold">
            Favorites
          </h4>

          <div className="md:bg-white border-0 md:rounded-2xl md:pt-2 md:px-2 md:pb-8">
            <div className="grid grid-cols-3 md:grid-cols-5 xl:grid-cols-8 gap-y-6">
              {favorites.map((product, index) => (
                <Product key={index} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Mobile App */}
        <section className="getir-mobile-app">
          <h2>Download Getir</h2>
          <h3>Let us deliver your order to your door in minutes</h3>

          <div className="mobile-stores">
            <figure>
              <img src={appStore} alt="App Store" />
            </figure>
            <figure>
              <img src={playStore} alt="Play Store" />
            </figure>
            <figure>
              <img src={appGallery} alt="App Gallery" />
            </figure>
          </div>
        </section>

        {/* Getir Values */}
        <section className="getir-values">
          <div className="value-item">
            <figure>
              <img src={value1} alt="A promotion for every order" />
            </figure>

            <div className="value-desc">
              <h3>A promotion for every order</h3>
              <p>At Getir, you can find a promotion for every order.</p>
            </div>
          </div>

          <div className="value-item">
            <figure>
              <img src={value2} alt="A promotion for every order" />
            </figure>

            <div className="value-desc">
              <h3>At your door in minutes</h3>
              <p>Your order is at your door in minutes with Getir.</p>
            </div>
          </div>
          <div className="value-item">
            <figure>
              <img src={value3} alt="A promotion for every order" />
            </figure>

            <div className="value-desc">
              <h3>Thousand kinds of happiness</h3>
              <p>At Getir, you can choose from thousands of varieties.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {isSignupModalOpen && (
        <Modal onClose={() => dispatch(toggleSignupModal(false))}>
          <ModalHeader className="px-4 py-6" closeBtn>
            <h3>Sign Up</h3>
          </ModalHeader>
          <ModalBody className="px-4 mt-6">
            <Signup />
          </ModalBody>
          <ModalFooter>
            <div className="bg-gray-light py-4 flex justify-center items-center md:rounded-b-xl">
              <span className="text-sm text-gray-storm mr-3">
                If you’re a member of Getir
              </span>
              <button className="text-primary text-sm hover:underline" onClick={() => {
                dispatch(toggleSignupModal(false));
                dispatch(toggleLoginModal(true));
              }}>
                Login
              </button>
            </div>
          </ModalFooter>
        </Modal>
      )}

      {isLoginModalOpen && (
        <Modal center onClose={() => dispatch(toggleLoginModal(false))} className="login-modal">
          <ModalHeader className="px-4 pt-6 pb-8 md:px-8" closeBtn>
            <h3>Login or register</h3>
          </ModalHeader>
          <ModalBody className="px-4 md:px-8 flex-1">
            <Login>
              <div>
                <p className="mt-3 text-xs text-gray">For the GDPR document regarding your personal information: <a className="text-primary text-xs">click</a></p>

                <div className="bg-input-border h-px w-1/2 mt-4 mb-6 mx-auto"></div>
              </div>
            </Login>
          </ModalBody>
          <ModalFooter>
            <div className="bg-gray-light py-4 md:mt-8 flex justify-center items-center md:rounded-b-xl">
              <span className="text-sm text-gray-storm mr-3">
                Still haven’t signed up?
              </span>
              <button className="text-primary text-sm hover:underline" onClick={() => {
                dispatch(toggleLoginModal(false))
                dispatch(toggleSignupModal(true))
              }}>
                Sign Up
              </button>
            </div>
          </ModalFooter>
        </Modal>
      )}

      {isLanguageModalOpen && (
        <Modal center onClose={() => dispatch(toggleLanguageModal(false))} className="languages-modal">
          <ModalHeader className="px-4 pt-6 pb-8 md:px-8" closeBtn>
            <h3>Choose a Language</h3>
          </ModalHeader>
          <ModalBody className="md:rounded-b-xl">
            <LanguageChangeForm />
          </ModalBody>
        </Modal>
      )}

      {isActivationModalOpen && <ActivationModal />}
      {isOtpModalOpen && <OtpModal />}
      {isAddDeliveryAddressModalOpen && <AddDeliveryAddressModal />}

      {loading && <Loading />}
    </>
  );
}

export default Home;