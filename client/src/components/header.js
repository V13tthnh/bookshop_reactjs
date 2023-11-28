import TopBarHeader from './top-bar-header';
import MiddleContainerHeader from './middle-container-header';
import NavigationHeader from './navigation-header';

export default function Header(props){
    return (<>
        <header id="tg-header" className="tg-header tg-haslayout">
            <TopBarHeader />
            <MiddleContainerHeader />
            <NavigationHeader data={props.data}/>
        </header>
    </>);
}