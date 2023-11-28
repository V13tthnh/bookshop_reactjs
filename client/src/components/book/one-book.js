import AddToWishList from "./add-to-wish-list";
import BookImg from "./book-img";
import OneBookContent from "./one-book-content";

export default function OneBook(props) {
    //console.log(props.data);
    return (<>
        <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3">
            <div className="tg-postbook">
                <figure className="tg-featureimg">
                    <BookImg data={props.data.ds_hinh_anh}/>
                    <AddToWishList />
                </figure>
                <OneBookContent data={props.data}/>
            </div>
        </div>
    </>)
}