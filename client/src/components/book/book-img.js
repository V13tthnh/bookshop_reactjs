export default function BookImg(props) {
    // console.log(props.data[0].front_cover);
    return (<>
        <div className="tg-bookimg">
            <div className="tg-frontcover"><img src={`http://localhost:8000/`+props.data?.[0].front_cover} alt="image description" /></div>
            <div className="tg-backcover"><img src={`http://localhost:8000/` } alt="image description" /></div>
        </div>
    </>);
}