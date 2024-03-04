import Userheader from "../components/layouts/userheader";
import Footer from "../components/layouts/footer";

const BasicLayout = ({ children }) => {

    return (
        <>

            <Userheader />
            {children}
            <Footer />

        </>
    );
}
export default BasicLayout;