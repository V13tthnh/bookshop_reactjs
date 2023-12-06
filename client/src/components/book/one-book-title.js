import { NavLink } from "react-router-dom";

export default function OneBookTitle(props) {
    return (<>  
    <div className="tg-booktitle">
        <h3><NavLink to={`/detail/${props.data.id}`} href="javascript:void(0);">{props.data.name}</NavLink></h3>
    </div>
    </>)
}