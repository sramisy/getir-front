import React from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { Icon } from "@iconify/react";

import "@splidejs/splide/dist/css/splide.min.css";

import promo1 from "../assets/images/promotion-1.jpeg";
import promo2 from "../assets/images/promotion-2.jpeg";
import promo3 from "../assets/images/promotion-3.jpeg";
import promo4 from "../assets/images/promotion-4.jpeg";

import Navbar from "../components/Navbar";
import Header from "../components/Header";
import MobileHeader from "../components/MobileHeader";
import AddressSwitch from "../components/AddressSwitch";

import GoToBasket from "../basket/GoToBasket";
import OutServiceArea from "../components/OutServiceArea";
import Carousel from "../components/Carousel";
import AddDeliveryAddressModal from "../components/AddDeliveryAddressModal";
import Footer from "../components/Footer";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "../components/Modal";
import LanguageChangeForm from "../components/LanguageChangeForm";
import { toggleLanguageModal, toggleLoginModal, toggleOutServiceAreaModal, toggleSignupModal } from "../app/appSlice";
import { Button } from "../components/Buttons";

import BasketContent from "../basket/BasketContent";
import InfoBar from "../components/InfoBar";

import { scroller } from "react-scroll"
import Login from "../auth/Login";
import Signup from "../auth/Signup";
import OtpModal from '../auth/OtpModal';
import ActivationModal from "../auth/ActivationModal";

function Categories() {
  const [width, setWidth] = React.useState(window.innerWidth);
  const [showMobileHeader, setShowMobileHeader] = React.useState(false);
  const { isAuth, user } = useSelector((state) => state.auth);
  const { isLanguageModalOpen,
    isOutServiceAreaModalOpen,
    isAddDeliveryAddressModalOpen,
    isLoginModalOpen, isSignupModalOpen,
    isOtpModalOpen,
    isActivationModalOpen,
    isAddressSelectModalOpen,
  } = useSelector(state => state.app);
  const [categories, setCategories] = React.useState([]);

  const { categoryId, subcategoryId } = useParams();
  const [category, setCategory] = React.useState(null);

  const dispatch = useDispatch();
  let navigate = useNavigate();
  let hidden = isSignupModalOpen || isLoginModalOpen || isLanguageModalOpen ||
    isOutServiceAreaModalOpen || isAddDeliveryAddressModalOpen || isOtpModalOpen || isActivationModalOpen
    || isAddressSelectModalOpen;

  let currentAddress = user?.addresses.find(address => address.active);
  let outServiceArea = false;

  if (isAuth && currentAddress) {
    outServiceArea = !currentAddress.available;
  }

  React.useEffect(() => {
    categoryId && fetch(`/api/categories/${categoryId}`)
      .then(res => res.json())
      .then(data => setCategory(data))
      .catch(_err => navigate("/categories"));

  }, [categoryId, navigate])

  React.useEffect(() => {
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth);
    })

    if (width < 768) {
      setShowMobileHeader(true);

    } else {
      setShowMobileHeader(false);

    }

  }, [width]);

  React.useEffect(() => {
    scroller.scrollTo(category?.id, {
      duration: 500,
      delay: 100,
      smooth: true,
      offset: width < 768 ? -100 : -140,
    })

  }, [category, width]);

  React.useEffect(() => {
    let response;

    async function fetchData() {
      try {
        response = await fetch('/api/categories');
        const categoriesData = await response.json();
        setCategories(categoriesData);

      } catch (err) {
        console.log(err);
      }
    }

    fetchData();

  }, []);

  const onSubcategoryClick = (subcategory) => {

    navigate(`/categories/${categoryId}/${subcategory.id}`);

    scroller.scrollTo(`${subcategory.id}`, {
      duration: 500,
      delay: 100,
      smooth: true,
      offset: width < 768 ? -100 : -140,
    })
  }

  const onCategoryClick = (category) => {
    navigate(`/categories/${category.id}/${category.subcategories[0].id}`);

    scroller.scrollTo(`${category.id}`, {
      duration: 500,
      delay: 100,
      smooth: true,
      offset: width < 768 ? -150 : -140,
    })
  }

  React.useEffect(() => {
    document.body.style.overflow = hidden ? 'hidden' : 'auto';

  }, [hidden]);


  return (
    <>
      <div className="md:sticky top-0 md:z-50">
        <Navbar />

        {showMobileHeader ? <MobileHeader /> : <Header />}
      </div>

      <AddressSwitch />

      {outServiceArea && <OutServiceArea className="mb-8" />}

      <main className="flex flex-col md:mb-20">
        {/* Header Promos */}

        {isAuth && !outServiceArea && currentAddress !== undefined && (
          <>
            <div className="container md:order-2">
              <div className="promos-by-address">
                <Carousel
                  className="md:px-6 md:mt-10 md:mb-4"
                  type="promo"
                  images={[promo1, promo2, promo3, promo4]}
                />
              </div>
            </div>


            {/* Info Bar */}
            <InfoBar />
          </>
        )}

        <div className="flex flex-col md:flex-row md:gap-x-4 md:px-6 md:mt-6 md:order-3 container">
          {width < 768 ? (
            <div className="scrollable-categories sticky top-0 z-20" id="scrollable-categories">
              <div className="bg-primary">
                <div className="flex overflow-x-auto" style={{ margin: "0 6px" }}>
                  {categories.map((category, _index) => (
                    <div
                      key={category.id}
                      className={`flex-none py-3 px-1.5 ${category.id === categoryId
                        ? "border-b-2 border-brand-yellow"
                        : null
                        }`}
                    >
                      <button
                        className="text-white"
                        style={{ fontSize: "13px" }}
                        onClick={() => onCategoryClick(category)}
                      >
                        {category.title}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {category && (
                <div className="py-2 px-3 bg-white">
                  <div className="flex gap-x-3">
                    {category.subcategories?.map((subcategory, _index) => (
                      <button key={subcategory.id} className={` border border-primary px-2 py-1 rounded-md ${subcategoryId === subcategory.id ? 'bg-primary text-white border-primary' : 'bg-white text-primary border-input-border'}`} style={{ fontSize: '13px' }} onClick={() => onSubcategoryClick(subcategory)}>
                        {subcategory.title}
                      </button>
                    ))}
                  </div>
                </div>)}
            </div>
          ) : (
            <div>
              <aside className="sticky top-2" style={{ width: "240px", top: '140px' }}>
                <h4 className="text-black text-sm font-semibold mb-4">
                  Categories
                </h4>

                <div
                  className="categories-bar bg-white border-0 rounded-xl overflow-y-auto"
                  style={{ maxHeight: "calc(100vh - 60px)" }}
                >
                  <div className="py-2">
                    {categories.map((category, _index) => (
                      <div key={category.id}>
                        <div className={`px-3 py-2 cursor-pointer ${categoryId === category.id ? 'bg-primary-light' : ''}`}>
                          <button className="flex items-center justify-between w-full"
                            onClick={() => onCategoryClick(category)}>
                            <div className="flex items-center">
                              <figure className="mr-4">
                                <img
                                  src={category.image}
                                  alt={category.title}
                                  className="border border-input-border rounded"
                                  style={{ width: "30px" }}
                                />
                              </figure>

                              <p className="text-sm text-black">{category.title}</p>
                            </div>

                            <Icon
                              icon="akar-icons:chevron-down"
                              className={`text-base ${categoryId === category.id ? 'text-primary transform rotate-180' : 'text-gray-storm'}`}
                            />
                          </button>
                        </div>

                        {categoryId === category.id && <div>
                          {category.subcategories?.map((subcategory, _index) => (
                            <div key={subcategory.id} className={`px-3 py-2 pl-14 cursor-pointer ${subcategoryId === subcategory.id ? 'bg-white' : 'bg-gray-light'}`}>
                              <button className="flex items-center text-sm justify-between w-full text-left" onClick={() => onSubcategoryClick(subcategory)}>
                                {subcategory.title}

                                {subcategoryId === subcategory.id && (
                                  <Icon
                                    icon="akar-icons:chevron-right"
                                    className={`text-base text-primary`}
                                  />
                                )}


                              </button>
                            </div>
                          ))}
                        </div>}
                      </div>

                    ))}
                  </div>
                </div>
              </aside>
            </div>
          )}

          <div className="md:flex md:gap-x-4 w-full">
            <div className="border-t border-b border-primary-light md:border-0 w-full">
              <Outlet />
            </div>

            {/* Basket Content */}
            {width > 1367 && (
              <div >
                <div className="sticky" style={{ top: '140px' }}>
                  <h3 className="text-sm text-black font-semibold">Basket</h3>

                  <div className="border-2 border-brand-yellow rounded-xl mt-4" style={{ width: '300px' }}>
                    <BasketContent />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <GoToBasket />
      </main>

      <Footer />

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

      {isOutServiceAreaModalOpen && (
        <Modal className="outside-modal" center onClose={() => dispatch(toggleOutServiceAreaModal(false))}>
          <ModalBody className="p-9 pb-2 rounded-t-xl">
            <p className="text-sm font-semibold text-black text-center">
              You are currently outside of our service area.
            </p>
          </ModalBody>
          <ModalFooter className="p-6">
            <Button kind="primary" size="small" onClick={() => dispatch(toggleOutServiceAreaModal(false))}>OK</Button>
          </ModalFooter>
        </Modal>
      )}

      {isAddDeliveryAddressModalOpen && <AddDeliveryAddressModal />}
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

      {isSignupModalOpen && (
        <Modal onClose={() => dispatch(toggleSignupModal(false))} className="signup">
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

      {isOtpModalOpen && <OtpModal />}
      {isActivationModalOpen && <ActivationModal />}
    </>
  );
}

export default Categories;
