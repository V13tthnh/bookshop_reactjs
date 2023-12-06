import { useEffect, useState } from "react"
import axios from "axios";
import { NavLink } from "react-router-dom";
export default function SidebarCategories(props) {
	let boxes = document.querySelectorAll("input[type=checkbox]");
	boxes.forEach(b => b.addEventListener("change", tick));
	function tick(e) {
		let state = e.target.checked; // save state of changed checkbox
		boxes.forEach(b => b.checked = false); // clear all checkboxes
		e.target.checked = state; // restore state of changed checkbox
	}
	const [listCategories, setListCategories] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [filteredBooks, setFilteredBooks] = useState([]);
	const [minPrice, setMinPrice] = useState(0);
	const [maxPrice, setMaxPrice] = useState(Number.MAX_SAFE_INTEGER);

	useEffect(() => {
		
		axios.get('http://127.0.0.1:8000/api/category')
			.then(response => response.data)
			.then(json => setListCategories(json.data))
			.catch(error => console.log(error));
	}, []);

	const handleCategoryClick = (categoryId) => {
		axios.get(`http://127.0.0.1:8000/api/filter-books/${categoryId}`)
			.then(response => setFilteredBooks(response.data.filtered_books))
			.catch(error => console.log(error));
		setSelectedCategory(categoryId);
	};

	const handlePriceRangeChange = (min, max) => {
		setMinPrice(min);
		setMaxPrice(max);

		axios.get(`http://127.0.0.1:8000/api/filter-books-by-price/${min}/${max}`)
			.then(response => setFilteredBooks(response.data.filtered_books))
			.catch(error => console.log(error));
	};

	const categoryItems = listCategories.map(item => (
		<li key={item.id} onClick={() => handleCategoryClick(item.id)}>
			<a>
				<span>{item.name}</span>
				<em>{item.list_book_count}</em>
			</a>
		</li>
	));

	const bookItems = filteredBooks.map(book => (<>
		<div class="col-xs-6 col-sm-6 col-md-4 col-lg-3">
			<div class="tg-postbook">
				<figure class="tg-featureimg">
					<div class="tg-bookimg">
						<div class="tg-frontcover"><img src="" alt="image description" /></div>
						<div class="tg-backcover"><img src="images/books/img-01.jpg" alt="image description" /></div>
					</div>
					<a class="tg-btnaddtowishlist" href="javascript:void(0);">
						<i class="icon-heart"></i>
						<span>add to wishlist</span>
					</a>
				</figure>
				<div class="tg-postbookcontent">
					<ul class="tg-bookscategories">
						<li><a href="javascript:void(0);">Art &amp; Photography</a></li>
					</ul>
					<div class="tg-themetagbox"><span class="tg-themetag">sale</span></div>
					<div class="tg-booktitle">
						<h3><NavLink to={`detail/${book.id}`} >{book.name}</NavLink></h3>
					</div>
					<span class="tg-bookwriter">By: <a href="javascript:void(0);">Angela Gunning</a></span>
					<span class="tg-stars"><span></span></span>
					<span class="tg-bookprice">
						<ins>$25.18</ins>
						<del>$27.20</del>
					</span>
					<a class="tg-btn tg-btnstyletwo" href="javascript:void(0);">
						<i class="fa fa-shopping-basket"></i>
						<em>Add To Basket</em>
					</a>
				</div>
			</div>
		</div>
		{/* <li key={book.id}>{book.name}</li> */}
	</>

	));
	return (<>
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
						<h3>Thể loại</h3>
					</div>
					<div className="tg-widgetcontent">
						<ul>
							{
								categoryItems
							}
						</ul>
					</div>
				</div>
				<div className="tg-widget tg-widgettrending">
					<div className="tg-widgettitle">
						<h3>Giá</h3>
					</div>
					<div className="tg-widgetcontent">
						<ul>
							<li><div className="price">
								<input type="checkbox" ></input>
								<a onClick={() => handlePriceRangeChange(0, 150000)}>0đ - 150,000d</a>
							</div>
							</li>
							<li>
								<div className="price">
									<input type="checkbox" ></input>
									<a onClick={() => handlePriceRangeChange(150000, 300000)}>150,000đ - 300,000đ</a>
								</div>
							</li>
							<li>
								<div className="price">
									<input type="checkbox" ></input>
									<a onClick={() => handlePriceRangeChange(300000, 500000)}>300,000đ - 500,000đ</a>
								</div>
							</li>
							<li>
								<div className="price">
									<input type="checkbox" ></input>
									<a onClick={() => handlePriceRangeChange(500000, 700000)}>500,000đ - 700,000đ</a>
								</div>
							</li>
							<li>
								<div className="price">
									<input type="checkbox" ></input>
									<a onClick={() => handlePriceRangeChange(700000, 9999999999999)}>700,000đ Trở lên</a>
								</div>
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
				<div className="tg-widget tg-widgetblogers">
					<div className="tg-widgettitle">
						<h3>Top Bloogers</h3>
					</div>
					<div className="tg-widgetcontent">
						<ul>
							<li>
								<div className="tg-author">
									<figure><a href="javascript:void(0);"><img src="images/author/imag-03.jpg" alt="image description" /></a></figure>
									<div className="tg-authorcontent">
										<h2><a href="javascript:void(0);">Jude Morphew</a></h2>
										<span>21,658 Published Books</span>
									</div>
								</div>
							</li>
							<li>
								<div className="tg-author">
									<figure><a href="javascript:void(0);"><img src="images/author/imag-04.jpg" alt="image description" /></a></figure>
									<div className="tg-authorcontent">
										<h2><a href="javascript:void(0);">Jude Morphew</a></h2>
										<span>21,658 Published Books</span>
									</div>
								</div>
							</li>
							<li>
								<div className="tg-author">
									<figure><a href="javascript:void(0);"><img src="images/author/imag-05.jpg" alt="image description" /></a></figure>
									<div className="tg-authorcontent">
										<h2><a href="javascript:void(0);">Jude Morphew</a></h2>
										<span>21,658 Published Books</span>
									</div>
								</div>
							</li>
							<li>
								<div className="tg-author">
									<figure><a href="javascript:void(0);"><img src="images/author/imag-06.jpg" alt="image description" /></a></figure>
									<div className="tg-authorcontent">
										<h2><a href="javascript:void(0);">Jude Morphew</a></h2>
										<span>21,658 Published Books</span>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</aside>
		</div>



		<div class="col-xs-12 col-sm-8 col-md-8 col-lg-9 pull-right">
			<div id="tg-content" class="tg-content">
				<div class="tg-products">
					<div class="tg-sectionhead">
						<h2><span>People’s Choice</span>Lọc theo thể loại</h2>
					</div>
					<div class="tg-featurebook alert" role="alert">
						<button type="button" class="close" data-dismiss="alert" aria-label="Close">
							<span aria-hidden="true">×</span>
						</button>
						<div class="tg-featureditm">
							<div class="row">
								<div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 hidden-sm hidden-xs">
									<figure><img src="images/img-04.png" alt="image description" /></figure>
								</div>
								<div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">
									<div class="tg-featureditmcontent">
										<div class="tg-themetagbox"><span class="tg-themetag">featured</span></div>
										<div class="tg-booktitle">
											<h3><a href="javascript:void(0);">Things To Know About Green Flat Design</a></h3>
										</div>
										<span class="tg-bookwriter">By: <a href="javascript:void(0);">Farrah Whisenhunt</a></span>
										<span class="tg-stars"><span></span></span>
										<div class="tg-priceandbtn">
											<span class="tg-bookprice">
												<ins>$23.18</ins>
												<del>$30.20</del>
											</span>
											<a class="tg-btn tg-btnstyletwo tg-active" href="javascript:void(0);">
												<i class="fa fa-shopping-basket"></i>
												<em>Add To Basket</em>
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="tg-productgrid">
						<div class="tg-refinesearch">
							<span>showing 1 to 8 of 20 total</span>
							<form class="tg-formtheme tg-formsortshoitems">
								<fieldset>
									<div class="form-group">
										<label>sort by:</label>
										<span class="tg-select">
											<select>
												<option>name</option>
												<option>name</option>
												<option>name</option>
											</select>
										</span>
									</div>
									<div class="form-group">
										<label>show:</label>
										<span class="tg-select">
											<select>
												<option>8</option>
												<option>16</option>
												<option>20</option>
											</select>
										</span>
									</div>
								</fieldset>
							</form>
						</div>
						{bookItems}










					</div>
				</div>
			</div>
		</div></>)
}