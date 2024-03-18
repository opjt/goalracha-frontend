import { useEffect } from "react";
import useCustomLogin from "hooks/useCustomLogin";
const LogoutPage = () => {
    const {doLogout, moveToPath} = useCustomLogin()
    useEffect(() => {
        doLogout()
        alert('로그아웃되었습니다')
        moveToPath('/') 
    },[])
    return (
        <>

        </>
    );
}
export default LogoutPage;