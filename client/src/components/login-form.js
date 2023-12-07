import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRef } from "react";
export default function LoginForm(){
  const navigate = useNavigate();
  // const[email,setEmail]=useState({});
  // const [password, setPassword] = useState({});
  const[isLogginIn,setLogginIn]=useState(false);
  const [token, setToken] = useState('');
  const input_email = useRef();
  const input_password =useRef({});

  const handleLogin =  async ()=>{
    var email =input_email.current.value;
    var password=input_password.current.value;
  
    try {
      // Gọi API để xác thực thông tin đăng nhập
      const response = await axios.post(`http://127.0.0.1:8000/api/login`, { email,password }, { 'Content-Type': 'application/json'});

      // Nếu đăng nhập thành công, lưu trạng thái đăng nhập và token
      setLogginIn(true);
      setToken(response.data.token);
      localStorage.setItem('token', response.data.access_token);
      console.log('Login successful!', response.data);
      console.log('Token!', response.data.access_token);
     
      
      var user= await axios.get(`http://127.0.0.1:8000/api/me`,{
        headers: {
          'Authorization': "Bearer " + localStorage.getItem('token'),
          'Accept': 'application/json',
        }
      });
          
      localStorage.setItem('user', JSON.stringify(user.data))
      console.log('Data fetched successfully:',  localStorage.getItem("user"));
      navigate('/');
      window.location.reload(false); //LỆNH LOAD LẠI TRANG
    } catch (error) {
      // Xử lý lỗi khi đăng nhập không thành công
      console.error('Login failed:', error);
    }
    
  };

    return(<>
 <div class="modal fade" id="forgot">
  <div class="modal-dialog">
    <div class="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal">&times;</button>
            <h4 className="modal-title">Modal Header</h4>
          </div>
          <div className="modal-body">
            <form action="">
              <div className="form-group">
                <label htmlFor="email">Email address:</label>
                <input type="email" className="form-control" id="email" />
              </div>
              <div className="form-group">
                <label htmlFor="pwd">Password:</label>
                <input type="password" className="form-control" id="pwd"  />
              </div>
              <button type="submit" className="btn btn-default">Submit</button>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>



    <div class="modal fade" id="login">
  <div class="modal-dialog">
    <div class="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal">&times;</button>
            <h4 className="modal-title">Modal Header</h4>
          </div>
          <div className="modal-body">
     
              <div className="form-group">
                <label htmlFor="email">Email address:</label>
                <input type="email" className="form-control"ref={input_email} />
              </div>
              <div className="form-group">
                <label htmlFor="pwd">Password:</label>
                <input type="password" className="form-control" ref={input_password} />
                <button type="button" data-toggle="modal" data-target="forgot">Quên mật khẩu</button><br/>
              </div>
              <a type="button" data-toggle="modal" data-target="#forgot">
                            Quên mật khẩu
                        </a>
            
           
              <button type="submit" className="btn btn-default" onClick={handleLogin}>Submit</button>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
</>);
}