import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout, setUser } from "../reducers/authSlice";
import { getStoredState } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

export default function TopBarHeader() {
    const userData = useSelector(state => state.auth.userData);
    const token = useSelector(state => state.auth.token);
    const isLogin = useSelector(state => state.auth.isLoggedIn);
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout());
    }

    const render = () => {
        if (isLogin) {
            return (
                <div className="tg-userlogin" >
                    <figure>
                        <NavLink to="/account"><img src="assets_2/images/users/user01.jpg" alt="image description" /></NavLink>
                    </figure>
                    <li><a href="" className="dangxuat" onClick={logoutHandler}>Đăng xuất</a></li>
                </div>
            );
        }
        else {
            return (
                <>
                    <NavLink to="/login" type="button" className="btn btn-primary" >
                        Đăng Nhập
                    </NavLink>
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#register">
                        Đăng ký
                    </button>
                </>
            );
        }
    }
    return (<>
        <div className="tg-topbar">
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <ul className="tg-addnav">
                            <li>
                                <a href="javascript:void(0);">
                                    <i className="icon-envelope"></i>
                                    <em>Liên hệ</em>
                                </a>
                            </li>
                            <li>
                                <a href="javascript:void(0);">
                                    <i className="icon-question-circle"></i>
                                    <em>Cứu</em>
                                </a>
                            </li>
                        </ul>

                        <div className="tg-userlogin">
                            {render()}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>);
}