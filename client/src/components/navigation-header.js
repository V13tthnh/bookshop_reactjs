import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function NavigationHeader(props) {
    const navigate = useNavigate();
    const handleNavigate = (id) => {
        navigate(`/product`);
    }
    return (<><div className="tg-navigationarea">
        <div className="container">
            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <nav id="tg-nav" className="tg-nav">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#tg-navigation" aria-expanded="false">
                                <span className="sr-only"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                        </div>
                        <div id="tg-navigation" className="collapse navbar-collapse tg-navigation">
                            <ul><li className=" current-menu-item">
                                <NavLink to={'/'}>TRANG CHỦ</NavLink>
                            </li>
                                <li className="menu-item-has-children">
                                    <a >THỂ LOẠI</a>
                                    <ul className="sub-menu">
                                        {props.data.map(item => {
                                            return (<li><NavLink to={`/product`}>{item.name}</NavLink></li>);
                                        })}
                                    </ul>
                                </li>
                                <li className="menu-item-has-children">
                                    <NavLink to={'/product'}>TÁC GIẢ</NavLink>
                                    <ul className="sub-menu">
                                        <li><NavLink to={'/product'}>Tác giả</NavLink></li>
                                        <li><NavLink to={'/product'}>Author Detail</NavLink></li>
                                    </ul>
                                </li>
                                <li><NavLink to={'/product'}>BÁN CHẠY</NavLink></li>
                                <li><NavLink to={'/product'}>GIẢM GIÁ</NavLink></li>
                                <li >
                                    <NavLink to={'/product'}>COMBO</NavLink>
                                </li>
                                <li><NavLink to={'/contact-us'}>LIÊN HỆ</NavLink></li>
                                <li><NavLink to={'/contact-us'}>VỀ CHÚNG TÔI</NavLink></li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </div >
    </div ></>)
}