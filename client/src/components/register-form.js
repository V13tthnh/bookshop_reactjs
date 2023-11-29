export default function RegisterForm(){
    return(
        <>
        <div id="register" className="modal fade">
      <div className="modal-dialog">

        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal">&times;</button>
            <h4 className="modal-title">Modal Header</h4>
          </div>
          <div className="modal-body">
           

      
          <form className="well form-horizontal">
            <fieldset>
              <div className="form-group">
                <label className="col-md-3 control-label">Họ tên</label>
                <div className="col-md-12 inputGroupContainer">
                  <div className="input-group"><span className="input-group-addon"><i className="glyphicon glyphicon-user" /></span><input id="fullName" name="fullName" placeholder="Full Name" className="form-control" required="true"  type="text" /></div>
                </div>
                <label className="col-md-3 control-label">Địa chỉ </label>
                <div className="col-md-12 inputGroupContainer">
                  <div className="input-group"><span className="input-group-addon"><i className="glyphicon glyphicon-home" /></span><input id="address" name="address" placeholder="Address " className="form-control" required="true"  type="text" /></div>
                </div>
                <label className="col-md-3 control-label">Mật khẩu</label>
                <div className="col-md-12 inputGroupContainer">
                  <div className="input-group"><span className="input-group-addon"><i className="glyphicon glyphicon-home" /></span><input id="city" name="password" placeholder="password" className="form-control" required="true"  type="password" /></div>
                </div>
                <label className="col-md-1 control-label">Email</label>
                <div className="col-md-12 inputGroupContainer">
                  <div className="input-group"><span className="input-group-addon"><i className="glyphicon glyphicon-envelope" /></span><input id="email" name="email" placeholder="Email" className="form-control" required="true"  type="text" /></div>
                </div>  
                <label className="col-md-1 control-label">Điện thoại</label>
                <div className="col-md-12 inputGroupContainer">
                  <div className="input-group"><span className="input-group-addon"><i className="glyphicon glyphicon-earphone" /></span><input id="phoneNumber" name="phone" placeholder="Phone" className="form-control" required="true"  type="text" /></div>
                </div>
             </div>
             <button type="submit" className="btn btn-default">Đăng ký</button>
            </fieldset>
          </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default" data-dismiss="modal">Đóng</button>
          </div>
        </div>
      </div>
    </div>
        </>
    );
}