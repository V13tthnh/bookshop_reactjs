import AddToWishList from "./add-to-wish-list";
import BookImg from "./book-img";
import OneBookContent from "./one-book-content";

export default function OneBook(props) {
    console.log(props.data);
    const add = () => { 
        var book={id:props.data.id,name:props.data.name};
		var cartItems=localStorage.getItem('wishlist');
		if(cartItems==null){ 
			cartItems=[book];
		}else{
			cartItems=JSON.parse(cartItems);
			cartItems.push(book);
		}
		localStorage.setItem('wishlist',JSON.stringify(cartItems));
		alert('Them sach vao wishlist thanh cong');
    }
    
    return (<>
        <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3">
            <div className="tg-postbook">
                <figure className="tg-featureimg">
                    {/* <BookImg data={props.data.ds_hinh_anh}/> */}
                    <a className="tg-btnaddtowishlist" href="javascript:void(0);">
                        <i className="icon-heart"></i>
                        <span onClick={add}>add to wishlist</span>
                    </a>
                </figure>
                <OneBookContent data={props.data}/>
            </div>
        </div>
    </>)
}