import { NavLink } from "react-router-dom";

export default function TopBarHeader() {
    return (<>
                    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
       sdknbdkajbakdjn
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
        <div className="tg-topbar">
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <ul className="tg-addnav">
                            <li>
                                <a href="javascript:void(0);">
                                    <i className="icon-envelope"></i>
                                    <em>Contact</em>
                                </a>
                            </li>
                            <li>
                                <a href="javascript:void(0);">
                                    <i className="icon-question-circle"></i>
                                    <em>Help</em>
                                </a>
                            </li>
                        </ul>
                        <div className="dropdown tg-themedropdown tg-currencydropdown">
                            <a href="javascript:void(0);" id="tg-currenty" className="tg-btnthemedropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="icon-earth"></i>
                                <span>Currency</span>
                            </a>
                            <ul className="dropdown-menu tg-themedropdownmenu" aria-labelledby="tg-currenty">
                                <li>
                                    <a href="javascript:void(0);">
                                        <i>£</i>
                                        <span>British Pound</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:void(0);">
                                        <i>$</i>
                                        <span>Us Dollar</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:void(0);">
                                        <i>€</i>
                                        <span>Euro</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="tg-userlogin">
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                       Đăng Nhập
                    </button>
                     /<a href="">Đăng ký</a>
     
                            {/* <figure><a href=""><img src="images/users/img-01.jpg" alt="image description" /></a></figure>
                        <span>Hi, John</span> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </>);
}