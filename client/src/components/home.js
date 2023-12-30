import InnerBanner from "./inner-banner";
import BooksList from "./book/books-list";
import SmallBanner from "./book/small-banner";
import SidebarCategories from "./categories/sidebar-categories";
import axios from "axios";
import { useEffect, useState } from 'react';
import Banner from "./banner";
import BookSort from "./book/book-sort";

export default function Home(props) {
    const [listCategories, setListCategories] = useState([]);
    useEffect(() => {
        axios('http://127.0.0.1:8000/api/category')
            .then(reponse => reponse.data)
            .then(json => setListCategories(json.data))
            .catch((error) => {
                console.log(error)
            })
    }, []);

    return (<>
     
        <Banner />
        <main id="tg-main" className="tg-main tg-haslayout">
            <div className="tg-sectionspace tg-haslayout">
                <div className="container">
                    <div className="row">
                        <div id="tg-twocolumns" className="tg-twocolumns">
                            <div className="col-xs-12 col-sm-8 col-md-8 col-lg-9 pull-right">
                                <div id="tg-content" className="tg-content">
                                    <div className="tg-products">
                                        {/* <div className="tg-sectionhead">
                                            <h2><span>People’s Choice</span>Bestselling Books</h2>
                                        </div> */}
                                        {/* <SmallBanner /> */}
                                        {/* <div className="tg-productgrid">
                                            <BookSort />    
                                        </div> */}
                                        <BooksList data={props.data} />
                                    </div>
                                </div>
                            </div>
                            <SidebarCategories data={listCategories} itemsPerPage={4}/>
                        </div>
                    </div>
                </div>
            </div>
        </main></>)
}