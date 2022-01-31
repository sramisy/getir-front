import React from "react";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Dinero from "dinero.js"

import Home from "./screens/Home";
import Categories from "./screens/Categories";
import NotFound from "./screens/NotFound"
import Basket from "./screens/Basket";
import Checkout from "./screens/Checkout";
import Promotions from "./screens/Promotions";
import Layout from "./screens/Profile/Layout";
import Account from "./screens/Profile/Account";
import Addresses from "./screens/Profile/Addresses";
import AllAddresses from "./screens/Profile/AllAddresses";
import AddAddress from "./screens/Profile/AddAddress";
import Favorites from "./screens/Profile/Favorites";
import Orders from "./screens/Profile/Orders";
import PaymentMethods from "./screens/Profile/PaymentMethods";
import Invoices from "./screens/Profile/Invoices";
import ChangePassword from "./screens/Profile/ChangePassword";
import Communications from "./screens/Profile/Communications";
import Products from "./product/Products";

import NewProducts from "./product/NewProducts";
import AllPaymentMethods from "./screens/Profile/AllPaymentMethods";
import AddPaymentMethod from "./screens/Profile/AddPaymentMethod";

Dinero.globalLocale = "tr-TR";


function App() {

  return ( 
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="categories" element={<Categories />}>
          <Route path=":categoryId/:subcategoryId" element={<Products />} />
          <Route index element={<NewProducts />} />
        </Route> 
        <Route path="basket" element={<Basket />} /> 
        <Route path="checkout" element={<Checkout />} /> 
        <Route path="promotions"element={<Promotions />} />

        <Route path="profile" element={<Layout /> }>
          <Route index element={<Account />} /> 
          <Route path="addresses" element={<Addresses />}>
            <Route index element={<AllAddresses />} /> 
            <Route path="add-address" element={<AddAddress />} /> 
          </Route>

          <Route path="favorites" element={<Favorites />} /> 
          <Route path="orders" element={<Orders />} /> 
          <Route path="payment-methods" element={<PaymentMethods />}>
            <Route index element={<AllPaymentMethods />} />
            <Route path="add-payment-method" element={<AddPaymentMethod />} />
          </Route>
          <Route path="invoices" element={<Invoices />} /> 
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="communications" element={<Communications />} /> 
        </Route>

        <Route path="*" element={<NotFound />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
