import Userheader from "../components/layouts/userheader";
import MainHeader from "../components/layouts/mainHeader";
import Footer from "../components/layouts/footerr";
import Topnav from "components/layouts/topnavowner";

const BasicLayout = ({ children }) => {

    return (
        <>
            <div>
                <MainHeader/>
                <Topnav />
            </div>
            <div>
                <div className="max-w-screen-xl mx-auto p-2">
                    {children}

                </div>
            </div>
            
            <Footer />

        </>
    );
}
export default BasicLayout;