import Userheader from "../components/layouts/userheader";
import MainHeader from "../components/layouts/mainHeader";
import Footer from "../components/layouts/footer";
import Topnav from "components/layouts/topnav";

const BasicLayout = ({ children }) => {

    return (
        <>

            <MainHeader/>
            <Topnav />
            {children}
            <Footer />

        </>
    );
}
export default BasicLayout;