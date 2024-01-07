import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { deleteAll } from "../reducers/cartSlice";
import { removeAddressData, setAddressData } from "../reducers/addressSlice";

export default function Checkout() {
    var color = { color: 'white' };
    const dispatch = useDispatch();
    
    const navigation = useNavigate()
    const input_firstName = useRef();
    const input_lastName = useRef();
    const input_address = useRef();
    const input_phone = useRef();
    const input_note = useRef();
    const input_country = useRef();
    const input_province = useRef();
    const input_district = useRef();
    const cartItems = useSelector(state => state.cart.carts);
    const userData = useSelector(state => state.auth.userData);
    const address = useSelector(state => state.address.value);
    const token = useSelector(state => state.auth.token);

    const [dataProvince, setDataProvince] = useState([]);
    const [dataDistrict, setDataDistrict] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');

    
    useEffect(() => {
        if (token === null) {
            navigation('/cart');
            Swal.fire({
                title: "Rấc tiếc!",
                icon: "Bạn cần đăng nhập để thực hiện thanh toán!"
            });
        }
        dispatch(setAddressData());
        setDataProvince(address);
    }, []);

    const handleProvinceChange = (event) => {
        const districts = dataProvince.filter(item => item.code == event.target.value);
        setDataDistrict(districts[0].districts);
        setSelectedProvince(event.target.value);
        setSelectedDistrict('');
    };

    const handleDistrictChange = (event) => {
        setSelectedDistrict(event.target.value);
    };

    const checkOut = async () => {
        console.log(input_province.current.options[selectedProvince].text);
        const jsonOrders = {
            "customer_id": userData.id,
            "name": input_firstName.current.value + ' ' + input_lastName.current.value,
            "address": input_address.current.value + ', ' + input_district.current.value + ', ' + input_province.current.options[selectedProvince].text + ', ' + input_country.current.value,
            "phone": input_phone.current.value,
            "shipping_fee": 45000,
            "note": input_note.current.value,
            "book_id": [],
            "book_quantity": [],
            "combo_id": [],
            "combo_quantity": [],
            "book_price": [],
            "combo_price": [],
            "book_total": [],
            "combo_total": []
        }
        console.log(cartItems.length);
        console.log(cartItems);
        for (let i = 0; i < cartItems.length; i++) {
            if (!cartItems[i].isCombo) {
                jsonOrders.book_id[i] = cartItems[i].id;
                jsonOrders.book_quantity[i] = cartItems[i].quantity;
                jsonOrders.book_price[i] = cartItems[i].unit_price;
                jsonOrders.book_total[i] = cartItems[i].unit_price * cartItems[i].quantity;
            } else {
                jsonOrders.combo_id[i] = cartItems[i].comboId;
                jsonOrders.combo_quantity[i] = cartItems[i].quantity;
                jsonOrders.combo_price[i] = cartItems[i].unit_price;
                jsonOrders.combo_total[i] = cartItems[i].unit_price * cartItems[i].quantity;
            }
        }

        axios.post(`http://127.0.0.1:8000/api/order`, jsonOrders, {
            headers: {
                'Content-Type': "application/json",
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                Swal.fire({title: response.data.message,text: "Đơn hàng của bạn đang chờ kiểm duyệt!",icon: "success"});
                dispatch(deleteAll());
                navigation('/');
            })
            .then(error => {
                console.error('Fail to fetch data!', error);
            });
    }

    const cartUI = () => {
        if (cartItems.length > 0) {
            return (<>
                {cartItems.map(item => {
                    return (<> <tr>
                        <td className="p-4">
                            <div className="media align-items-center">
                                <img src={`http://localhost:8000/` + item.image} className="d-block ui-w-40 ui-bordered mr-4" alt="" />
                                <div className="media-body">
                                    <NavLink to={`/product/detail/${item.id}`} className="d-block text-dark">{item.name}</NavLink>
                                </div>
                            </div>
                        </td>
                        <td className="text-right font-weight-semibold align-middle p-4">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.unit_price)}</td>
                        <td className="align-middle p-4"><input type="text" className="form-control text-center" value={item.quantity} /></td>
                        <td className="text-right font-weight-semibold align-middle p-4">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.unit_price * item.quantity)}</td>
                    </tr></>);
                })}
            </>);
        }
    }
    
    return (<><div className="container ">
        <div className="app-content main-content mt-0 ">
            <div className="side-app">
                <div className="main-container container-fluid ">
                    <div className="page-header">
                        <div>
                            <h1 className="page-title">Thanh toán</h1>
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-xl-8 col-md-12">
                            <div className="card">
                                <div className="card-header border-bottom">
                                    <h3 className="card-title">Thông tin người nhận</h3>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-6 col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Họ <span className="text-red">*</span></label>
                                                <input type="text" className="form-control" placeholder="Nhập họ" ref={input_lastName} />
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Tên <span className="text-red">*</span></label>
                                                <input type="text" className="form-control" placeholder="Nhập tên" ref={input_firstName} />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label className="form-label">Số điện thoại <span className="text-red">*</span></label>
                                                <input type="email" className="form-control" placeholder="Ví dụ: 0907133xxx(10 ký tự số)" ref={input_phone} />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label for="country">Quốc gia:</label>
                                                <option >
                                                </option>
                                                <select className="form-control" id="country" ref={input_country}>
                                                    <option value="Việt Nam">Việt Nam</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label for="province">Tỉnh thành:</label>
                                                <select className="form-control" id="province" onChange={handleProvinceChange} ref={input_province} >
                                                    <option value={null}>
                                                        Chọn tỉnh/thành phố
                                                    </option>
                                                    {dataProvince.map((province) => (
                                                        <option key={province.code} value={province.code}>
                                                            {province.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label for="district">Quận huyện:</label>
                                                <select className="form-control" id="district" ref={input_district} onChange={handleDistrictChange} disabled={selectedProvince === ''}>
                                                    <option value={null}>
                                                        Chọn quận/huyên
                                                    </option>
                                                    {dataDistrict.map((district) => (
                                                        <option key={district.code} value={district.name}>
                                                            {district.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label className="form-label">Địa chỉ giao hàng <span className="text-red">*</span></label>
                                                <input type="text" className="form-control" placeholder="Ví dụ: Tên đường, số nhà, phường, xã..." ref={input_address} />
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label className="form-label">Ghi chú <span className="text-red">*</span></label>
                                                <textarea className="form-control" placeholder="Ghi chú" ref={input_note}></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header border-bottom">
                                    <h3 className="card-title">Hình thức thanh toán</h3>
                                </div>
                                <div className="card-body">
                                    <div className="card-pay">
                                        <ul className="tabs-menu nav checkout">
                                            <li><a href="#tab20" className="active" data-bs-toggle="tab"><i className="fa fa-credit-card"></i> VNPay</a></li>
                                            {/* <li><a href="#tab21" data-bs-toggle="tab"><i className="fa fa-paypal"></i>  Tiền mặt</a></li> */}
                                            <li><input checked type="radio"/><span> <i className="fa fa-money"></i> Tiền mặt</span></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-12">
                            <div className="card cart">
                                <div className="card-header border-bottom">
                                    <h3 className="card-title">Danh sách sản phẩm đơn hàng</h3>
                                </div>
                                <div className="card-body">
                                        <div className="card-ck">
                                            <div className="card-body">
                                                <div className="table-responsive">
                                                    <table className="table table-bordered m-0">
                                                        <thead>
                                                            <tr>
                                                                <th className="text-center py-3 px-4" style={{ minWidth: '400px' }}>Tên sách &amp; loại sách</th>
                                                                <th className="text-center py-3 px-4" style={{ minWidth: '100px' }}>Giá</th>
                                                                <th className="text-center py-3 px-4" style={{ minWidth: '120px' }}>Số lượng</th>
                                                                <th className="text-center py-3 px-4" style={{ minWidth: '100px' }}>Tổng tiền</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {cartUI()}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                                <div className="card-footer text-end">
                                    <section className="container">
                                        <div className="d-flex justify-content-center row" >
                                            <div className="col-md-2">
                                                <NavLink to="/cart" className="btn btn-primary">Trở về giỏ hàng</NavLink>
                                            </div>
                                            <div className="col-md-7">
                                               
                                            </div>
                                            <div className="col-md-2">
                                                <a onClick={checkOut} className="btn btn-danger">Thanh toán</a>
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
    </>)
}