
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import HotSellingBook from "./book/hot-selling-book";
import SalesBook from "./book/sales-book";
import ListCombo from "./combo/list-combos";
import FeaturedBook from "./book/featured-book";

export default function Home() {
    return (<>
        <HotSellingBook />

        <FeaturedBook />

        <SalesBook />

        <section className="tg-sectionspace tg-haslayout">
            <div className="container">
                <div className="row">
                    <div className="tg-newrelease">
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <div className="tg-sectionhead">
                                <h2><span>Taste The New Spice</span>Sách mới ra mắt</h2>
                            </div>
                            <div className="tg-description">
                                <p>Consectetur adipisicing elit sed do eiusmod tempor incididunt labore toloregna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamcoiars nisiuip commodo consequat aute irure dolor in aprehenderit aveli esseati cillum dolor fugiat nulla pariatur cepteur sint occaecat cupidatat.</p>
                            </div>
                            <div className="tg-btns">
                                <a className="tg-btn tg-active" href="javascript:void(0);">Xem tất cả</a>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <div className="row">
                                <div className="tg-newreleasebooks">
                                    <div className="col-xs-4 col-sm-4 col-md-6 col-lg-4">
                                        <div className="tg-postbook">
                                            <figure className="tg-featureimg">
                                                <div className="tg-bookimg">
                                                    <div className="tg-frontcover"><img src="./assets_2/images/books/img-07.jpg" alt="image description" /></div>
                                                    <div className="tg-backcover"><img src="./assets_2/images/books/img-07.jpg" alt="image description" /></div>
                                                </div>
                                                <a className="tg-btnaddtowishlist" href="javascript:void(0);">
                                                    <i className="icon-heart"></i>
                                                    <span>add to wishlist</span>
                                                </a>
                                            </figure>
                                            <div className="tg-postbookcontent">
                                                <ul className="tg-bookscategories">
                                                    <li><a href="javascript:void(0);">Adventure</a></li>
                                                    <li><a href="javascript:void(0);">Fun</a></li>
                                                </ul>
                                                <div className="tg-booktitle">
                                                    <h3><a href="javascript:void(0);">Help Me Find My Stomach</a></h3>
                                                </div>
                                                <span className="tg-bookwriter">By: <a href="javascript:void(0);">Kathrine Culbertson</a></span>
                                                <span className="tg-stars"><span></span></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xs-4 col-sm-4 col-md-6 col-lg-4">
                                        <div className="tg-postbook">
                                            <figure className="tg-featureimg">
                                                <div className="tg-bookimg">
                                                    <div className="tg-frontcover"><img src="./assets_2/images/books/img-08.jpg" alt="image description" /></div>
                                                    <div className="tg-backcover"><img src="images/books/img-08.jpg" alt="image description" /></div>
                                                </div>
                                                <a className="tg-btnaddtowishlist" href="javascript:void(0);">
                                                    <i className="icon-heart"></i>
                                                    <span>add to wishlist</span>
                                                </a>
                                            </figure>
                                            <div className="tg-postbookcontent">
                                                <ul className="tg-bookscategories">
                                                    <li><a href="javascript:void(0);">Adventure</a></li>
                                                    <li><a href="javascript:void(0);">Fun</a></li>
                                                </ul>
                                                <div className="tg-booktitle">
                                                    <h3><a href="javascript:void(0);">Drive Safely, No Bumping</a></h3>
                                                </div>
                                                <span className="tg-bookwriter">By: <a href="javascript:void(0);">Sunshine Orlando</a></span>
                                                <span className="tg-stars"><span></span></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xs-4 col-sm-4 col-md-3 col-lg-4 hidden-md">
                                        <div className="tg-postbook">
                                            <figure className="tg-featureimg">
                                                <div className="tg-bookimg">
                                                    <div className="tg-frontcover"><img src="./assets_2/images/books/img-09.jpg" alt="image description" /></div>
                                                    <div className="tg-backcover"><img src="images/books/img-09.jpg" alt="image description" /></div>
                                                </div>
                                                <a className="tg-btnaddtowishlist" href="javascript:void(0);">
                                                    <i className="icon-heart"></i>
                                                    <span>add to wishlist</span>
                                                </a>
                                            </figure>
                                            <div className="tg-postbookcontent">
                                                <ul className="tg-bookscategories">
                                                    <li><a href="javascript:void(0);">Adventure</a></li>
                                                    <li><a href="javascript:void(0);">Fun</a></li>
                                                </ul>
                                                <div className="tg-booktitle">
                                                    <h3><a href="javascript:void(0);">Let The Good Times Roll Up</a></h3>
                                                </div>
                                                <span className="tg-bookwriter">By: <a href="javascript:void(0);">Elisabeth Ronning</a></span>
                                                <span className="tg-stars"><span></span></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

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