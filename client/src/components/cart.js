import "../App.css";
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, quantityChange, deleteCart } from "../reducers/cartSlice";
import Swal from 'sweetalert2';
import { NavLink, Navigate, useNavigate } from "react-router-dom";

export default function Cart() {
    const navigation = useNavigate();
    var color = { color: 'white' };
    var image_css = { height: '200px', with: '300px' };
    const cartItems = useSelector(state => state.cart.carts);
    const checkLogin = useSelector(state => state.auth.token);
    const dispatch = useDispatch();
    

    const deleteHandler = (id) => {
        Swal.fire({
            title: "Bạn có chắc chứ?",
            text: "Bạn có muốn xóa sản phẩm này khỏi giỏ hàng không!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Không xóa",
            confirmButtonText: "Xóa khỏi giỏ hàng!"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteCart(id));
                Swal.fire({title: "Xóa thành công!",text: "Sản phẩm đã được xóa khỏi giỏ hàng.",icon: "success"});
            }
        });
    }

    const checkLoggedIn = () => {
        if(checkLogin !== null){
            navigation('/checkout');
        }else {
            Swal.fire({title: "Rất tiếc!",text: "Bạn cần đăng nhập để thanh toán.", icon: "warning"});
        }
    }

    const totalUI = () => {
        var total = 0;
        if (cartItems.length > 0) {
            cartItems.map(item => {
                total += item.quantity * item.unit_price;
            });
            return (<> <table className="table border-top-0">
                <tr>
                    <td className="border-top-0">Tổng tiền</td>
                    <td className="text-end border-top-0">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total)}</td>
                </tr>
                <tr>
                    <td className="border-top-0">Giảm giá</td>
                    <td className="text-end border-top-0">5%</td>
                </tr>
                {/* <tr>
                <td className="border-top-0">Phí giao hàng</td>
                <td className="text-end border-top-0">Giao hàng tiêu chuẩn(15.000 đ)</td>
            </tr> */}
                <tr>
                    <td className="fs-20 border-top-0">Tổng tiền thực tế</td>
                    <td className="text-end fs-20 border-top-0">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total)}</td>
                </tr>
            </table></>)
        }
    }

    const cartUI = () => {
        if (cartItems.length > 0) {
            return (<>
                <table className="table table-bordered table-vcenter  mb-0">
                    <thead>
                        <tr className="border-top">
                            <th className="text-center">#</th>
                            <th>Ảnh</th>
                            <th>Tên sách</th>
                            <th>Giá</th>
                            <th>Số lượng</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cartItems.map((item, index) => {
                                return (
                                    <tr>
                                        <td className="text-center">{index + 1}</td>
                                        <td>
                                            <img src={`http://localhost:8000/` + item.image} style={image_css} />
                                        </td>
                                        <td>{item.name}</td>
                                        <td>{item.unit_price}</td>
                                        <td>
                                            <div className="tg-quantityholder">
                                                <em className="minus" style={{ width: '25px' }} onClick={() => dispatch(quantityChange({ id: item.id, quantity: item.quantity - 1 }))}>-</em>
                                                <input type="text" style={{ width: '60px' }} className="result" value={item.quantity} id="quantity1" name="quantity" />
                                                <em className="plus" style={{ width: '25px' }} onClick={() => dispatch(quantityChange({ id: item.id, quantity: item.quantity + 1 }))}>+</em>
                                            </div>

                                        </td>
                                        <td>
                                            <a href="javascript:void(0)" className="btn btn-square btn-danger-light me-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Save for Wishlist"><i className="icon icon-heart  fs-13"></i></a>
                                            <a href="javascript:void(0)" onClick={() => deleteHandler(item.id)} className="btn btn-square btn-info-light me-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Remove"><i className="icon icon-trash  fs-13"></i></a>
                                        </td>
                                    </tr>)
                            })
                        }
                    </tbody>
                </table></>);
        }
        return "Không có sản phẩm nào trong giỏ hàng!";
    }

    return (<>
        <div className="container">
            <div className="app-content main-content mt-0 mb-3">
                <div className="side-app">
                    <div className="main-container container-fluid">
                        <div className="page-header">
                            <div>
                                <h1 className="page-title">Giỏ hàng</h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xl-8 col-md-12">
                                <div className="card cart">
                                    <div className="card-header border-bottom">
                                        <h3 className="card-title">Thông tin giỏ hàng</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            {cartUI()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-md-12">
                                {/* <div className="card">
                                <div className="card-header border-bottom">
                                    <h3 className="card-title">Have coupon?</h3>
                                </div>
                                <div className="card-body">
                                    <form>
                                        <div className="form-group">
                                            <div className="input-group"> <input type="text" id="myInput" className="form-control coupon" placeholder="Coupon code" /> <span className="input-group-btn"> <button className="btn btn-primary btn-apply coupon">Apply</button> </span> </div>
                                        </div>
                                    </form>
                                </div>
                            </div> */}
                                <div className="card">
                                    <div className="card-header border-bottom">
                                        <h3 className="card-title">Thông tin chi tiết</h3>
                                    </div>
                                    <div className="card-body">
                                        {totalUI()}
                                    </div>
                                    <div className="card-footer">
                                        <div className="step-footer text-end">
                                            {/* <a href="products.html" className="btn btn-primary my-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className=" w-inner-icn" enable-background="new 0 0 24 24" viewBox="0 0 24 24"><path d="M17.5,11.5H7.7069702l4.6465454-4.6464844c0.1972046-0.1932373,0.2003784-0.5097656,0.0071411-0.7069702c-0.1932983-0.1972046-0.5098267-0.2004395-0.7070312-0.0071411c-0.0023804,0.0023193-0.0047607,0.0046997-0.0071411,0.0071411l-5.5,5.5c-0.1953125,0.1950684-0.1956177,0.5113525-0.0005493,0.706665c0.0001221,0.0001831,0.0002441,0.0003052,0.0005493,0.0003052l5.5,5.5c0.1972046,0.1932373,0.5137329,0.1900635,0.7069702-0.0071411c0.1905518-0.194397,0.1905518-0.5054932,0-0.6998901L7.7069702,12.5H17.5c0.276123,0,0.5-0.223877,0.5-0.5S17.776123,11.5,17.5,11.5z" /></svg>
                                            Continue Shopping
                                        </a> */}
                                            {/* <a href="checkout.html" className="btn btn-info my-1">
                                            Check out
                                            <svg xmlns="http://www.w3.org/2000/svg" className=" w-inner-icn" enable-background="new 0 0 24 24" viewBox="0 0 24 24"><path d="M17.8536377,11.6466064c-0.000061-0.000061-0.0001221-0.000061-0.0001221-0.0001221l-5.5-5.5c-0.1986084-0.1918335-0.5151367-0.1863403-0.7069702,0.0122681c-0.1871338,0.1937866-0.1871338,0.5009766,0,0.6947021L16.2930298,11.5H6.5C6.223877,11.5,6,11.723877,6,12s0.223877,0.5,0.5,0.5h9.7930298l-4.6465454,4.6464844c-0.1986084,0.1918335-0.2041016,0.5083618-0.0122681,0.7069702c0.1918335,0.1986694,0.5084229,0.2041626,0.7070312,0.0123291c0.0041504-0.0040283,0.0082397-0.0081177,0.0122681-0.0123291l5.5-5.5C18.0487671,12.1583252,18.0487671,11.8418579,17.8536377,11.6466064z" /></svg>
                                        </a> */}
                                            <section className="container">
                                                <div className="d-flex justify-content-start row" >
                                                    <div className="col-md-6">
                                                        <NavLink to="/" className="btn btn-primary">Tiếp tục mua hàng</NavLink>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <a onClick={checkLoggedIn} className="btn btn-danger">Thanh toán</a>
                                                    </div>
                                                </div>
                                            </section>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={color}>
                00
            </div>
        </div>
    </>);
}