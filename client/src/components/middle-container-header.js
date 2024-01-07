import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { deleteAll } from "../reducers/cartSlice";
import Swal from 'sweetalert2';

export default function MiddleContainerHeader() {
	const dispatch = useDispatch();
	const cartItems = useSelector(state => state.cart.carts);
	const [wishListCount, setWishListCount] = useState(0);
	const token = useSelector(state => state.auth.token);

	useEffect(() => {
		var wishListItems = localStorage.getItem('wishlist');
		if (wishListItems !== null) {
			setWishListCount(JSON.parse(wishListItems).length);
		}
	}, []);

	const clearCartHandler = () => {
		Swal.fire({
			title: "Bạn chắc chứ?",
			text: "Bạn có muốn xóa toàn bộ sản phẩm khỏi giỏ hàng!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			cancelButtonText: "Hủy",
			confirmButtonText: "Xóa!"
		}).then((result) => {
			if (result.isConfirmed) {
				dispatch(deleteAll());
				Swal.fire({title: "Xóa thành công!",text: "Sản phẩm đã được xóa khỏi giỏ hàng.",icon: "success"});
			}
		});
	}

	const renderIconUser = () => {
		if(token !== null){
			return(<><div className="dropdown tg-themedropdown tg-miniuserdropdown">
			<NavLink to={'/account'} id="tg-miniuser" className="tg-btnthemedropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				<span className="tg-themebadge"></span>
				<i className="icon-user"></i>
			</NavLink>
		</div></>);
		}
	}

	const cartUI = () => {
		var total = 0;
		if (cartItems.length > 0) {
			cartItems.map(item => {
				total += item.quantity * item.unit_price;
			});
			return (<>
				<div className="dropdown-menu tg-themedropdownmenu" aria-labelledby="tg-minicart">
					<div className="tg-minicartbody">
						{
							cartItems.map((item, index) => {
								if (index <= 2) {
									return (<div className="tg-minicarproduct">
										<img src={`http://localhost:8000/` + item.image} style={{ width: '150px', height: '150px' }} />
										<div className="tg-minicarproductdata">
											<h5><a href="javascript:void(0);">{item.name}</a></h5>
											<h6><a href="javascript:void(0);">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.unit_price)}</a></h6>
										</div>
									</div>)
								}
							})
						}
					</div>
					<div className="tg-minicartfoot">
						<a className="tg-btnemptycart" onClick={clearCartHandler} href="javascript:void(0);">
							<i className="fa fa-trash-o"></i>
							<span>Xóa toàn bộ</span>
						</a>
						<span className="tg-subtotal">Tổng tiền: <strong>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total)}</strong></span>

						<div className="tg-btns">
							<NavLink to="/cart" className="tg-btn tg-active" href="javascript:void(0);">Xem giỏ hàng</NavLink>
							<NavLink to="/checkout" className="tg-btn" href="javascript:void(0);">Thanh toán</NavLink>
						</div>
					</div>
				</div>
			</>)
		} else {
			<div className="dropdown-menu tg-themedropdownmenu" aria-labelledby="tg-minicart">
				<div className="tg-minicartbody">
					Không có sản phẩm nào trong giỏ hàng!
				</div>
				<div className="tg-minicartfoot">
					<a className="tg-btnemptycart" onClick={clearCartHandler} href="javascript:void(0);">
						<i className="fa fa-trash-o"></i>
						<span>Xóa toàn bộ</span>
					</a>
					<span className="tg-subtotal">Tổng tiền: <strong>35.78</strong></span>
					<div className="tg-btns">
						<NavLink to="/cart" className="tg-btn tg-active" href="javascript:void(0);">Xem giỏ hàng</NavLink>
						<a className="tg-btn" href="javascript:void(0);">Thanh toán</a>
					</div>
				</div>
			</div>
		}
	}

	return (<>
		<div className="tg-middlecontainer">
			<div className="container">
				<div className="row">
					<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
						<strong className="tg-logo"><NavLink to={'/'}><img src="./assets_2/images/logo.png" alt="company name here" /></NavLink></strong>
						<div className="tg-wishlistandcart">
							<div className="dropdown tg-themedropdown tg-wishlistdropdown">
								<NavLink to="/wishlist">
									<a href="javascript:void(0);" id="tg-wishlisst" className="tg-btnthemedropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
										<span className="tg-themebadge">{wishListCount}</span>
										<i className="icon-heart"></i>
										<span></span>
									</a>
								</NavLink>
								<div className="dropdown-menu tg-themedropdownmenu" aria-labelledby="tg-wishlisst">
									<div className="tg-description"><p>No products were added to the wishlist!</p></div>
								</div>
							</div>
							<div className="dropdown tg-themedropdown tg-minicartdropdown">
								<a href="javascript:void(0);" id="tg-minicart" className="tg-btnthemedropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
									<span className="tg-themebadge">{cartItems.length}</span>
									<i className="icon-cart"></i>
									<span></span>
								</a>
								{cartUI()}
							</div>
							{renderIconUser()}
							
						</div>
						<div className="tg-searchbox">
							<form className="tg-formtheme tg-formsearch">
								<fieldset>
									<input type="text" name="search" className="typeahead form-control" placeholder="Search by title, author, keyword, ISBN..." />
									<button type="submit"><i className="icon-magnifier"></i></button>
								</fieldset>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</>);
}