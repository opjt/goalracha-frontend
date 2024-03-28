import MainHeader from "../components/layouts/mainHeader";
import Footer from "../components/layouts/footer";
import Topnav from "components/layouts/topnav";

const BasicLayout = ({ children }) => {

    return (
        <>
            <div>
                <MainHeader/>
                <Topnav />
            </div>
            <div>
                <div className="max-w-screen-xl mx-auto p-2 min-h-screen">
                    {children}

                </div>
            </div>
            
            <Footer />

        </>
    );
}
export default BasicLayout;