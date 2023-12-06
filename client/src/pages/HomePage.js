import axios from "axios";
import Footer from "../components/footer";
import Header from "../components/header";
import Home from "../components/home";
import LoginForm from "../components/login-form";

import { useEffect, useState} from 'react';
import RegisterForm from "../components/register-form";
import ForgotPasswordForm from "../components/forgot-password-form";

export default function HomePage(){
    const [productList, setProductList] = useState([]);
    //const [Categories, setCategories] = useState([]);
    useEffect(()=>{
        axios('http://127.0.0.1:8000/api/book')
        .then(response =>  response.data)
        .then(json => setProductList(json.data))
        .catch((error)=>{
            console.log(error)
        })

        // axios('http://127.0.0.1:8000/api/loai-san-pham')
        // .then(response =>  response.data)
        // .then(json => setCategories(json.data))
        // .catch((error)=>{
        //     console.log(error)
        // })

    }, []);
        useEffect(()=>{
        axios('http://127.0.0.1:8000/api/book')
        .then(response =>  response.data)
        .then(json => setProductList(json.data))
        .catch((error)=>{
            console.log(error)
        })

        // axios('http://127.0.0.1:8000/api/loai-san-pham')
        // .then(response =>  response.data)
        // .then(json => setCategories(json.data))
        // .catch((error)=>{
        //     console.log(error)
        // })

    }, []);

   //console.log(productList);
   
    return(<>
        <Header />
        <Home data={productList}/>
        {/* <div class="modal fade" id="login">
    <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" >Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <form action="">
              <div className="form-group">
                <label htmlFor="email">Email address:</label>
                <input type="email" className="form-control" id="email" />
              </div>
              <div className="form-group">
                <label htmlFor="pwd">Password:</label>
                <input type="password" className="form-control" id="pwd" />
              </div>
             
              <button type="submit" className="btn btn-default">Submit</button>
            </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div> */}
        <LoginForm/>
        <RegisterForm/>
        <ForgotPasswordForm/>
        <Footer />
    </>)
}