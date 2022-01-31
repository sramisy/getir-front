import React from 'react';

import { useDispatch } from "react-redux";

import { toggleLanguageModal } from "../app/appSlice";

import { Icon } from "@iconify/react";

import { ExpandButton } from "./Buttons";

import appStore from '../assets/images/app-store.svg';
import playStore from '../assets/images/play-store.svg';
import appGallery from '../assets/images/app-gallery.svg';
import { useSelector } from 'react-redux';

import "./Footer.css";

function Footer() {
  const { language } = useSelector(state => state.app);
  const dispatch = useDispatch();

  return (
    <footer className="footer">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-x-6">
          <div>
            <h3>Download Getir!</h3>

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
          </div>

          <div className="mt-16 md:mt-0">
            <div className="flex items-center justify-between">
              <h3>Discover Getir</h3>
              <ExpandButton>
                <Icon icon="clarity:caret-line" className="text-primary text-base" />
              </ExpandButton>
            </div>

            <ul className="mt-4">
              <li className="mb-4">
                <a className="text-black text-sm">About Us</a>
              </li>
              <li className="mb-4">
                <a className="text-black text-sm">Careers</a>
              </li>
              <li className="mb-4">
                <a className="text-black text-sm">Contact Us</a>
              </li>
              <li className="mb-4">
                <a className="text-black text-sm">COVID-19 Announcement</a>
              </li>
              <li>
                <a className="text-black text-sm">Social Responsibility Projects</a>
              </li>
            </ul>
          </div>

          <div className="mt-10 md:mt-0">
            <div className="flex items-center justify-between">
              <h3>Need Help?</h3>
              <ExpandButton>
                <Icon icon="clarity:caret-line" className="text-primary text-base" />
              </ExpandButton>
            </div>

            <ul className="mt-4">
              <li className="mb-4">
                <a className="text-black text-sm">FAQ</a>
              </li>
              <li className="mb-4">
                <a className="text-black text-sm">Protecting Private Information</a>
              </li>
              <li className="mb-4">
                <a className="text-black text-sm">Privacy Policy</a>
              </li>
              <li className="mb-4">
                <a className="text-black text-sm">Terms & Conditions</a>
              </li>
              <li>
                <a className="text-black text-sm">Cookie Policy</a>
              </li>
            </ul>
          </div>

          <div className="mt-10 md:mt-0">
            <div className="flex items-center justify-between">
              <h3>Become our business partner</h3>
              <ExpandButton>
                <Icon icon="clarity:caret-line" className="text-primary text-base" />
              </ExpandButton>
            </div>

            <ul className="mt-4">
              <li className="mb-4">
                <a className="text-black text-sm">Become a Franschisee</a>
              </li>
              <li className="mb-4">
                <a className="text-black text-sm">Rent Your Warehouse</a>
              </li>
              <li className="mb-4">
                <a className="text-black text-sm">Become a GetirFood Restaurant</a>
              </li>
              <li>
                <a className="text-black text-sm">Become a GetirLocal Business</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="hidden md:block h-px bg-input-border w-full mt-8 mb-6"></div>

        <div className="md:flex justify-between items-center text-center mt-16 md:mt-0">
          <div className="flex flex-col md:flex-row">
            <span className="text-gray-mid md:mr-6" style={{ fontSize: '13px' }}>2021 Getir &copy;</span>
            <a className="text-primary mt-3 md:mt-0" style={{ fontSize: '13px' }}>Information Society Services</a>
          </div>

          <div className="flex justify-center items-center mt-3 md:mt-0">
            <ul className="social-links hidden md:flex gap-x-5 mr-6">
              <li className="social-link">
                <a>
                  <Icon icon="akar-icons:facebook-fill" className="text-gray-storm" style={{ fontSize: '20px' }} />
                </a>
              </li>
              <li className="social-link">
                <a>
                  <Icon icon="akar-icons:twitter-fill" className="text-gray-storm" style={{ fontSize: '20px' }} />
                </a>
              </li>
              <li className="social-link">
                <a>
                  <Icon icon="akar-icons:instagram-fill" className="text-gray-storm" style={{ fontSize: '20px' }} />
                </a>
              </li>
            </ul>

            <button onClick={() => dispatch(toggleLanguageModal(true))} className="flex items-center text-gray-storm p-2 border border-input-border rounded-lg hover:bg-primary-light hover:text-primary group" style={{ fontSize: '13px' }}>
              <Icon icon="codicon:globe" className="mr-2 text-base group-hover:text-primary" />
              {language.fullName} <span className="uppercase text-sm font-medium ml-1 group-hover:text-primary">({language.shortName})</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
