import { NavLink } from "react-router-dom";

export default function TopBarHeader() {
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
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#login">
                            Đăng Nhập
                        </button>/
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#register">
                            Đăng ký
                        </button>

     
                            {/* <figure><a href=""><img src="images/users/img-01.jpg" alt="image description" /></a></figure>
                        <span>Hi, John</span> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </>);
}