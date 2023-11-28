export default function BookImg(props) {
    //console.log(props.data[0].url);
    return (<>
        <div className="tg-bookimg">
            <div className="tg-frontcover"><img src={`http://localhost:8000/` + props.data[0].url} alt="image description" /></div>
            <div className="tg-backcover"><img src={`http://localhost:8000/` + props.data[0].url} alt="image description" /></div>
        </div>
    </>);
}