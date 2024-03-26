// IndividualLoginComponent.js
import React, { useState, useEffect } from "react";
import useCustomLogin from "hooks/useCustomLogin";
import { Link } from "react-router-dom";

const initState = {
    id: '',
    pw: '',
    remember: false // 아이디 기억하기 여부를 저장할 상태 추가
};

const OwnerLoginComponent = () => {
    const { doLogin, isLogin, moveToPath } = useCustomLogin();
    const [loginParam, setLoginParam] = useState({ ...initState });

    useEffect(() => {
        if (isLogin) {
            moveToPath('/');
        }
    }, [isLogin, moveToPath]);

    // 로그인 성공 후 로컬 스토리지를 사용하여 아이디를 저장하고 페이지가 새로 고쳐질 때 불러오기
    useEffect(() => {
        const rememberedId = localStorage.getItem("rememberedId");
        if (rememberedId) {
            setLoginParam(prevState => ({
                ...prevState,
                id: rememberedId,
                remember: true // 아이디 기억하기
            }));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        setLoginParam({ ...loginParam, [name]: name === 'remember' ? checked : value });
    };

    const handleClickLogin = (e) => {
        doLogin(loginParam)
            .then(data => {
                console.log(loginParam);
                console.log(data);
                if (data.error) {
                    alert("이메일과 패스워드를 다시 확인하세요");
                } else {
                    if (loginParam.remember) {
                        localStorage.setItem("rememberedId", loginParam.id);
                    } else {
                        localStorage.removeItem("rememberedId");
                    }
                    alert("로그인 성공");
                    moveToPath('/');
                }
            });
    };

    return (
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-xl">
            <form className="space-y-4">
                <div>
                    <input className="w-full input input-bordered" name="id" type={'text'} placeholder="아이디를 입력해 주세요." value={loginParam.id} onChange={handleChange}/>
                </div>
                <div>
                    <input className="w-full input input-bordered" value={loginParam.pw} onChange={handleChange} type={'password'} name="pw" placeholder="비밀번호를 입력해 주세요." />
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <input type="checkbox" className="checkbox checkbox-xs" name="remember" checked={loginParam.remember} onChange={handleChange} />
                        <label className="text-sm text-gray-600">아이디 기억하기</label>
                    </div>
                    <Link to={'/owner/join'} className="text-sm text-gray-600 hover:underline hover:text-blue-600">아직 회원이 아니십니까?</Link>
                </div>
                <div>
                    <button type="button" className="btn btn-block" onClick={handleClickLogin}>LOGIN</button>
                </div>
            </form>
        </div>
    );
};

export default OwnerLoginComponent;
