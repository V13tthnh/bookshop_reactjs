import Profile from "../components/customer/profile";
import Header from "../components/header";
import Footer from "../components/footer";
import ViewedBooks from "../components/customer/viewed-books";

export default function AccountPage() {
    return (<>
        <Header />
        <Profile />
        <ViewedBooks />
        <Footer />
    </>);
}