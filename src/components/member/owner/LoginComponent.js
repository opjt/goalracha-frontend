import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import useCustomLogin from "../../../hooks/useCustomLogin"
import { getKakaoLoginLink } from "api/kakaoAPI";

const initState = {
    id: '',
    pw: '',
    remember: false // 아이디 기억하기 여부를 저장할 상태 추가
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
        const { name, value, checked } = e.target;
        setLoginParam({ ...loginParam, [name]: name === 'remember' ? checked : value });
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
            <div class="flex w-full">
  <div class="grid h-10 flex-grow card bg-base-300 rounded-box place-items-center">개인회원</div>
  <div class="divider divider-horizontal"></div>
  <div class="grid h-10 flex-grow card bg-base-300 rounded-box place-items-center">사업자회원</div>
</div>



                <div className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-xl">
                    <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">OWNER LOGIN</h1>
                    <form className="space-y-4">
                        <div>
                            <input className="w-full input input-bordered" name="id" type={'text'} placeholder="아이디를 입력해 주세요."  value={loginParam.id} onChange={handleChange}/>
                        </div>
                        <div>
                            <input className="w-full input input-bordered" value={loginParam.pw} onChange={handleChange} type={'password'} name="pw" placeholder="비밀번호를 입력해 주세요." />
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                                <input type="checkbox" className="checkbox checkbox-xs" name="remember" checked={loginParam.remember} onChange={handleChange} />
                                <label className="text-sm text-gray-600">아이디 기억하기</label>
                            </div>
                            <Link to={'/owner/join'} className="text-sm text-gray-600 hover:underline hover:text-blue-600">계정을 만드시겠습니까?</Link>
                        </div>
                        <div>
                            <button type="button" className="btn btn-block" onClick={handleClickLogin}>LOGIN</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
export default LoginComponent;