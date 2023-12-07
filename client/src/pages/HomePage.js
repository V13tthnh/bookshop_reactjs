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
   

        // axios('http://127.0.0.1:8000/api/loai-san-pham')
        // .then(response =>  response.data)
        // .then(json => setCategories(json.data))
        // .catch((error)=>{
        //     console.log(error)
        // })

    // }, []);
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
        <LoginForm/>
        <RegisterForm/>
        <ForgotPasswordForm/>
        <Footer />
    </>)
}