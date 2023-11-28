import "../App.css";
export default function Banner() {
	return (<>
		{/* <div className="container-fluid">
			<div id="myCarousel" className="carousel slide" data-ride="carousel" width="200">
				<ol className="carousel-indicators">
					<li data-target="#myCarousel" data-slide-to="0" className="active"></li>
					<li data-target="#myCarousel" data-slide-to="1"></li>
					<li data-target="#myCarousel" data-slide-to="2"></li>
				</ol>
				<div className="carousel-inner">
					<div className="item active">
						<img src="./images/banner/slider1.png" alt="Los Angeles" height="200"/>
					</div>

					<div className="item">
						<img src="./images/banner/slider2.jpg" alt="Chicago"  height="200"/>
					</div>

					<div className="item">
						<img src="./images/banner/slider3.jpg" alt="New york"  height="200"/>
					</div>
				</div>
				<a className="left carousel-control" href="#myCarousel" data-slide="prev" >
					<span className="glyphicon glyphicon-chevron-left"></span>
					<span className="sr-only">Previous</span>
				</a>
				<a className="right carousel-control" href="#myCarousel" data-slide="next">
					<span className="glyphicon glyphicon-chevron-right"></span>
					<span className="sr-only">Next</span>
				</a>
			</div>
		</div> */}
		<div className="text">
      
  Bootstrap v3.4.1 Carousel  <br/>
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
        <img src="./images/banner/slide1.jpg"/>
      </div>

      <div className="item">
        <img src="./images/banner/slide2.jpg"/>
        <div className="carousel-caption">
          <h4>Bootstrap caption example</h4>
          <p>Bootstrap 3.4.1 is not so old, but you can use Bootstrap 4 already.</p>
        </div>
      </div>

      <div className="item">
        <img src="./images/banner/slide3.jpg"/>
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