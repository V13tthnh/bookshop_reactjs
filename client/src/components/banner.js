import { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import { NavLink } from "react-router-dom";

export default function Banner() {
  const [sliderData, setSliderData] = useState([]);
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/banner', { 'accept': 'application/json' })
      .then(response => setSliderData(response.data.data))
      .then(error => console.log(error));
  }, []);

  const fetchData = () => {
    if (sliderData.length > 0) {
      sliderData.map((item) => {
        return (
          <div className="item">
            <img src={`http://localhost:8000/` + item.image}/>
          </div>
        )
      })
    }
  }

  return (<>
    <div className="text">
      _<br />
    </div>
    <div className="container-fluid mb-2">
      <div id="carousel-example-generic" className="carousel slide" data-ride="carousel">

        <ol className="carousel-indicators">
          <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
          <li data-target="#carousel-example-generic" data-slide-to="1"></li>
          <li data-target="#carousel-example-generic" data-slide-to="2"></li>
        </ol>
        <div className="carousel-inner" role="listbox">
          <div className="item active">
            <img src="./images/banner/slide1.jpg" />
          </div>

          <div className="item">
            <img src="./images/banner/slide2.jpg" />
          </div>

          <div className="item">
            <img src="./images/banner/slide3.jpg" />
          </div>
        </div>

        <a className="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
          <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>

        <a className="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
          <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    </div>
    
  </>)
}