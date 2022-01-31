import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { toggleLanguageModal, toggleSignupModal, toggleLoginModal } from "../app/appSlice";
import { logout } from "../auth/authSlice";

import { Icon } from "@iconify/react";

import getir from "../assets/images/getir.svg";
import getirFood from "../assets/images/getirfood.svg";
import getirMore from "../assets/images/getirmore.svg";
import getirWater from "../assets/images/getirwater.svg";

import "./Navbar.css";

function Navbar(props) {

  const dropdownRef = React.useRef(null);

  const { isLanguageModalOpen, language, isSignupModalOpen, isLoginModalOpen } = useSelector((state) => state.app);

  const { isAuth, user } = useSelector((state) => state.auth);

  let currentAddress = user?.addresses.length > 0 ? user.addresses.find(address => address.active) : null;

  const dispatch = useDispatch();

  const [showDropdown, setShowDropdown] = React.useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = async () => {

    try {
      await dispatch(logout()).unwrap();
      window.location.pathname = '/';

    } catch (err) {
      console.error(err);
    }

  };

  React.useEffect(() => {

    const checkIfClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", checkIfClickOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickOutside);
    }

  }, []);

  return (
    <nav className="navbar">
      <div className="container md:flex md:justify-between">
        <div className="nav-apps">
          <div className="nav-item active">
            <button>
              <figure>
                <img src={getir} alt="Getir" />
              </figure>
            </button>
          </div>
          <div className="nav-item">
            <button>
              <figure>
                <img src={getirFood} alt="Getir Food" />
              </figure>
            </button>
          </div>
          <div className="nav-item">
            <button>
              <figure>
                <img src={getirMore} alt="Getir More" />
              </figure>
            </button>
          </div>
          <div className="nav-item">
            <button>
              <figure>
                <img src={getirWater} alt="Getir Water" />
              </figure>
            </button>
          </div>
        </div>
        <div className="nav-actions">
          <div className="nav-item">
            <button className="nav-link" onClick={() => dispatch(toggleLanguageModal(!isLanguageModalOpen))}>
              <Icon icon="bx:bx-globe" className="text-xl text-primary-light mr-3" />
              {language.fullName} <span className="uppercase text-sm font-medium ml-1">({language.shortName})</span>
            </button>
          </div>

          {isAuth ? (
            <>
              {currentAddress?.available && (
                <div className="nav-item">
                  <Link to="/promotions" className="nav-link" reloadDocument>
                    <Icon icon="bx:bxs-gift" className="text-xl text-primary-light mr-3" />
                    Promotions
                  </Link>
                </div>
              )}

              <div className="nav-item dropdown" ref={dropdownRef}>
                <button className="nav-link" onClick={toggleDropdown}>
                  <Icon icon="bx:bxs-user" className="text-xl text-primary-light mr-3" />
                  Profile
                  <Icon icon="akar-icons:chevron-down" className={`caret ${showDropdown ? 'up' : ''}`} />
                </button>

                {showDropdown && (
                  <div className="dropdown-menu" id="dropdownMenu">
                    <Link to="/profile" reloadDocument className="p-4 bg-primary-light flex items-center rounded-t-lg">
                      <div className="avatar">
                        <Icon icon="bx:bxs-user" className="text-2xl text-gray" />
                      </div>
                      <div className="flex-shrink-0">
                        <p className="text-sm text-black">{`${user.firstName} ${user.lastName}`}</p>
                        <p className="text-xs text-gray-storm">
                          +{`${user.dialCode}${user.phone}`}
                        </p>
                      </div>
                    </Link>

                    <ul className="bg-white pt-1 pb-2">
                      <li className="dropdown-item">
                        <Link to="/profile/addresses" reloadDocument>My Addresses</Link>
                      </li>
                      <li className="dropdown-item">
                        <Link to="/profile/favorites" reloadDocument>Favorite Products</Link>
                      </li>
                      <li className="dropdown-item">
                        <Link to="/profile/orders" reloadDocument>Previous Orders</Link>
                      </li>
                      <li className="dropdown-item">
                        <Link to="/profile/payment-methods" reloadDocument>My Payment Methods</Link>
                      </li>
                      <li className="dropdown-item">
                        <Link to="/profile/invoices" reloadDocument>Invoice Information</Link>
                      </li>
                      <li className="dropdown-item">
                        <Link to="/profile/change-password" reloadDocument>Change Password</Link>
                      </li>
                      <li className="dropdown-item py-2 px-4">
                        <Link to="/profile/communications" reloadDocument>Communication Preferences</Link>
                      </li>
                    </ul>

                    <div className="p-4 bg-white border-t border-input-border rounded-b-lg hover:bg-primary-light">
                      <button className="text-sm text-black border-0 bg-transparent hover:text-primary" onClick={handleLogout}>
                        Logout
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </>

          ) : (
            <>
              <div className="nav-item">
                <button className="nav-link" onClick={() => dispatch(toggleLoginModal(!isLoginModalOpen))}>
                  <Icon icon="bx:bxs-user" className="text-xl text-primary-light mr-3" />
                  Login
                </button>
              </div>
              <div className="nav-item">
                <button className="nav-link" onClick={() => dispatch(toggleSignupModal(!isSignupModalOpen))}>
                  <Icon icon="heroicons-solid:user-add" className="text-xl text-primary-light mr-3" />
                  Signup
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
