import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { redirect } from "react-router-dom";
import BookImg from "./book-img";
import OneBookAuthor from "./one-book-author";
import OneBookPrice from "./one-book-price";
import OneBookTitle from "./one-book-title";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
export default function OneBookDetail(product) {
	const [productList, setProductList] = useState([]);
	const [currentProduct, setCurrentProduct] = useState(product);

	const fetchData = async (categoryId) => {
		try {
		  const response = await axios.get(`http://127.0.0.1:8000/api/books/${categoryId}`);
		  console.log("Response data:", response.data.data);
		  setProductList(response.data.data);
		} catch (error) {
		  console.error(error);
		}
	  };
	
	  useEffect(() => {
		fetchData(product.data.category_id);
	  }, [product.data.category_id]);
	// Sử dụng useEffect để gọi API và cập nhật state 
	// useEffect(() => {
	// 	const fetchData = async () => {
	// 	  try {
	// 		const response = await axios.get(
	// 		  `http://127.0.0.1:8000/api/books/${product.data.category_id}`
	// 		);
	// 		setProductList(response.data.data);
	// 	  } catch (error) {
	// 		console.error(error);
	// 	  }
	// 	};

	// 	fetchData();
	//   }, [product.data.category_id]);


	// Hàm thêm sản phẩm vào wishlist 
	const add = () => {
		// console.log(product.data.author.name);
		var book = { id: product.data.id, name: product.data.name };
		var cartItems = localStorage.getItem('wishlist');
		if (cartItems == null) {
			cartItems = [book];
		} else {
			cartItems = JSON.parse(cartItems);
			cartItems.push(book);
		}
		localStorage.setItem('wishlist', JSON.stringify(cartItems));
		alert('Them sach vao wishlist thanh cong');
	}
	const handleRelatedProductClick = (selectedProduct) => {
		console.log("Clicked on related product:", selectedProduct);
		setCurrentProduct(selectedProduct);
		setTimeout(() => {
			window.location.reload();
		  }, 100);
		// You can perform additional actions here if needed.
	  };
	// Map qua danh sách sản phẩm để hiển thị các sản phẩm liên quan
	const bookItems = productList.map(book => (<>
		<div key={book.id} class="col-xs-6 col-sm-6 col-md-4 col-lg-4">
			<div class="tg-postbook">
				<figure class="tg-featureimg">
					<div className="tg-bookimg">
						<div class="tg-frontcover"><img src={`http://localhost:8000/` + book.image_list[0].front_cover} alt="image description" /></div>
						<div class="tg-backcover"><img src={`http://localhost:8000/` + book.image_list[0].back_cover} alt="image description" /></div>
					</div>
					<a class="tg-btnaddtowishlist" href="javascript:void(0);">
						<i class="icon-heart"></i>
						<span>Thêm vào danh sách yêu thích</span>
					</a>
				</figure>
				<div class="tg-postbookcontent">
					<ul class="tg-bookscategories">
						<li><a href="javascript:void(0);">Art &amp; Photography</a></li>
					</ul>
					<div class="tg-themetagbox"><span class="tg-themetag">sale</span></div>
					<div class="tg-booktitle">
						{/* <h3> <NavLink to={`/detail/${book.id}`}>{book.name}</NavLink></h3> */}
						{/* <h3 ><a href="" onClick={() => handleRelatedProductClick(book)}>{book.name}</a></h3> */}
						{/* <NavLink to={`/detail/${book.id}`} onClick={() => handleRelatedProductClick(book)}>{book.name}</NavLink> */}
						<NavLink to={`/detail/${book.id}`} onClick={() => handleRelatedProductClick(book)}>{book.name}  </NavLink>
						<Link to={`/detail/${book.id}`} onClick={() => handleRelatedProductClick(book.id)}>
							{book.name}
						</Link>
						{/* <h3><NavLink to={`/detail/${book.id}`} href="javascript:void(0);">{book.name}</NavLink></h3> */}
					</div>

					<span class="tg-bookwriter">Bởi tác giả: <a href="javascript:void(0);">{book.author.name}</a></span>
					<span class="tg-stars"><span></span></span>

					<OneBookPrice data={book.unit_price} />
					<div className="but">
						<a class="tg-btn tg-btnstyletwo" href="javascript:void(0);">
							<div className="btn">
								<i class="fa fa-shopping-basket"></i>
								<em>Thêm vào giỏ hàng</em></div>
						</a>
					</div>
				</div>
			</div>
		</div>
	</>));

	return (<>
		<main id="tg-main" className="tg-main tg-haslayout">
			<div className="tg-sectionspace tg-haslayout">
				<div className="container">
					<div className="row">
						<div id="tg-twocolumns" className="tg-twocolumns">
							<div className="col-xs-12 col-sm-8 col-md-8 col-lg-9 pull-right">
								<div id="tg-content" className="tg-content">
									<div className="tg-productdetail">
										<div className="row">
											<div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
												<div className="tg-postbook">
													<figure className="tg-featureimg">
														{/* <img src={`http://localhost:8000/` + product.data.image_list[0].front_cover} alt="image description" /> */}
														<BookImg data={product.data.image_list} />
													</figure>
													<div className="tg-postbookcontent">
														{/* <span className="tg-bookprice">
															<ins>{product.data.unit_price}</ins>
															<del>$27.20</del>
															<ins>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.data.unit_price)}</ins>
														</span> */}
														<OneBookPrice data={product.data.unit_price} />
														<span className="tg-bookwriter">You save $4.02</span>
														<ul className="tg-delevrystock">
															<li><i className="icon-rocket"></i><span>Free delivery worldwide</span></li>
															<li><i className="icon-checkmark-circle"></i><span>Dispatch from the USA in 2 working days </span></li>
															<li><i className="icon-store"></i><span>Status: <em>In Stock</em></span></li>
														</ul>
														<div className="tg-quantityholder">
															<em className="minus">-</em>
															<input type="text" className="result" value="0" id="quantity1" name="quantity" />
															<em className="plus">+</em>
														</div>
														<a className="tg-btn tg-active tg-btn-lg" href="javascript:void(0);">Thêm vào giỏ hàng</a>
														<a className="tg-btnaddtowishlist" href="javascript:void(0);">
															<span onClick={add}>Thêm vào danh sách yêu thích</span>
														</a>
													</div>
												</div>
											</div>
											<div className="col-xs-12 col-sm-12 col-md-8 col-lg-8">
												<div className="tg-productcontent">
													<ul className="tg-bookscategories">
														<li><a href="javascript:void(0);">Art &amp; Photography</a></li>
													</ul>
													<div className="tg-themetagbox"><span className="tg-themetag">sale</span></div>
													<div className="tg-booktitle">
														<h3>{product.data.name}</h3>
													</div>
													{/* <span className="tg-bookwriter">Bởi tác giả: <a href="javascript:void(0);">{product.data.author.name}</a></span> */}
													<OneBookAuthor data={product.data.author?.name} />
													{/* {console.log(product.data.author.name)} */}
													<span className="tg-stars"><span></span></span>
													<span className="tg-addreviews"><a href="javascript:void(0);">Add Your Review</a></span>
													<div className="tg-share">
														<span>Share:</span>
														<ul className="tg-socialicons">
															<li className="tg-facebook"><a href="javascript:void(0);"><i className="fa fa-facebook"></i></a></li>
															<li className="tg-twitter"><a href="javascript:void(0);"><i className="fa fa-twitter"></i></a></li>
															<li className="tg-linkedin"><a href="javascript:void(0);"><i className="fa fa-linkedin"></i></a></li>
															<li className="tg-googleplus"><a href="javascript:void(0);"><i className="fa fa-google-plus"></i></a></li>
															<li className="tg-rss"><a href="javascript:void(0);"><i className="fa fa-rss"></i></a></li>
														</ul>
													</div>
													<div className="tg-description">
														<p>{product.data.description} <a href="javascript:void(0);">...</a></p>
													</div>
													<div className="tg-sectionhead">
														<h2>Thông tin sản phẩm</h2>
													</div>
													<ul className="tg-productinfo">
														<li><span>Mã hàng:</span><span>{product.data.code}</span></li>
														<li><span>Định dạng:</span><span>{product.data.format}</span></li>
														<li><span>Số trang:</span><span>{product.data.num_pages}</span></li>
														<li><span>Kích cỡ:</span><span>{product.data.size}</span></li>
														<li><span>Trọng lượng:</span><span>{product.data.weight} g</span></li>
														<li><span>Năm xuất bản:</span><span>{product.data.year}</span></li>
														<li><span>Nhà xuất bản:</span><span>{product.data.publisher?.name}</span></li>
														<li><span>Ngôn ngữ:</span><span>{product.data.language}</span></li>
														<li><span>Người phiên dịch:</span><span>{product.data.translator}</span></li>
														<li><span>Other Fomate:</span><span>CD-Audio, Paperback, E-Book</span></li>
													</ul>

												</div>
											</div>
											<div className="tg-productdescription">
												<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
													<div className="tg-sectionhead">
														<h2>Đánh giá sản phẩm</h2>
													</div>
													<ul className="tg-themetabs" role="tablist">
														<li role="presentation" className="active"><a href="#description" data-toggle="tab">Description</a></li>
														<li role="presentation"><a href="#review" data-toggle="tab">Reviews</a></li>
													</ul>
													<div className="tg-tab-content tab-content">
														<div role="tabpanel" className="tg-tab-pane tab-pane active" id="description">
															<div className="tg-description">
																<p>Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veni quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenden
																	voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
																<figure className="tg-alignleft">
																	<img src="images/placeholdervtwo.jpg" alt="image description" />
																	<iframe src="https://www.youtube.com/embed/aLwpuDpZm1k?rel=0&amp;controls=0&amp;showinfo=0"></iframe>
																</figure>
																<ul className="tg-liststyle">
																	<li><span>Sed do eiusmod tempor incididunt ut labore et dolore</span></li>
																	<li><span>Magna aliqua enim ad minim veniam</span></li>
																	<li><span>Quis nostrud exercitation ullamco laboris nisi ut</span></li>
																	<li><span>Aliquip ex ea commodo consequat aute dolor reprehenderit</span></li>
																	<li><span>Voluptate velit esse cillum dolore eu fugiat nulla pariatur</span></li>
																	<li><span>Magna aliqua enim ad minim veniam</span></li>
																	<li><span>Quis nostrud exercitation ullamco laboris nisi ut</span></li>
																</ul>
																<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam remmata aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enimsam
																	voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos quistatoa.</p>
															</div>
														</div>
														<div role="tabpanel" className="tg-tab-pane tab-pane" id="review">
															<div className="tg-description">
																<p>Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veni quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenden
																	voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
																<figure className="tg-alignleft">
																	<img src="images/placeholdervtwo.jpg" alt="image description" />
																	<iframe src="https://www.youtube.com/embed/aLwpuDpZm1k?rel=0&amp;controls=0&amp;showinfo=0"></iframe>
																</figure>
																<ul className="tg-liststyle">
																	<li><span>Sed do eiusmod tempor incididunt ut labore et dolore</span></li>
																	<li><span>Magna aliqua enim ad minim veniam</span></li>
																	<li><span>Quis nostrud exercitation ullamco laboris nisi ut</span></li>
																	<li><span>Aliquip ex ea commodo consequat aute dolor reprehenderit</span></li>
																	<li><span>Voluptate velit esse cillum dolore eu fugiat nulla pariatur</span></li>
																	<li><span>Magna aliqua enim ad minim veniam</span></li>
																	<li><span>Quis nostrud exercitation ullamco laboris nisi ut</span></li>
																</ul>
																<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam remmata aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enimsam
																	voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos quistatoa.</p>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div className="tg-aboutauthor">
												<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
													<div className="tg-sectionhead">
														<h2>About Author</h2>
													</div>
													<div className="tg-authorbox">
														<figure className="tg-authorimg">
															<img src="images/author/imag-24.jpg" alt="image description" />
														</figure>
														<div className="tg-authorinfo">
															<div className="tg-authorhead">
																<div className="tg-leftarea">
																	<div className="tg-authorname">
																		<h2>Kathrine Culbertson</h2>
																		<span>Author Since: June 27, 2017</span>
																	</div>
																</div>
																<div className="tg-rightarea">
																	<ul className="tg-socialicons">
																		<li className="tg-facebook"><a href="javascript:void(0);"><i className="fa fa-facebook"></i></a></li>
																		<li className="tg-twitter"><a href="javascript:void(0);"><i className="fa fa-twitter"></i></a></li>
																		<li className="tg-linkedin"><a href="javascript:void(0);"><i className="fa fa-linkedin"></i></a></li>
																		<li className="tg-googleplus"><a href="javascript:void(0);"><i className="fa fa-google-plus"></i></a></li>
																		<li className="tg-rss"><a href="javascript:void(0);"><i className="fa fa-rss"></i></a></li>
																	</ul>
																</div>
															</div>
															<div className="tg-description">
																<p>Laborum sed ut perspiciatis unde omnis iste natus sit voluptatem accusantium doloremque laudantium totam rem aperiam eaque ipsa quae ab illo inventore veritatis etation.</p>
															</div>
															<a className="tg-btn tg-active" href="javascript:void(0);">View All Books</a>
														</div>
													</div>
												</div>
											</div>
											<div className="tg-relatedproducts">
												<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
													<div className="tg-sectionhead">
														<h2><span>Sách liên quan</span>Có thể bạn sẽ thích</h2>
														<a className="tg-btn" href="javascript:void(0);">View All</a>
													</div>
													{bookItems}
												</div>

											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-xs-12 col-sm-4 col-md-4 col-lg-3 pull-left">
								<aside id="tg-sidebar" className="tg-sidebar">
									<div className="tg-widget tg-widgetsearch">
										<form className="tg-formtheme tg-formsearch">
											<div className="form-group">
												<button type="submit"><i className="icon-magnifier"></i></button>
												<input type="search" name="search" className="form-group" placeholder="Search by title, author, key..." />
											</div>
										</form>
									</div>
									<div className="tg-widget tg-catagories">
										<div className="tg-widgettitle">
											<h3>Categories</h3>
										</div>
										<div className="tg-widgetcontent">
											<ul>
												<li><a href="javascript:void(0);"><span>Art &amp; Photography</span><em>28245</em></a></li>
												<li><a href="javascript:void(0);"><span>Biography</span><em>4856</em></a></li>
												<li><a href="javascript:void(0);"><span>Children’s Book</span><em>8654</em></a></li>
												<li><a href="javascript:void(0);"><span>Craft &amp; Hobbies</span><em>6247</em></a></li>
												<li><a href="javascript:void(0);"><span>Crime &amp; Thriller</span><em>888654</em></a></li>
												<li><a href="javascript:void(0);"><span>Fantasy &amp; Horror</span><em>873144</em></a></li>
												<li><a href="javascript:void(0);"><span>Fiction</span><em>18465</em></a></li>
												<li><a href="javascript:void(0);"><span>Fod &amp; Drink</span><em>3148</em></a></li>
												<li><a href="javascript:void(0);"><span>Graphic, Anime &amp; Manga</span><em>77531</em></a></li>
												<li><a href="javascript:void(0);"><span>Science Fiction</span><em>9247</em></a></li>
												<li><a href="javascript:void(0);"><span>View All</span></a></li>
											</ul>
										</div>
									</div>
									<div className="tg-widget tg-widgettrending">
										<div className="tg-widgettitle">
											<h3>Trending Products</h3>
										</div>
										<div className="tg-widgetcontent">
											<ul>
												<li>
													<article className="tg-post">
														<figure><a href="javascript:void(0);"><img src="images/products/img-04.jpg" alt="image description" /></a></figure>
														<div className="tg-postcontent">
															<div className="tg-posttitle">
																<h3><a href="javascript:void(0);">Where The Wild Things Are</a></h3>
															</div>
															<span className="tg-bookwriter">By: <a href="javascript:void(0);">Kathrine Culbertson</a></span>
														</div>
													</article>
												</li>
												<li>
													<article className="tg-post">
														<figure><a href="javascript:void(0);"><img src="images/products/img-05.jpg" alt="image description" /></a></figure>
														<div className="tg-postcontent">
															<div className="tg-posttitle">
																<h3><a href="javascript:void(0);">Where The Wild Things Are</a></h3>
															</div>
															<span className="tg-bookwriter">By: <a href="javascript:void(0);">Kathrine Culbertson</a></span>
														</div>
													</article>
												</li>
												<li>
													<article className="tg-post">
														<figure><a href="javascript:void(0);"><img src="images/products/img-06.jpg" alt="image description" /></a></figure>
														<div className="tg-postcontent">
															<div className="tg-posttitle">
																<h3><a href="javascript:void(0);">Where The Wild Things Are</a></h3>
															</div>
															<span className="tg-bookwriter">By: <a href="javascript:void(0);">Kathrine Culbertson</a></span>
														</div>
													</article>
												</li>
												<li>
													<article className="tg-post">
														<figure><a href="javascript:void(0);"><img src="images/products/img-07.jpg" alt="image description" /></a></figure>
														<div className="tg-postcontent">
															<div className="tg-posttitle">
																<h3><a href="javascript:void(0);">Where The Wild Things Are</a></h3>
															</div>
															<span className="tg-bookwriter">By: <a href="javascript:void(0);">Kathrine Culbertson</a></span>
														</div>
													</article>
												</li>
											</ul>
										</div>
									</div>
									<div className="tg-widget tg-widgetinstagram">
										<div className="tg-widgettitle">
											<h3>Instagram</h3>
										</div>
										<div className="tg-widgetcontent">
											<ul>
												<li>
													<figure>
														<img src="images/instagram/img-01.jpg" alt="image description" />
														<figcaption><a href="javascript:void(0);"><i className="icon-heart"></i><em>50,134</em></a></figcaption>
													</figure>
												</li>
												<li>
													<figure>
														<img src="images/instagram/img-02.jpg" alt="image description" />
														<figcaption><a href="javascript:void(0);"><i className="icon-heart"></i><em>50,134</em></a></figcaption>
													</figure>
												</li>
												<li>
													<figure>
														<img src="images/instagram/img-03.jpg" alt="image description" />
														<figcaption><a href="javascript:void(0);"><i className="icon-heart"></i><em>50,134</em></a></figcaption>
													</figure>
												</li>
												<li>
													<figure>
														<img src="images/instagram/img-04.jpg" alt="image description" />
														<figcaption><a href="javascript:void(0);"><i className="icon-heart"></i><em>50,134</em></a></figcaption>
													</figure>
												</li>
												<li>
													<figure>
														<img src="images/instagram/img-05.jpg" alt="image description" />
														<figcaption><a href="javascript:void(0);"><i className="icon-heart"></i><em>50,134</em></a></figcaption>
													</figure>
												</li>
												<li>
													<figure>
														<img src="images/instagram/img-06.jpg" alt="image description" />
														<figcaption><a href="javascript:void(0);"><i className="icon-heart"></i><em>50,134</em></a></figcaption>
													</figure>
												</li>
												<li>
													<figure>
														<img src="images/instagram/img-07.jpg" alt="image description" />
														<figcaption><a href="javascript:void(0);"><i className="icon-heart"></i><em>50,134</em></a></figcaption>
													</figure>
												</li>
												<li>
													<figure>
														<img src="images/instagram/img-08.jpg" alt="image description" />
														<figcaption><a href="javascript:void(0);"><i className="icon-heart"></i><em>50,134</em></a></figcaption>
													</figure>
												</li>
												<li>
													<figure>
														<img src="images/instagram/img-09.jpg" alt="image description" />
														<figcaption><a href="javascript:void(0);"><i className="icon-heart"></i><em>50,134</em></a></figcaption>
													</figure>
												</li>
											</ul>
										</div>
									</div>

								</aside>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	</>)
}