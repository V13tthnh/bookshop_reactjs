export default function SidebarCategories(props) {
    // console.log(props.data)
    const category = props.data.map(item => {
        return (<li><a href=""><span>{item.ten}</span><em>28245</em></a></li>)
    })
    return (<>
        <div className="col-xs-12 col-sm-4 col-md-4 col-lg-3 pull-left">
            <aside id="tg-sidebar" className="tg-sidebar">
                <div className="tg-widget tg-catagories">
                    <div className="tg-widgettitle">
                        <h3>Categories</h3>
                    </div>
                    <div className="tg-widgetcontent">
                        <ul>

                            {category}
                            <li><a href="javascript:void(0);"><span>View All</span></a></li>
                        </ul>
                    </div>
                </div>
            </aside>
        </div ></>)
}