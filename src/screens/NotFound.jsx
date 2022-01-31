import React from "react";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import getir from "../assets/images/getir.svg";
import getirHuman from "../assets/images/getir-human.svg";
import { Icon } from "@iconify/react";
import { toggleLanguageModal } from "../app/appSlice";
import { Modal, ModalBody, ModalHeader } from "../components/Modal";
import LanguageChangeForm from "../components/LanguageChangeForm";

function NotFound() {
    const { language, isLanguageModalOpen } = useSelector(state => state.app);
    const dispatch = useDispatch();

    React.useEffect(() => {
        document.title = "404 - Page Not Found";
    }, []);

    React.useEffect(() => {
        document.body.style.overflow = isLanguageModalOpen ? "hidden" : "auto";

        return () => {
            document.body.style.overflow = "auto";
        }

    }, [isLanguageModalOpen]);

    return (
        <div className="not-found">
            <div className="flex flex-col justify-between h-full">
                <div className="flex items-center justify-center h-16 md:h-20 bg-primary-background">
                    <Link to="/">
                        <figure>
                            <img src={getir} alt="Getir Logo" className="logo" />
                        </figure>
                    </Link>
                </div>

                <div className="container-2 overflow-hidden w-full" style={{ height: 'calc(100vh - 175px)' }}>
                    <div className="bg-white p-4 pb-0 pr-0 md:pt-20 md:pl-10 md:m-6 md:rounded-xl flex flex-col-reverse overflow-hidden ">
                        <figure className="-mt-14 md:-mt-36 sm:ml-40 md:ml-72  xl:ml-80 overflow-hidden">
                            <img src={getirHuman} alt="Getir Human" className="h-full" style={{
                                maxWidth: "initial",
                            }} />
                        </figure>

                        <div>
                            <h1 className="text-2xl text-black font-semibold mb-4" style={{ maxWidth: '400px', lineHeight: 1.5 }}>
                                The page you searched for is unavailable
                            </h1>

                            <p className="text-gray-storm mb-10 mr-4" style={{ fontSize: '18px' }}>
                                Page not found. Please return to home page
                            </p>

                            <Link to="/" className="bg-primary text-sm text-white border-0 rounded-lg" style={{ padding: '10px 1rem' }}>
                                Return to home page
                            </Link>
                        </div>
                    </div>
                </div>

                <footer>
                    <div className="bg-gray-background md:bg-white p-4 md:px-6 md:py-7">
                        <div className="container-2">
                            <div className="flex flex-col md:flex-row justify-between items-center text-center md:mt-0">
                                <div className="flex flex-col md:flex-row">
                                    <span className="text-gray-mid md:mr-6" style={{ fontSize: '13px' }}>2021 Getir &copy;</span>
                                    <a className="text-primary mt-3 md:mt-0" style={{ fontSize: '13px' }}>Information Society Services</a>
                                </div>

                                <div className="flex flex-col md:flex-row justify-center gap-y-4 items-center mt-3 md:mt-0">
                                    <ul className="social-links flex gap-x-5 md:mr-6">
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

                                    <button onClick={() => dispatch(toggleLanguageModal(true))} className="flex items-center text-gray-storm p-2 border border-input-border rounded-lg bg-white hover:bg-primary-light hover:text-primary group" style={{ fontSize: '13px' }}>
                                        <Icon icon="codicon:globe" className="mr-2 text-base group-hover:text-primary" />
                                        {language.fullName} <span className="uppercase text-sm font-medium ml-1 group-hover:text-primary">({language.shortName})</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </footer>

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
            </div>
        </div>

    );
}

export default NotFound;