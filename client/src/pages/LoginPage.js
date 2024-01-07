import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/footer";
import { NavLink, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { setLoading, loginHandler, setError } from "../reducers/authSlice";
import Swal from "sweetalert2";
import Header from "../components/header";

export default function LoginPage() {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.auth.user);
    const error = useSelector(state => state.auth.error);
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const navigate = useNavigate();
    const input_email = useRef();
    const input_password = useRef();

    const handleLogin = async () => {
        var email = input_email.current.value;
        var password = input_password.current.value;
        dispatch(setLoading());
        try {
            // Gọi API để xác thực thông tin đăng nhập
            dispatch(loginHandler({ email, password }));
            if (isLoggedIn) {
                Swal.fire({title: "Đăng nhập thành công!",icon: "success"});
            } 
            navigate('/');
           
        } catch (error) {
            // Xử lý lỗi khi đăng nhập không thành công
            console.log(error);
        }
    };

    return (<>
        <Header />
        <div className="container">
            <div className="app-content main-content mt-0 mb-3">
                <div className="side-app">
                    <div className="main-container container-fluid">
                        <div className="page-header">
                            <div>
                                <h1 className="page-title">Đăng nhập</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
                <div class="form-group">
                    <label for="first_name">Email</label>
                    <input type="email" class="form-control" placeholder="Nhập email" ref={input_email} />
                </div>
                <div class="form-group">
                    <label for="last_name">Mật khẩu</label>
                    <input type="password" class="form-control" placeholder="Nhập mật khẩu" ref={input_password} />
                </div>
                <div className="col-md-6">
                    <NavLink to="/register">Chưa có tài khoản?</NavLink>
                </div>
                <div className="col-md-6">
                    <NavLink to="/register">Quên mật khẩu</NavLink>
                </div>

                <button onClick={handleLogin} class="btn btn-primaryF">Đăng nhập</button>

            
        </div>
        <Footer /></>)
}