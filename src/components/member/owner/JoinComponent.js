import { useEffect } from "react";
import MainHeader from "components/layouts/mainHeader";
import { useSelector } from "react-redux";
import ResultModal from "components/common/ResultModal";
import { useState } from "react";
import { checkMemberId, joinOwner } from "api/memberApi";
import useCustomLogin from "hooks/useCustomLogin";

const initState = {
    business_id: "",
    business_name: "",
    name: "",
    id: "",
    pw: "",
    pwr: "",
    email: "",
    tel: "",
    check: false
}

const JoinComponent = () => {
    const [member, setMember] = useState(initState)
    const [idcheck, setIdcheck] = useState(false)
    const loginInfo = useSelector(state => state.loginSlice)
    const [result, setResult] = useState()
    const { moveToPath, isLogin, doUpdate } = useCustomLogin()

    // useEffect(() => {

    //     setMember({...member, email:loginInfo.email, uNo:loginInfo.uNo})
    // }, [loginInfo])
    const handleChange = (e) => {
        member[e.target.name] = e.target.value
        if (e.target.type == "checkbox") {
            member[e.target.name] = e.target.checked;
        }
        if (e.target.name == "id") {
            setIdcheck(false)
        }
        console.log(member);
        setMember({ ...member })

    }

    const handleClickcheckId = () => {
        if (member.id == "") {
            return;
        }
        checkMemberId(member.id).then(result => {
            console.log(result)
            if (result.result === false) {
                setIdcheck(true)


            }

        })
    }
    const closeModal = () => {
        setResult(null)
        moveToPath("/")
    }
    const handleClickJoin = () => {
        joinOwner(member).then(result => {
            console.log(member)

            setResult("회원가입이 완료되었습니다")
            console.log(result)

        })

    }


    return (
        <>
            <MainHeader />
            <div className="relative flex flex-col justify-center h-screen overflow-hidden">
                {result ? <ResultModal title={`회원가입`} content={result} close={`로그인하고 이용하기`}
                    callbackFn={closeModal}></ResultModal> : <></>}

                <div className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-xl">
                    <h1 className="text-3xl font-semibold text-center text-gray-700">사업자 회원가입</h1>
                    <form className="space-y-0.5">
                        <div>
                            <label className="label">
                                <span className="text-base label-text">사업자번호</span>
                            </label>
                            <input className="w-full input input-bordered" name="business_id" type={'text'} placeholder="Name" value={member.business_id} onChange={handleChange} />
                        </div>
                        <div className="flex justify-between">
                            <div className="w-1/2 mr-1">
                                <label className="label">
                                    <span className="text-base label-text">사업자명</span>
                                </label>
                                <input className="input w-full input-bordered" value={member.business_name} onChange={handleChange} type={'text'} name="business_name" placeholder="" />
                            </div>
                            <div className="w-1/2 mr-1">
                                <label className="label">
                                    <span className="text-base label-text">담당자 이름</span>
                                </label>
                                <input className="input w-full input-bordered" value={member.name} onChange={handleChange} type={'text'} name="name" placeholder="" />
                            </div>
                        </div>
                        <div className="w-full">
                            <label className="label">
                                <span className="text-base label-text">아이디</span>
                            </label>
                            <div className="flex">
                                <input className="w-4/5 input input-bordered" name="id" type={'text'} placeholder="" value={member.id} onChange={handleChange} />
                                <button type="button" onClick={handleClickcheckId} className={`btn btn-neutral ${idcheck ? 'btn-disabled' : ''} w-1/5 ml-1 text-ellipsis min-w-24`}>중복확인</button>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <div className="w-1/2 mr-1">
                                <label className="label">
                                    <span className="text-base label-text">비밀번호</span>
                                </label>
                                <input className="input w-full input-bordered" value={member.pw} onChange={handleChange} type={'password'} name="pw" placeholder="" />
                            </div>
                            <div className="w-1/2 mr-1">
                                <label className="label">
                                    <span className="text-base label-text">비밀번호 확인</span>
                                </label>
                                <input className="input w-full input-bordered" value={member.pwr} onChange={handleChange} type={'password'} name="pwr" placeholder="" />
                            </div>
                        </div>
                        <div>
                            <label className="label">
                                <span className="text-base label-text">이메일</span>
                            </label>
                            <input className="w-full input input-bordered" type={'text'} name="email" placeholder="-포함하여 입력하십시오" value={member.email} onChange={handleChange} />
                        </div>
                        <div>
                            <label className="label">
                                <span className="text-base label-text">담당자 연락처</span>
                            </label>
                            <input className="w-full input input-bordered" type={'text'} name="tel" placeholder="-포함하여 입력하십시오" value={member.tel} onChange={handleChange} />
                        </div>
                        <div className="">
                            <label className="label">
                                <span className="text-base label-text">약관동의1</span>
                            </label>
                            <div className="w-full h-28 input input-bordered overflow-auto ">약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서관동의서약관동의서약관동의서약관동의서약관동의서</div>

                            <div className="flex items-center">
                                <input type="checkbox" className="checkbox checkbox-sm" name="check" checked={member.check} onChange={handleChange} />
                                <label>
                                    약관동의
                                </label>
                            </div>

                        </div>
                        <br></br>
                        <div className="">
                            <button type="button" className="btn btn-block" onClick={handleClickJoin}>회원가입</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};
export default JoinComponent;
