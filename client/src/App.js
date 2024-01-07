//import "./App.css";
// import "./assets_2/css/main.css";
import 'jquery/src/jquery';
import React from "react";
import { Routes, Route } from 'react-router-dom';
import Page404 from "./pages/Page404.js";
import DetailPage from "./pages/DetailPage.js";
import ContactPage from "./pages/ContactPage.js";
import WishListPage from './pages/WishListPage.js';
import CartPage from './pages/CartPage.js';
import CheckoutPage from './pages/CheckoutPage.js';
import ProductPage from './pages/ProductPage.js';
import AccountPage from './pages/AccountPage.js';
import HomePage from './pages/HomePage.js';
import LoginPage from './pages/LoginPage.js';

export default function App() {
  return (
    <>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/product" element={<ProductPage />}></Route>
          <Route path="/product/detail/:id" element={<DetailPage />}></Route>
          <Route path="/contact-us" element={<ContactPage />}></Route>
          <Route path="/cart" element={<CartPage />}></Route>
          <Route path="/checkout" element={<CheckoutPage />}></Route>
          <Route path='/wishlist' element={<WishListPage />}></Route>
          <Route path="/account" element={<AccountPage />}></Route>
          <Route path="/not-found" element={<Page404 />}></Route>
        </Routes>
    </>
  );
};
