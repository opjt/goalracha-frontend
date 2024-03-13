import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { modifyMember } from "api/memberApi";
import useCustomLogin from "hooks/useCustomLogin";

const initState = {
    name: '',
    nickname: '',
    tel: '',
    email: '',
    uNo: ''
}

const JoinComponent = () => {
    const [member, setMember] = useState(initState)
    const loginInfo = useSelector(state => state.loginSlice)

    const { moveToPath, isLogin, doUpdate} = useCustomLogin()
    
    useEffect(() => {
        if(!isLogin) {
            moveToPath("/")
        } else {
             if(loginInfo.email !== loginInfo.nickname) {
                moveToPath("/")
             }
        }
        setMember({...member, email:loginInfo.email, uNo:loginInfo.uNo})
    }, [loginInfo])
    const handleChange = (e) => {
        
        member[e.target.name] = e.target.value
        setMember({ ...member })
    
    }
    const handleClickModify = () => {
        modifyMember(member).then(result => {
            
            var join = {...loginInfo, name:member.name, tel:member.tel, nickname:member.nickname};
            doUpdate(join)
            moveToPath("/")
        //    doLogin({id:loginInfo.userId,pw:loginInfo.pw})
            
        })
    }
 
  return (

    <div className="relative flex flex-col justify-center h-screen overflow-hidden">

        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-xl">
            <h1 className="text-3xl font-semibold text-center text-gray-700">유저 회원가입</h1>
            <form className="space-y-4">
                <div>
                    <label className="label">
                        <span className="text-base label-text">이름</span>
                    </label>
                    <input className="w-full input input-disabled" name="name" type={'text'} placeholder="Name"  value={member.email||""} readOnly/>
                </div>
                <div>
                    <label className="label">
                        <span className="text-base label-text">이름</span>
                    </label>
                    <input className="w-full input input-bordered" name="name" type={'text'} placeholder="Name"  value={member.name||""} onChange={handleChange}/>
                </div>
                <div>
                    <label className="label">
                        <span className="text-base label-text">닉네임</span>
                    </label>
                    <input className="w-full input input-bordered" value={member.nickname|| ""} onChange={handleChange} type={'text'} name="nickname" placeholder="닉네임입력" />
                </div>
                <div>
                    <label className="label">
                        <span className="text-base label-text">전화번호</span>
                    </label>
                    <input  className="w-full input input-bordered" type={'text'} name="tel" placeholder="-포함하여 입력하십시오" value={member.tel||""} onChange={handleChange}/>
                </div>
                <div>
                    <div className="w-full input input-bordered overflow-auto ">약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서관동의서약관동의서약관동의서약관동의서약관동의서</div>
                    
                    <div>
                        <input type="checkbox" required/>
                        <label>
                            약관동의
                        </label>
                    </div>
                    
                </div>
                <div>
                    <button type="button" className="btn btn-block" onClick={handleClickModify}>회원가입</button>
                </div>
            </form>
        </div>
    </div>
  );
};
export default JoinComponent;
