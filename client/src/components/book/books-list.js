import BookSort from "./book-sort";
import OneBook from "./one-book";

export default function BooksList(props) {
    //console.log(props.data);
    const list = props.data.map((item) => {
        return (<><OneBook data={item}/></>);
    })
}