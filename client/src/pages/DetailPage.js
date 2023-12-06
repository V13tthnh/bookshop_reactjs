import Footer from "../components/footer";
import Header from "../components/header";
import OneBookDetail from "../components/book/one-book-detail";
import { useEffect, useState } from 'react';
import { Params, useParams } from 'react-router-dom';
export default function DetailPage() {
    const params=useParams();
    const[chitietSP,setchitietSP]=useState({});
	useEffect(()=>{
	async function getDataFromAPI(){
		var response = await fetch(`http://localhost:8000/api/book/${params.id}`)
		var json=await response.json();
		setchitietSP(json.data)
	}
	getDataFromAPI();
	},[]);
    return (
    <>
        <Header />
        <OneBookDetail data={chitietSP}/>
        <Footer />
    </>)
}