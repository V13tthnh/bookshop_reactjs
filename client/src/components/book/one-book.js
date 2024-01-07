import AddToWishList from "./add-to-wish-list";
import BookImg from "./book-img";
import OneBookContent from "./one-book-content";

export default function OneBook(props) {
    console.log(props.data);
    // Hàm thêm sản phẩm vào giỏ hàng
	const addToCart = () => {
		var book = {
			id: props.data.id,
			name: props.data.name,
			image: props.data.images[0]?.front_cover,
			quantity: 1,
			unit_price: props.data.unit_price
		};
		var cartItems = localStorage.getItem('cartItems');
		if (cartItems === null) {
			cartItems = [book];
		} else {
			cartItems = JSON.parse(cartItems);
			//Kiểm tra sản phẩm đã tồn tại thì cập nhật lại số lượng
			var i = 0;
			for (; i < cartItems.length; i++) {
				if (cartItems[i].id === book.id) {
					cartItems[i].quantity += book.quantity;
					break;
				}
			}
			//Nếu không có sản phẩm trùng thì thêm sanPham vào cartItems
			if (i === cartItems.length) {
				cartItems.push(book)
			}
		}
		//Cập nhật lại key cartItems trong localStorage
		localStorage.setItem('cartItems', JSON.stringify(cartItems));
		alert('Them sach vao giỏ hàng thanh cong');
	}
    const addToWishList = () => { 
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
                        <span onClick={addToWishList}>add to wishlist</span>
                    </a>
                </figure>
                <OneBookContent data={props.data}/>
            </div>
        </div>
    </>)
}