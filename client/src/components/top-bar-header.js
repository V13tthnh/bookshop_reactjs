import { NavLink } from "react-router-dom";

export default function TopBarHeader() {
    const logoutHandler = () => {
        localStorage.removeItem('token');
        //  navigate('/');
    }
    const render = () => {
        if (localStorage.getItem('token') ) {
            const info = JSON.parse(localStorage.getItem('user'));
            console.log(info.name);
            return ( 
                <div className="tg-userlogin" >
                     <h6  className="dangnhap">hello {info.name} <a href="" className="dangxuat" onClick={logoutHandler}>Dang Xuat</a></h6>
                 </div>
          
            );
        }
        else {
            return (
                <>
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#login">
                        Đăng Nhập
                    </button> /
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


                            {/* <figure><a href=""><img src="images/users/img-01.jpg" alt="image description" /></a></figure>
                        <span>Hi, John</span> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>);
}