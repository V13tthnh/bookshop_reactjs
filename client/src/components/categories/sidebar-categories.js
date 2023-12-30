import { useEffect, useState, useRef } from "react"
import axios from "axios";
import { NavLink } from "react-router-dom";
import OneBookPrice from "../book/one-book-price";
import ReactPaginate from 'react-paginate';

export default function SidebarCategories(props) {
	// Lấy tất cả các ô checkbox và thêm sự kiện change để thực hiện hàm tick
	let boxes = document.querySelectorAll("input[type=checkbox]");
	boxes.forEach(b => b.addEventListener("change", tick));

	// Hàm thực hiện việc giữ cho chỉ một checkbox được chọn tại một thời điểm
	function tick(e) {
		let state = e.target.checked; // Lưu trạng thái của ô checkbox đã thay đổi
		boxes.forEach(b => b.checked = false); // Xóa chọn tất cả các ô checkbox
		e.target.checked = state; // Khôi phục trạng thái của ô checkbox đã thay đổi
	}
	  // State và effect hooks để quản lý danh sách thể loại sách và các thông tin liên quan
	const [listCategories, setListCategories] = useState([]); // Danh sách thể loại sách
	const [selectedCategory, setSelectedCategory] = useState(null); // Thể loại đang được chọn
	const [filteredBooks, setFilteredBooks] = useState([]); // Danh sách sách sau khi lọc
	const [minPrice, setMinPrice] = useState(0); // Giá sách tối thiểu
	const [maxPrice, setMaxPrice] = useState(Number.MAX_SAFE_INTEGER); // Giá sách tối đa
	const [totalPages, setTotalPages] = useState(0);
	const [newPage, setNewPage] = useState(0);
  	const [selectedPriceRange, setSelectedPriceRange] = useState({ min: 0, max: Number.MAX_SAFE_INTEGER });

	// Khai báo state và hàm để lựa chọn thứ tự sắp xếp sách
	const [sortOrder, setSortOrder] = useState("asc");
	const handleSortChange = (value) => {
		setSortOrder(value);
		let sortedBooks = [...filteredBooks];
		// Sắp xếp sách dựa trên thứ tự đã chọn
		if (value === "asc") {
			sortedBooks.sort((a, b) => a.name.localeCompare(b.name));
		} else if (value === "desc") {
			sortedBooks.sort((a, b) => b.name.localeCompare(a.name));
		} else if (value === "priceAsc") {
			sortedBooks.sort((a, b) => a.unit_price - b.unit_price);
		} else if (value === "priceDesc") {
			sortedBooks.sort((a, b) => b.unit_price - a.unit_price);
		}
		setFilteredBooks(sortedBooks);
	};
  // useEffect hook để thêm sự kiện change cho tất cả các ô checkbox khi component được render
	useEffect(() => {
		let boxes = document.querySelectorAll("input[type=checkbox]");
		boxes.forEach(b => b.addEventListener("change", tick));
		return () => {
			boxes.forEach(b => b.removeEventListener("change", tick));
		};
	}, []);

  // useEffect hook để fetch danh sách thể loại từ API khi component được render
	useEffect(() => {
		axios.get('http://127.0.0.1:8000/api/category')
			.then(response => response.data)
			.then(json => setListCategories(json.data))
			.catch(error => console.log(error));
	}, []);

	const handleBookClick = async () => {
		setNewPage(1); // Set lại trang là 1
		setSelectedCategory(null); // Đặt lại thể loại là rỗng
		setMinPrice(0); // Set giá nhỏ nhất là 0
		setMaxPrice(Number.MAX_SAFE_INTEGER); // Set giá lớn nhất
		setSelectedPriceRange({ min: 0, max: Number.MAX_SAFE_INTEGER });
		try {
		  const response = await axios.get(`http://127.0.0.1:8000/api/books?page=${newPage}`);
		  if (response?.data) {
			setFilteredBooks(response.data.data || []);
			setTotalPages(response.data.total_pages || 0);
		  }
		} catch (error) {
		  console.error("Error fetching data:", error);
		}
	  };
	
	  // Hàm xử lý khi người dùng click vào một thể loại sách cụ thể
	const handleCategoryClick = async (categoryId) => {
		setNewPage(1);
		setSelectedCategory(categoryId);
		setSelectedPriceRange({ min: 0, max: Number.MAX_SAFE_INTEGER });
	  };

	// Hàm xử lý khi người dùng thay đổi khoảng giá sách
	const handlePriceRangeChange = async (min, max) => {
		setMinPrice(min);
		setMaxPrice(max);
		setNewPage(1);
		setSelectedCategory(null); 
		setSelectedPriceRange({ min, max });
	  };

	  // Hàm xử lý khi người dùng click vào một trang cụ thể
	const handlePageClick = ({ selected }) => {
		const nextPage = selected + 1;
		setNewPage(nextPage); 
	};

	// useEffect hook để fetch dữ liệu sách dựa trên các thay đổi trong trạng thái
	useEffect(() => {
		const fetchData = async () => {
		  try {
			let url = `http://127.0.0.1:8000/api/books?page=${newPage}`; 
	
			if (selectedCategory) {
			  url = `http://127.0.0.1:8000/api/filter-books/${selectedCategory}?page=${newPage}`;
			} else if (selectedPriceRange.min !== 0 || selectedPriceRange.max !== Number.MAX_SAFE_INTEGER) {
			  url = `http://127.0.0.1:8000/api/filter-books-by-price/${selectedPriceRange.min}/${selectedPriceRange.max}?page=${newPage}`;
			}
	
			const response = await axios.get(url);
			if (response?.data) {
			  setFilteredBooks(response.data.data || []);
			  setTotalPages(response.data.total_pages || 0);
			}
		  } catch (error) {
			console.error("Error fetching data:", error);
		  }
		};
	
		fetchData();
	  }, [selectedCategory, selectedPriceRange, newPage]);
	
	// Tạo các phần tử thể loại sách từ danh sách thể loại
	const categoryItems = listCategories.map(item => (
		<li key={item.id} onClick={() => handleCategoryClick(item.id)}>
			<a>
				<span>{item.name}</span>
				<em>{item.list_book_count}</em>
			</a>
		</li>
	));

	// Tạo các phần tử sách từ danh sách sách đã lọc
	const bookItems = filteredBooks.map(book => (<>
		<div class="col-xs-6 col-sm-6 col-md-4 col-lg-4">
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
						<h3><NavLink to={`detail/${book.id}`} >{book.name}</NavLink></h3>
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
							<li onClick={() => handleBookClick()}>
								<a>
									<span>Tất cả thể loại</span>
									<em></em>
								</a>
							</li>
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
								<input onClick={() => handlePriceRangeChange(0, 150000)} type="checkbox" ></input>
								<a onClick={() => handlePriceRangeChange(0, 150000)}>0đ - 150,000đ</a>
							</div>
							</li>
							<li>
								<div className="price">
									<input onClick={() => handlePriceRangeChange(150000, 300000)} type="checkbox" ></input>
									<a onClick={() => handlePriceRangeChange(150000, 300000)}>150,000đ - 300,000đ</a>
								</div>
							</li>
							<li>
								<div className="price">
									<input onClick={() => handlePriceRangeChange(300000, 500000)} type="checkbox"  ></input>
									<a onClick={() => handlePriceRangeChange(300000, 500000)}>300,000đ - 500,000đ</a>
								</div>
							</li>
							<li>
								<div className="price">
									<input onClick={() => handlePriceRangeChange(500000, 700000)} type="checkbox" ></input>
									<a onClick={() => handlePriceRangeChange(500000, 700000)}>500,000đ - 700,000đ</a>
								</div>
							</li>
							<li>
								<div className="price">
									<input onClick={() => handlePriceRangeChange(700000, Number.MAX_SAFE_INTEGER)} type="checkbox" ></input>
									<a onClick={() => handlePriceRangeChange(700000, Number.MAX_SAFE_INTEGER)}>700,000đ Trở lên</a>
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
										<label>Sort by:</label>
										<span class="tg-select">
											<select onChange={(e) => handleSortChange(e.target.value)}>
												<option value="asc">Từ A-Z</option>
												<option value="desc">Từ Z-A</option>
												<option value="priceAsc">Giá tăng dần</option>
												<option value="priceDesc">Giá giảm dần</option>
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
					<ReactPaginate
						nextLabel="next >"
						onPageChange={handlePageClick}
						pageCount={totalPages}
						pageRangeDisplayed={3}
						marginPagesDisplayed={2}
						previousLabel="< previous"
						pageClassName="page-item"
						pageLinkClassName="page-link"
						previousClassName="page-item"
						previousLinkClassName="page-link"
						nextClassName="page-item"
						nextLinkClassName="page-link"
						breakLabel="..."
						breakClassName="page-item"
						breakLinkClassName="page-link"
						containerClassName="pagination"
						activeClassName="active"
						renderOnZeroPageCount={null}
					/>
				</div>
			</div>
		</div></>)
}