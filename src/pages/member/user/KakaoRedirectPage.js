import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getAccessToken, getMemberWithAccessToken } from "../../../api/kakaoAPI";
import { useDispatch } from "react-redux";
import { login } from "../../../slices/loginSlice";
import useCustomLogin from "../../../hooks/useCustomLogin";
import LoadingPage from "pages/loading";
const KakaoRedirectPage = () => {
    const [searchParams] = useSearchParams()
    const authCode = searchParams.get("code")
    const dispatch = useDispatch()
    const { moveToPath, afterLogin} = useCustomLogin()
    useEffect(() => {
        getAccessToken(authCode).then(accessToken => {
            console.log(accessToken)
            getMemberWithAccessToken(accessToken).then(memberInfo => {
                console.log("-------------------")
                console.log(memberInfo)
                dispatch(login(memberInfo))

                //소셜 회원이 아니라면
                if (memberInfo.email === memberInfo.nickname) {
                    moveToPath("/user/join")
                } else {
                    afterLogin()
                }

            })
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authCode])
    return (
        <div>
            <LoadingPage/>
        </div>
    )
}
export default KakaoRedirectPage;