import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import useCustomLogin from "../../../hooks/useCustomLogin"
import MainHeader from "components/layouts/mainHeader"

const initState = {
    id: '',
    pw: ''
}
const LoginComponent = () => {
    const {doLogin, isLogin, moveToPath } = useCustomLogin()


    const [loginParam, setLoginParam] = useState({ ...initState })
    
    useEffect(() => {
        if (isLogin) {
            moveToPath('/');
        }
    }, [isLogin, moveToPath]);

    const handleChange = (e) => {
        loginParam[e.target.name] = e.target.value
        setLoginParam({ ...loginParam })
    }

    const handleClickLogin = (e) => {
        doLogin(loginParam) // loginSlice 의 비동기 호출
            .then(data => {
                // 로그인 성공 후 반환된 데이터에서 사용자 타입 검사
                if (data.error) {
                    // 로그인 실패 처리
                    alert("이메일과 패스워드를 다시 확인하세요");
                } else if (data.type === 'ADMIN') {
                    // 사용자 타입이 'admin'인 경우에만 로그인 성공 처리
                    alert("관리자 로그인 성공");
                    moveToPath('/adminPage'); // 관리자 페이지로 리다이렉션
                } else if (data.type === 'OWNER') {
                    // 'admin'이 아닌 다른 타입의 사용자인 경우
                    alert("관리자만 로그인할 수 있습니다. 잘못된 권한 접근입니다")
                    moveToPath('/logout'); // 관리자 페이지로 리다이렉션
                } else {
                    alert("");
                    // 여기서는 페이지 이동을 하지 않으므로, 사용자는 로그인 화면에 그대로 있게 됩니다.
                }
            })
            .catch(error => {
                // 로그인 시도 중 오류 발생 처리
                console.error("로그인 처리 중 오류 발생:", error);
                alert("로그인 처리 중 오류가 발생했습니다.");
            });
    };
    
    // const handleClickLogin = (e) => {
        
    //     doLogin(loginParam) // loginSlice 의 비동기 호출
    //         .then(data => {
    //             console.log(loginParam)
    //             console.log(data)
    //             if (data.error) {
    //                 alert("이메일과 패스워드를 다시 확인하세요")
    //             } else {
    //                 alert("관리자 로그인 성공")
    //                 moveToPath('/adminPage')
    //             }
    //         })
    // }


    return (
        <>
        <MainHeader/>
        <div className="relative flex flex-col justify-center p-14 overflow-hidden">

        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-xl">
            <h1 className="text-3xl font-semibold text-center text-gray-700">관리자로그인</h1>
            <form className="space-y-4">
   
                <div>
                    <label className="label">
                        <span className="text-base label-text">아이디</span>
                    </label>
                    <input className="w-full input input-bordered" name="id" type={'text'} placeholder="아이디를 입력하시오"  value={loginParam.id} onChange={handleChange}/>
                </div>
                <div>
                    <label className="label">
                        <span className="text-base label-text">비밀번호</span>
                    </label>
                    <input className="w-full input input-bordered" value={loginParam.pw} onChange={handleChange} type={'password'} name="pw" placeholder="비밀번호를 입력하시오" />
                    
                </div>
                {/* <Link to={'/owner/join'} className="text-sm text-gray-600 hover:underline hover:text-blue-600 grid justify-end">회원가입</Link> */}
    
                <div>
                    <button type="button" className="btn btn-block" onClick={handleClickLogin}>로그인</button>
                </div>
            </form>
        </div>
    </div>
    </>
    );
}
export default LoginComponent;