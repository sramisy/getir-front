import {
  createSlice
} from "@reduxjs/toolkit";

const initialState = {
  isLanguageModalOpen: false,
  language: {
    fullName: "English",
    shortName: "en",
  },
  isSignupModalOpen: false,
  isLoginModalOpen: false,
  isActivationModalOpen: false,
  isOtpModalOpen: false,
  isAddDeliveryAddressModalOpen: false,
  isAddressSelectModalOpen: false,
  isOutServiceAreaModalOpen: false,
  isEditProfileInfoModalOpen: false,
  isAddInvoiceModalOpen: false,
  isAddPaymentModalOpen: false,
  isInvoicesModalOpen: false,
  isPromosModalOpen: false,
  isPromoDetailsModalOpen: false,
  isAddPromoCodeModalOpen: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleLanguageModal: (state, action) => {
      state.isLanguageModalOpen = action.payload;
    },
    updateLanguage: (state, action) => {
      state.language = action.payload;
    },
    toggleSignupModal: (state, action) => {
      state.isSignupModalOpen = action.payload;
    },
    toggleLoginModal: (state, action) => {
      state.isLoginModalOpen = action.payload;
    },
    toggleActivationModal: (state, action) => {
      state.isActivationModalOpen = action.payload;
    },
    toggleOtpModal: (state, action) => {
      state.isOtpModalOpen = action.payload;
    },
    toggleAddDeliveryAddressModal: (state, action) => {
      state.isAddDeliveryAddressModalOpen = action.payload;
    },
    toggleAddressSelectModal: (state, action) => {
      state.isAddressSelectModalOpen = action.payload;
    },
    toggleOutServiceAreaModal: (state, action) => {
      state.isOutServiceAreaModalOpen = action.payload;
    },
    toggleEditProfileInfoModal: (state, action) => {
      state.isEditProfileInfoModalOpen = action.payload;
    },
    toggleAddInvoiceModal: (state, action) => {
      state.isAddInvoiceModalOpen = action.payload;
    },
    toggleAddPaymentModal: (state, action) => {
      state.isAddPaymentModalOpen = action.payload;
    },
    toggleInvoicesModal: (state, action) => {
      state.isInvoicesModalOpen = action.payload;
    },
    togglePromosModal: (state, action) => {
      state.isPromosModalOpen = action.payload;
    },
    togglePromoDetailsModal: (state, action) => {
      state.isPromoDetailsModalOpen = action.payload;
    },
    toggleAddPromoCodeModal: (state, action) => {
      state.isAddPromoCodeModalOpen = action.payload;
    },
  },
});

export const {
  toggleLanguageModal,
  updateLanguage,
  toggleSignupModal,
  toggleLoginModal,
  toggleActivationModal,
  toggleOtpModal,
  toggleAddDeliveryAddressModal,
  toggleAddressSelectModal,
  toggleOutServiceAreaModal,
  toggleEditProfileInfoModal,
  toggleAddInvoiceModal,
  toggleAddPaymentModal,
  toggleInvoicesModal,
  togglePromosModal,
  togglePromoDetailsModal,
  toggleAddPromoCodeModal,
} = appSlice.actions;

export default appSlice.reducer;