import "./App.css";
import 'jquery/src/jquery';
import React from "react";
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import "./assets_2/css/bootstrap.min.css";
import "./assets_2/css/normalize.css";
import "./assets_2/css/font-awesome.min.css";
import "./assets_2/css/icomoon.css";
import "./assets_2/css/jquery-ui.css";
import "./assets_2/css/owl.carousel.css";
import "./assets_2/css/transitions.css";
import "./assets_2/css/main.css";
import "./assets_2/css/color.css";
import "./assets_2/css/responsive.css";

import './assets_2/js/vendor/jquery-library.js';
import "./assets_2/js/vendor/bootstrap.min.js";
import './assets_2/js/owl.carousel.min.js';
import "./assets_2/js/jquery.vide.min.js"
import './assets_2/js/countdown.js';
import './assets_2/js/jquery-ui.js';
import './assets_2/js/parallax.js';
import './assets_2/js/countTo.js';
import './assets_2/js/appear.js';
import './assets_2/js/gmap3.js';
import './assets_2/js/main.js';

import HomePage from './pages/HomePage.js';
import Page404 from "./pages/Page404.js";
import DetailPage from "./pages/DetailPage.js";
import ContactPage from "./pages/ContactPage.js";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/detail/:id" element={<DetailPage />}></Route>
        <Route path="/contact-us" element={<ContactPage />}></Route>
        <Route path="/404" element={<Page404 />}></Route>
      </Routes>
    </>
  );
};
