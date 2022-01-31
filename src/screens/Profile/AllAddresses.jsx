import React from "react";

import { Link, useNavigate } from "react-router-dom";

import { Icon } from "@iconify/react";

import houseIcon from "../../assets/images/House.svg";
import plazaIcon from "../../assets/images/Plaza.svg";
import parkIcon from "../../assets/images/Park.svg";

import { useSelector, useDispatch } from "react-redux";

import { removeAddress, updateCurrentAddress } from "../../auth/authSlice";
import { clearBasket } from "../../basket/basketSlice";

function Addresses() {

  const icons = new Map([
    ["home", houseIcon],
    ["business", plazaIcon],
    ["other", parkIcon],
  ]);

  const navigate = useNavigate();

  let { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const currentAddress = user?.addresses.find(address => address.active);

  const handleClick = async (addressId) => {
    await dispatch(updateCurrentAddress(addressId)).unwrap();
    await dispatch(clearBasket()).unwrap();
    window.location.reload();
  }

  const handleRemove = async (addressId) => {
    await dispatch(removeAddress(addressId)).unwrap();
    window.location.reload();
  }

  const renderAddresses = () => {
    if (user?.addresses.length === 0) {
      return (
        <div className="px-6 py-8 md:pb-16">
          <h4 className="text-sm text-gray-dark text-center">No registered addresses found.</h4>

          <div className="hr h-px w-full bg-input-border mt-8 md:hidden"></div>
        </div>
      );
    }

    return (
      <div className="px-6 md:pt-2 mb-8 md:mb-10">
        <ul>
          {user?.addresses.map((address, index) => (
            <li key={index} className="flex items-center justify-between py-4">
              <button className="flex items-center" disabled={currentAddress.id === address.id} onClick={() => handleClick(address.id)}>
                <figure className="flex-none" style={{ width: "22px" }}>
                  <img src={icons.get(address.icon)} alt="" />
                </figure>
                <div className="vr w-px h-4 bg-input-border" style={{ marginLeft: "10px", marginRight: "10px" }}></div>

                <div className="">
                  <p className="street text-sm text-black font-semibold">
                    {`${address.title} `}
                    <span className="text-sm text-gray-storm">{address.street}</span>
                  </p>
                </div>
              </button>

              {address.active ? (
                <button>
                  <Icon icon="feather:check-circle" className="text-success text-2xl" />
                </button>
              ) : (
                <button onClick={() => handleRemove(address.id)}>
                  <Icon icon="bx:bxs-trash" className="text-primary text-2xl" />
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    )
  }


  return (
    <>
      <Link to="/profile" reloadDocument className="go-back flex items-center p-4 bg-white mt-8 mb-4 md:hidden">
        <button className="flex items-center justify-center w-6 h-6 border-0 rounded-lg bg-primary-light mr-3">
          <Icon icon="akar-icons:chevron-left" className="text-primary text-xs" />
        </button>
        <p className="text-primary font-semibold" style={{ fontSize: "13px" }}>Return to Profile</p>
      </Link>

      <h3 className="text-sm text-black font-semibold hidden md:block mb-4">My Addresses</h3>

      <div className="bg-white md:border-0 md:rounded-xl">

        {renderAddresses()}

        <div className="px-4 md:px-6 pb-2">
          <h5 className="text-black ml-2 md:ml-0 mb-2" style={{ fontSize: "13px" }}>
            Add Address
          </h5>
          <ul>
            <li className="flex items-center justify-between py-4 border-b border-primary-light">
              <div className="flex items-center">
                <figure style={{ width: "22px" }}>
                  <img src={houseIcon} alt="Home Address" />
                </figure>
                <div className="vr w-px h-4 bg-input-border" style={{ marginLeft: "10px", marginRight: "10px" }}></div>
                <p className="text-sm text-black font-semibold">Add Home Address</p>
              </div>

              <button onClick={() => navigate('/profile/addresses/add-address', { state: { icon: 'home' } })}>
                <Icon icon="akar-icons:plus" className="text-primary text-xl" />
              </button>
            </li>
            <li className="flex items-center justify-between py-4 border-b border-primary-light">
              <div className="flex items-center">
                <figure style={{ width: "22px" }}>
                  <img src={plazaIcon} alt="Business Address" className="mx-auto"
                  />
                </figure>
                <div className="vr w-px h-4 bg-input-border" style={{ marginLeft: "10px", marginRight: "10px" }}></div>
                <p className="text-sm text-black font-semibold">Add Business Address</p>
              </div>

              <button onClick={() => navigate('/profile/addresses/add-address', { state: { icon: 'business' } })}>
                <Icon icon="akar-icons:plus" className="text-primary" style={{ fontSize: "20px" }} />
              </button>
            </li>
            <li className="flex items-center justify-between py-4">
              <div className="flex items-center">
                <figure style={{ width: "22px" }}>
                  <img src={parkIcon} alt="Other Address" />
                </figure>
                <div className="vr w-px h-4 bg-input-border" style={{ marginLeft: "10px", marginRight: "10px" }}></div>
                <p className="text-sm text-black font-semibold">Add Other Address</p>
              </div>

              <button onClick={() => navigate('/profile/addresses/add-address', { state: { icon: 'other' } })}>
                <Icon icon="akar-icons:plus" className="text-primary text-xl" />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Addresses;
