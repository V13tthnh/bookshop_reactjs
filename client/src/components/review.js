import axios from "axios";
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import ReactStars from 'react-rating-stars-component';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { logout } from "../reducers/authSlice";

export default function Review(props) {
    const dispatch = useDispatch();
    const navigation = useNavigate();
    const customerData = useSelector(state => state.customer.customerData);
    const token = useSelector(state => state.auth.token);
    const [bookReviews, setBookReviews] = useState([]);
    const [customerOrder, setCustomerOrder] = useState([]);
    const [rating, setRating] = useState(0);
    const input_comment = useRef();
    const [ratingErrors, setRatingErrors] = useState(null);
    const [commentErrors, setCommentErrors] = useState(null);
    const [ratingCounter, setRatingCounter] = useState(null);
    const [reviewCounter, setReviewCounter] = useState(null);
    
    useEffect(() => {
        if(!props.isCombo){
            axios.get(`http://127.0.0.1:8000/api/book/reviews/${props.id}`, { 'Accept': 'application/json' })
            .then(res => {
                setBookReviews(res.data.reviews);
                setCustomerOrder(res.data.checkOrder);
                setRatingCounter(res.data.rating_counter)
                setReviewCounter(res.data.review_counter)
            }).catch(error => console.log(error));
        } else{
            axios.get(`http://127.0.0.1:8000/api/combo/reviews/${props.id}`, { 'Accept': 'application/json' })
            .then(res => {
                setBookReviews(res.data.reviews);
                setCustomerOrder(res.data.checkOrder);
                setRatingCounter(res.data.rating_counter)
                setReviewCounter(res.data.review_counter)
            }).catch(error => console.log(error));
        }
    }, [props]);
    //Kiểm tra người dùng đã mua sản phẩm này chưa
    const checkBookOrders = () => {
        var flag = false;
        for (const item of customerOrder) {
            if (item.order.customer_id === customerData?.id && item.book_id === props?.id) {
                flag = true;
                break;
            }
        }
        return flag;
    }

    const checkComboOrders = () => {
        var flag = false;
        for (const item of customerOrder) {
            if (item.order.customer_id === customerData?.id && item.combo_id === props?.id) {
                flag = true;
                break;
            }
        }
        return flag;
    }

    //Cập nhật số sao đánh giá vào biến rating
    const ratingChanged = (newRating) => {
        setRating(newRating);
    };
    //Xử lý gửi đánh giá
    const handleReply = () => {
        var data = { 
            'comment': input_comment.current.value, 
            'rating': rating, 
            'customer_id': customerData.id, 
            'book_id': null, 
            'combo_id': null 
        };
        if(!props.isCombo){
            data.book_id = props.id;
        }else{
            data.combo_id = props.id;
        }
        axios.post(`http://127.0.0.1:8000/api/review-handler`, data, {
            headers: {
                'Content-Type': "application/json",
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            if (res.data.success) {
                Swal.fire({ title: res.data.message, text: "Đánh giá của bạn sẽ hiển thị sau khi đã được duyệt bởi quản trị viên!", icon: "success" });
                input_comment.current.value = '';
                setRatingErrors(null);
                setCommentErrors(null);
                ratingChanged();
            }
        }).catch(error => {
            if(error.response.statusText === 'Unauthorized'){
                dispatch(logout());
                Swal.fire({ title: "Bạn cần đăng nhập để đánh giá!", text: "Vui lòng đăng nhập!", icon: "error" });
                navigation('/login');
            }else if (error.response) {
                setRatingErrors(error.response.data.errors.rating);
                setCommentErrors(error.response.data.errors.comment);
            } else {
                console.error('Network error:', error.response.statusText);
            }
        });

    }
    //Hiển thị danh sách đánh giá đã được duyệt
    const fetchReviewsData = () => {
        if (bookReviews.length > 0) {
            return (<>
                {bookReviews.map(item => {
                    if (item.status === 1) {
                        return (<><div className="row"><div className="col-sm-3">
                            <img src={`http://localhost:8000/` + item.customer?.image} className="img-rounded" />
                            <div className="review-block-name"><a>{item.customer.name}</a></div>
                            <div className="review-block-date">{item.created_at}<br /></div>

                        </div>
                            <div className="col-sm-9">
                                {renderStars(item.rating)}
                                <div className="review-block-description">{item.comment}</div>
                            </div> </div>
                            <hr /></>)
                    }
                })}
            </>);
        }else{
            <p>Sách không có đánh giá</p>
        }
    }
    //Hiển thị số sao người dùng đánh giá
    const renderStars = (value) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span
                    key={i}
                    style={{
                        color: i <= value ? 'gold' : 'grey',
                        cursor: 'pointer',
                        height: '90px'
                    }}>★</span>
            );
        }
        return stars;
    };

    return (<><div className="container review__section">
        <div className="row">
            <div className="col-md-7">
                <div className="well well-sm">
                    <div className="row">
                        <div className="col-xs-6 col-md-6 text-center">
                            <h1 className="rating-num">{props?.overrate}</h1>
                            {renderStars(props?.overrate)}
                            <div>
                                <span className="glyphicon glyphicon-user"></span> {reviewCounter} lượt đánh giá
                            </div>
                        </div>
                        <div className="col-xs-6 col-md-6">
                            <div className="row rating-desc">
                                <div className="col-xs-3 col-md-3 text-right">
                                    <span className="glyphicon glyphicon-star"></span>5
                                </div>
                                <div className="col-xs-8 col-md-9">
                                    <div className="progress progress-striped">
                                        <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow="20"
                                            aria-valuemin="0" aria-valuemax="100" style={{ width: `${ratingCounter?.[5]}%` }}>
                                            <span className="sr-only">{ratingCounter?.[5]}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xs-3 col-md-3 text-right">
                                    <span className="glyphicon glyphicon-star"></span>4
                                </div>
                                <div className="col-xs-8 col-md-9">
                                    <div className="progress">
                                        <div className="progress-bar progress-bar-success" role="progressbar" aria- w="20"
                                            aria-valuemin="0" aria-valuemax="100" style={{ width:  `${ratingCounter?.[4]}%` }}>
                                            <span className="sr-only">{ratingCounter?.[4]}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xs-3 col-md-3 text-right">
                                    <span className="glyphicon glyphicon-star"></span>3
                                </div>
                                <div className="col-xs-8 col-md-9">
                                    <div className="progress">
                                        <div className="progress-bar progress-bar-info" role="progressbar" aria-valuenow="20"
                                            aria-valuemin="0" aria-valuemax="100" style={{ width:  `${ratingCounter?.[3]}%` }}>
                                            <span className="sr-only">{ratingCounter?.[3]}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xs-3 col-md-3 text-right">
                                    <span className="glyphicon glyphicon-star"></span>2
                                </div>
                                <div className="col-xs-8 col-md-9">
                                    <div className="progress">
                                        <div className="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="20"
                                            aria-valuemin="0" aria-valuemax="100" style={{ width:  `${ratingCounter?.[2]}%` }}>
                                            <span className="sr-only">{ratingCounter?.[2]}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xs-3 col-md-3 text-right">
                                    <span className="glyphicon glyphicon-star"></span>1
                                </div>
                                <div className="col-xs-8 col-md-9">
                                    <div className="progress">
                                        <div className="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="80"
                                            aria-valuemin="0" aria-valuemax="100" style={{ width:  `${ratingCounter?.[1]}%` }}>
                                            <span className="sr-only">{ratingCounter?.[1]}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {checkBookOrders()  || checkComboOrders() ? 
            <div className="row">
                <div className="col-sm-7">
                    <label for="comment">Chọn số sao đánh giá</label>
                    <ReactStars
                        count={5}
                        value={rating}
                        onChange={ratingChanged}
                        size={34}
                        activeColor="#ffd700"
                    />,
                    <div class="text-danger">{ratingErrors !== null ? ratingErrors?.map(item => '(*) ' + item) : ''}</div>
                    <div className="form-group">
                        <label for="comment">Đánh giá của bạn</label>
                        <textarea name="comment" className="form-control" rows="3" ref={input_comment}></textarea>
                        <div class="text-danger">{commentErrors !== null ? commentErrors?.map(item => '(*) ' + item) : ''}</div>

                    </div>
                    <button type="submit" className="btn btn-danger" onClick={handleReply}>Đánh giá</button>

                </div>
            </div> : <>Bạn cần mua hàng để đánh giá</>}
        <div className="row">
            <div className="col-sm-7">
                <hr />
                <div className="review-block">
                    {fetchReviewsData()}
                </div>
            </div>
        </div>
    </div></>)
}