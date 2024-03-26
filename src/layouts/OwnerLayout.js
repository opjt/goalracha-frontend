import MainHeader from "../components/layouts/ownerHeader";
import Footer from "../components/layouts/footer";
import Topnav from "components/layouts/ownerNav";

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