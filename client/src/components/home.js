
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import HotSellingBook from "./book/hot-selling-book";
import SalesBook from "./book/sales-book";
import ListCombo from "./combo/list-combos";
import FeaturedBook from "./book/featured-book";
import ListEbook from "./book/list-ebook";

export default function Home() {
    return (<>
        <HotSellingBook />

        <FeaturedBook />

        <SalesBook />

        <ListEbook/>

        <ListCombo />

        <section className="tg-parallax tg-bgcollectioncount tg-haslayout" data-z-index="-100" data-appear-top-offset="600" data-parallax="scroll" data-image-src="images/parallax/bgparallax-04.jpg">
            <div className="tg-sectionspace tg-collectioncount tg-haslayout">
                <div className="container">
                    <div className="row">
                        <div id="tg-collectioncounters" className="tg-collectioncounters">
                            <div className="tg-collectioncounter tg-drama">
                                <div className="tg-collectioncountericon">
                                    <i className="icon-bubble"></i>
                                </div>
                                <div className="tg-titlepluscounter">
                                    <h2>Drama</h2>
                                    <h3 data-from="0" data-to="6179213" data-speed="8000" data-refresh-interval="50">6,179,213</h3>
                                </div>
                            </div>
                            <div className="tg-collectioncounter tg-horror">
                                <div className="tg-collectioncountericon">
                                    <i className="icon-heart-pulse"></i>
                                </div>
                                <div className="tg-titlepluscounter">
                                    <h2>Kinh dị</h2>
                                    <h3 data-from="0" data-to="3121242" data-speed="8000" data-refresh-interval="50">3,121,242</h3>
                                </div>
                            </div>
                            <div className="tg-collectioncounter tg-romance">
                                <div className="tg-collectioncountericon">
                                    <i className="icon-heart"></i>
                                </div>
                                <div className="tg-titlepluscounter">
                                    <h2>Tình cảm</h2>
                                    <h3 data-from="0" data-to="2101012" data-speed="8000" data-refresh-interval="50">2,101,012</h3>
                                </div>
                            </div>
                            <div className="tg-collectioncounter tg-fashion">
                                <div className="tg-collectioncountericon">
                                    <i className="icon-star"></i>
                                </div>
                                <div className="tg-titlepluscounter">
                                    <h2>Thời trang</h2>
                                    <h3 data-from="0" data-to="1158245" data-speed="8000" data-refresh-interval="50">1,158,245</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>)
}