import { useEffect, useState } from "react";

export default function Wishlist() {
    const [wishlistItems, setWishlistItems] = useState([]);
    //console.log(localStorage.getItem('cartItems'));

    // Lấy độ dài của Local Storage
    var wishListLength = JSON.parse(localStorage.getItem('wishlist'));

    // Hiển thị độ dài trên trang web
    if (wishListLength !== null) {
        console.log(wishListLength.length);
    }
    //Xóa khỏi wishlist
    const removeWishlist = (id) => {
        var items = wishlistItems.filter((item) => item.id !== id);
        setWishlistItems(items);
        localStorage.setItem('wishlist', JSON.stringify(items));
    }

    useEffect(() => {
        var items = localStorage.getItem('wishlist');
        if (items !== null) {
            setWishlistItems(JSON.parse(items));
        }
    }, []);

    const wishlistUI = () => {
        if (wishlistItems.length > 0) {
            return (<>
                <h3>Wishlist</h3>
                {
                    wishlistItems.map(function (item) {
                        return (
                            <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3">
                                <div className="tg-postbook">
                                    <figure className="tg-featureimg">
                                        <div className="tg-bookimg">
                                            <div className="tg-frontcover"><img src={`http://localhost:8000/` + item.image} alt="image description" />
                                                <button className="tg-btnaddtowishlist" onClick={() => removeWishlist(item.id)}>
                                                    <i className="icon-trash"></i>
                                                    <span>Xóa khỏi wishlist</span>
                                                </button>
                                            </div>
                                            <div className="tg-backcover"><img src="book2.jpg" alt="image description" /></div>
                                        </div>
                                    </figure>
                                    <div className="tg-postbookcontent">
                                        <ul className="tg-bookscategories">
                                            <li><a href="javascript:void(0);">Art &amp; Photography</a></li>
                                        </ul>
                                        <div className="tg-themetagbox"><span className="tg-themetag">sale</span></div>
                                        <div className="tg-booktitle">
                                            <h3><a href="javascript:void(0);">{item.name}</a></h3>
                                        </div>
                                        <span className="tg-bookwriter">By: <a href="javascript:void(0);">Angela Gunning</a></span>
                                        <span className="tg-stars"><span></span></span>
                                        <span className="tg-bookprice">
                                            <ins>$25.18</ins>
                                            <del>$27.20</del>
                                        </span>
                                        <a className="tg-btn tg-btnstyletwo" href="javascript:void(0);">
                                            <i className="fa fa-shopping-basket"></i>
                                            <em>Thêm vào giỏ hàng</em>
                                        </a>
                                    </div>
                                </div>
                            </div>

                        );
                    })
                }
            </>);
        }
    }
    return (<>
        {wishlistUI()}
    </>);
}