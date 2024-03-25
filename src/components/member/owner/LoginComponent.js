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
                console.log(loginParam)
                console.log(data)
                if (data.error) {
                    alert("이메일과 패스워드를 다시 확인하세요")
                } else {
                    alert("로그인 성공")
                    moveToPath('/')
                }
            })
    }
    return (
        <>
        <div className="relative flex flex-col justify-center p-14 overflow-hidden">

        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-xl">
            <h1 className="text-3xl font-semibold text-center text-gray-700">사업자로그인</h1>
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
                <Link to={'/owner/join'} className="text-sm text-gray-600 hover:underline hover:text-blue-600 grid justify-end">회원가입</Link>
    
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