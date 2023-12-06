export default function AddToWishList(product) {
    const add = () => {
        var book={id:product.data.id,name:product.data.name};
		var cartItems=localStorage.getItem('cartItems');
		if(cartItems==null){ 
			cartItems=[book];
		}else{
			cartItems=JSON.parse(cartItems);
			cartItems.push(book);
		}
		localStorage.setItem('cartItems',JSON.stringify(cartItems));
		alert('Them sach vao wishlist thanh cong');
    }
    
    return (<>
        <a className="tg-btnaddtowishlist" href="javascript:void(0);">
            <i className="icon-heart"></i>
            <span onClick={add}>add to wishlist</span>
        </a>
    </>);
}