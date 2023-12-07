import "../App.css";
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from "../reducers/counter";
import axios from "axios";
import { useEffect } from "react";
export default function Cart() {
    // const [productList, setProductList] = useState([]);
    // // const [Categories, setCategories] = useState([]);

    // useEffect(()=>{
    //     axios('http://127.0.0.1:8000/api/book')
    //     .then(response =>  response.data)
    //     .then(json => setProductList(json.data))
    //     .catch((error)=>{
    //         console.log(error)
    //     })
    // }, []);

    const count = useSelector((state) => state.count);

    const dispatch = useDispatch();

    return (<>


        <div className="container bootdey"  >
            <div className="row">
                <div className="  col-md-9 col-sm-8">
                    <div className="row bootstrap snippets">
                        <div className="clearfix visible-sm" />
                        {/* Cart */}
                        <div className=" col-md-12 ">
                            <div className="col-lg-12 col-sm-12">
                                <span className="title">SHOPPING CART</span>
                            </div>
                            <div className="col-lg-12 col-sm-12 hero-feature">
                                <div className="table-responsive">
                                    <table className="table table-bordered tbl-cart">
                                        <thead>
                                            <tr>
                                                <td className="hidden-xs">Image</td>
                                                <td>Product Name</td>
                                                <td className="td-qty">Quantity</td>
                                                <td>Unit Price</td>
                                                <td>Sub Total</td>
                                                <td>Remove</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="hidden-xs">
                                                    <a href="#">
                                                        <img src="./images/book1.jpg" alt="Age Of Wisdom Tan Graphic Tee" title width={47} height={47} />
                                                    </a>
                                                </td>
                                                <td><a href="#">Age Of Wisdom Tan Graphic Tee</a>
                                                </td>

                                                <td>
                                                    <div className="input-group bootstrap-touchspin">
                                                        <span className="input-group-btn">
                                                            <button className="btn btn-default bootstrap-touchspin-down" type="number" onClick={() => dispatch(decrement())}>-</button>
                                                        </span>
                                                        {count}
                                                        <span className="input-group-addon bootstrap-touchspin-prefix" style={{ display: 'none' }} /><span className="input-group-addon bootstrap-touchspin-postfix" style={{ display: 'none' }} />
                                                    
                                                        <span className="input-group-btn">
                                                            <button className="btn btn-default bootstrap-touchspin-up" type="number" onClick={() => dispatch(increment())}>+</button>
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="price">$ 122.21</td>
                                                <td>$ 122.21</td>
                                                <td className="text-center">
                                                    <a href="#" className="remove_cart" rel={2}>
                                                        <i className="fa fa-trash-o" />
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="hidden-xs">
                                                    <a href="#">
                                                        <img src="./images/book2.jpg" alt="Adidas Men Red Printed T-shirt" title width={47} height={47} />
                                                    </a>
                                                </td>
                                                <td><a href="#">Adidas Men Red Printed T-shirt</a>
                                                </td>

                                                <td>
                                                    <div className="input-group bootstrap-touchspin"><span className="input-group-btn"><button className="btn btn-default bootstrap-touchspin-down" type="button" >-</button></span><span className="input-group-addon bootstrap-touchspin-prefix" style={{ display: 'none' }} /><input type="text" className="input-qty form-control text-center" style={{ display: 'block' }} />{count}<span className="input-group-addon bootstrap-touchspin-postfix" style={{ display: 'none' }} /><span className="input-group-btn"><button className="btn btn-default bootstrap-touchspin-up" type="button" >+</button></span></div>
                                                </td>
                                                <td className="price">$ 20.63</td>
                                                <td>$ 41.26</td>
                                                <td className="text-center">
                                                    <a href="#" className="remove_cart" rel={1}>
                                                        <i className="fa fa-trash-o" />
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan={6} align="right">Total</td>
                                                <td className="total" colSpan={2}><b>$ 163.47</b>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>

                        {/* End Cart */}
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="ibox">
                        <div className="ibox-title">
                            <h5>Cart Summary</h5>
                        </div>
                        <div className="ibox-content">
                            <span>
                                Total
                            </span>
                            <h2 className="font-bold">
                                $390,00
                            </h2>
                            <hr />
                            <span className="text-muted small">
                                *For United States, France and Germany applicable sales tax will be applied
                            </span>
                            <div className="m-t-sm">
                                <div className="btn-group">
                                    <a href="#" className="btn btn-primary btn-sm"><i className="fa fa-shopping-cart" /> Checkout</a>
                                    <a href="#" className="btn btn-white btn-sm"> Cancel</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </div >

    </>);
}