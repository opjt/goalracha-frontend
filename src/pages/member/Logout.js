import { useEffect } from "react";
import useCustomLogin from "hooks/useCustomLogin";
const LogoutPage = () => {
    const {doLogout, moveToPath} = useCustomLogin()
    useEffect(() => {
        doLogout()
        moveToPath('/') 
    },[])
    return (
        <>

        </>
    );
}
export default LogoutPage;