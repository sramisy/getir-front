import {
    configureStore
} from "@reduxjs/toolkit";

import appReducer from "./app/appSlice";
import authReducer from './auth/authSlice';
import basketReducer from './basket/basketSlice';
import favoriteReducer from './favorite/favoriteSlice';

const store = configureStore({
    reducer: {
        app: appReducer,
        auth: authReducer,
        basket: basketReducer,
        favorite: favoriteReducer,
    }
});

export default store;