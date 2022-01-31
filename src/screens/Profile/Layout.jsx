import React from 'react';

import { Outlet, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";

import Navbar from '../../components/Navbar';
import MobileHeader from '../../components/MobileHeader';
import Header from '../../components/Header';
import AddressSwitch from '../../components/AddressSwitch';
import Footer from '../../components/Footer';
import AddDeliveryAddressModal from '../../components/AddDeliveryAddressModal';
import LeftPanel from "./LeftPanel";
import LanguageChangeForm from "../../components/LanguageChangeForm";

import "./Layout.css";
import OutServiceArea from '../../components/OutServiceArea';
import EditProfileInfo from './EditProfileInfo';
import { toggleEditProfileInfoModal, toggleLanguageModal, toggleOutServiceAreaModal } from '../../app/appSlice';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../components/Modal';
import ActivationModal from '../../auth/ActivationModal';
import { Button } from '../../components/Buttons';

function Layout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isAuth, user } = useSelector(state => state.auth);
    const { isAddDeliveryAddressModalOpen,
        isEditProfileInfoModalOpen,
        isLanguageModalOpen,
        isActivationModalOpen,
        isAddInvoiceModalOpen,
        isAddressSelectModalOpen,
        isOutServiceAreaModalOpen
    } = useSelector(state => state.app);

    const [width, setWidth] = React.useState(window.innerWidth);

    let currentAddress = user?.addresses.find(address => address.active);

    let outServiceArea = false;

    if (isAuth && currentAddress) {
        outServiceArea = !currentAddress.available;
    }

    let hidden = isAddDeliveryAddressModalOpen || isEditProfileInfoModalOpen || isLanguageModalOpen
        || isActivationModalOpen || isAddInvoiceModalOpen || isAddressSelectModalOpen
        || isOutServiceAreaModalOpen;

    React.useEffect(() => {
        window.addEventListener('resize', () => {
            setWidth(window.innerWidth);
        });

    }, [width]);

    React.useEffect(() => {
        if (!isAuth) {
            navigate('/');
        }
    }, [isAuth, navigate]);

    React.useEffect(() => {
        document.body.style.overflow = hidden ? 'hidden' : 'auto';

    }, [hidden]);

    return (
        <>
            <Navbar />
            {width < 768 ? <MobileHeader /> : <Header />}
            <AddressSwitch />

            {outServiceArea && <OutServiceArea />}

            <div className="container md:flex md:gap-x-4 md:pt-16 md:pb-20 md:px-8 xl:px-0">
                <LeftPanel />

                <div className="main-content">
                    <Outlet />
                </div>
            </div>

            <Footer />

            {isEditProfileInfoModalOpen && (
                <Modal center onClose={() => dispatch(toggleEditProfileInfoModal(false))} className="edit-profile-info-modal">
                    <ModalHeader closeBtn className="py-9 px-4 md:px-8">
                        <h3>Update Account Info</h3>
                    </ModalHeader>
                    <ModalBody className="px-4 md:px-8 rounded-b-xl pb-8">
                        <EditProfileInfo />
                    </ModalBody>
                </Modal>
            )}

            {isAddDeliveryAddressModalOpen && <AddDeliveryAddressModal />}
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
        </>
    );
}

export default Layout;
