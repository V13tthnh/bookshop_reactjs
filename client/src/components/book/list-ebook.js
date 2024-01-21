import axios from "axios";
import { useEffect, useState } from "react";

export default function ListEbook() {
    const [ebooks, setEbooks] = useState();
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/list-ebook')
            .then((res) => setEbooks(res.data.data))
            .catch((error) => console.log(error));
    }, []);

    const listEbookRender = () => {
        if (ebooks.length > 0) {
            return (<>{ebooks.map(item => {
                return (<>
                    <div className="col-xs-4 col-sm-4 col-md-6 col-lg-4">
                        <div className="tg-postbook">
                            <figure className="tg-featureimg">
                                <div className="tg-bookimg">
                                    <div className="tg-frontcover"><img src={`http://127.0.0.1:8000/${item}`} alt="image description" /></div>
                                    <div className="tg-backcover"><img src={`http://127.0.0.1:8000/${item}`} alt="image description" /></div>
                                </div>
                                <a className="tg-btnaddtowishlist" href="javascript:void(0);">
                                    <i className="icon-heart"></i>
                                    <span>Thêm vào giỏ hàng</span>
                                </a>
                            </figure>
                            <div className="tg-postbookcontent">
                                <ul className="tg-bookscategories">
                                    <li><a href="javascript:void(0);">Ebook</a></li>
                                    <li><a href="javascript:void(0);">Giả tưởng</a></li>
                                </ul>
                                <div className="tg-booktitle">
                                    <h3><a href="javascript:void(0);">{item.name}</a></h3>
                                </div>
                                <span className="tg-bookwriter">Tác giả: <a href="javascript:void(0);">{'abc'}</a></span>
                                <span className="tg-stars"><span></span></span>
                            </div>
                        </div>
                    </div></>);
            })}</>);
        }
    }
    return (<><section className="tg-sectionspace tg-haslayout">
        <div className="container">
            <div className="row">
                <div className="tg-newrelease">
                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                        <div className="tg-sectionhead">
                            <h2><span></span>Ebook</h2>
                        </div>
                        <div className="tg-description">
                            <p>Sách điện tử.</p>
                        </div>
                        <div className="tg-btns">
                            <a className="tg-btn tg-active" href="javascript:void(0);">Xem tất cả</a>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                        <div className="row">
                            <div className="tg-newreleasebooks">
                                {listEbookRender()}
                                {/* <div className="col-xs-4 col-sm-4 col-md-6 col-lg-4">
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
                                </div> */}
                                {/* <div className="col-xs-4 col-sm-4 col-md-6 col-lg-4">
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
                            </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section></>);
}