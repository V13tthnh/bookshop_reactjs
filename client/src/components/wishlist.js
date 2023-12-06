import { useEffect, useState } from "react";

export default function Wishlist() {
    const [wishlistItems, setWishlistItems] = useState([]);
    //console.log(localStorage.getItem('cartItems'));
    
    // Lấy độ dài của Local Storage
    var wishListLength = localStorage.getItem('wishlist');

    // Hiển thị độ dài trên trang web
    if (wishListLength !== null) {
        console.log(wishListLength.length);
    }
   
    
    useEffect(() => {
        var items = localStorage.getItem('wishlist');
        if (items != null){
            setWishlistItems(JSON.parse(items));
        }
    }, []);

    const removeWishlist = (id) => {
        //alert(id);
        var items = wishlistItems.filter((item) => item.id !== id);
        setWishlistItems(items);
        localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
        console.log(wishlistItems);
        if(wishlistItems.length == 1){
            localStorage.removeItem('wishlist');
        }
    }

    const wishlistUI = () => {
        if (wishlistItems.length > 0) {
            return (<>
                    <h3>Wishlist</h3>
                {
                wishlistItems.map(function (item) {
                    return (
                        <div class="col-xs-6 col-sm-6 col-md-4 col-lg-3">
                            <div class="tg-postbook">
                                <figure class="tg-featureimg">
                                    <div class="tg-bookimg">
                                        <div class="tg-frontcover"><img src="book3.jpg" alt="image description" />
                                        <button class="tg-btnaddtowishlist" onClick={()=>removeWishlist(item.id)}>
                                            <i class="icon-trash"></i>
                                            <span>Xóa khỏi wishlist</span>
                                        </button>
                                        </div>
                                        <div class="tg-backcover"><img src="book2.jpg" alt="image description" /></div>
                                    </div>
                                </figure>
                                <div class="tg-postbookcontent">
                                    <ul class="tg-bookscategories">
                                        <li><a href="javascript:void(0);">Art &amp; Photography</a></li>
                                    </ul>
                                    <div class="tg-themetagbox"><span class="tg-themetag">sale</span></div>
                                    <div class="tg-booktitle">
                                        <h3><a href="javascript:void(0);">{item.name}</a></h3>
                                    </div>
                                    <span class="tg-bookwriter">By: <a href="javascript:void(0);">Angela Gunning</a></span>
                                    <span class="tg-stars"><span></span></span>
                                    <span class="tg-bookprice">
                                        <ins>$25.18</ins>
                                        <del>$27.20</del>
                                    </span>
                                    <a class="tg-btn tg-btnstyletwo" href="javascript:void(0);">
                                        <i class="fa fa-shopping-basket"></i>
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