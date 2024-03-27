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
const customStyle = {
    cursor: 'initial',
    background: 'initial',
    color: 'black'
  };

  const text1 = `대관 서비스 개인정보 제3자 제공 방침

  1. 수집 항목 : 실명, 휴대전화번호, 이메일, 주소, 생년월일, ID 등
  2. 수집 목적 : 시설 대관 관리
  3. 보관 기간 : 대관 일시로부터 1년
  4. 제공 받는 자 : 해당 체육시설
  `
const JoinComponent = () => {
    const [member, setMember] = useState(initState)
    const [idcheck, setIdcheck] = useState()
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
        checkMemberId(member.id).then(res => {
            if (res.result === false) {
                setIdcheck(true)
            } else {
                setResult({content:"이미 사용중인 아이디입니다",close:"확인"})
            }
        })
    }
    const closeModal = () => {
        var msg = result;
        setResult(null)
        console.log(msg)
        if(msg.content == "회원가입이 완료되었습니다") {
            moveToPath("/login")
        }
        
    }
    const handleClickJoin = () => {
        var checkMember = checkValidate(member)
        if(checkMember != true) {
            setResult({content:checkMember,close:"확인"})
            return;
        }
        
        joinOwner(member).then(result => {
            console.log(member)
            setResult({content:"회원가입이 완료되었습니다",close:"로그인하고 이용하기"})
            console.log(result)

        })

    }

    const checkValidate = (member) => {
        var regex_business = /^\d{3}-\d{2}-\d{5}$/;
        var regex_tel = /^\d{3}-\d{3,4}-\d{4}$/; 
        var regex_id = /^(?=.*[a-zA-Z\d])[a-zA-Z\d]{6,20}$/;
        var regex_email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        console.log(member)
        if(!regex_business.test(member.business_id)) {
            return "잘못된 형식의 사업자번호입니다"
        }
        if(member.business_name.length <= 1) {
            return "사업자명을 입력해주세요"
        }
        if(member.name.length <= 1) {
            return "담당자 이름을 입력해주세요"
        }
        if(!idcheck) {
            return "아이디 중복을 확인해주세요"
        }
        if(!regex_id.test(member.id)) {
            return "잘못된 아이디 형식입니다"
        }
        if(!regex_tel.test(member.tel)) {
            return "잘못된 전화번호 형식입니다"
        }
        if(!regex_email.test(member.email)) {
            return "잘못된 이메일 형식입니다"
        }
        if(!member.check2) {
            return "이용약관에 동의하지 않았습니다"
        }
        if(member.pw !== member.pwr) {
            return "비밀번호를 다시 확인해주세요."
        }
        
        return true;
        
    }


    return (
        <>
            <div className="relative flex flex-col justify-center ">
                {result ? <ResultModal title={`회원가입`} content={result.content} close={result.close}
                    callbackFn={closeModal}></ResultModal> : <></>}

                <div className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-xl">
                    <h1 className="text-3xl font-semibold text-center text-gray-700">사업자 회원가입</h1>
                    <form className="space-y-0.5">
                        <div>
                            <label className="label">
                                <span className="text-base label-text">사업자번호</span>
                            </label>
                            <input className="w-full input input-bordered" name="business_id" type={'text'} placeholder="000-00-00000" value={member.business_id} onChange={handleChange} />
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
                                <input className="w-4/5 input input-bordered" name="id" type={'text'} placeholder="6~20자 영문(특수문자 불가능)" value={member.id} onChange={handleChange} />
                                <button type="button" onClick={handleClickcheckId} className={`btn btn-neutral ${idcheck ? 'btn-disabled' : ''} w-1/5 ml-1 text-ellipsis min-w-24`}>중복확인</button>
                            </div>
                            {idcheck  && (
                                <div className={idcheck ? "text-green-500" : "text-red-500"}>
                                    {idcheck
                                    ? "사용 가능한 닉네임입니다."
                                    : "이미 사용 중인 닉네임입니다."}
                                </div>
                            )}
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
                            <input className="w-full input input-bordered" type={'text'} name="email" placeholder="" value={member.email} onChange={handleChange} />
                        </div>
                        <div>
                            <label className="label">
                                <span className="text-base label-text">담당자 연락처</span>
                            </label>
                            <input className="w-full input input-bordered" type={'text'} name="tel" placeholder="-포함하여 입력하십시오" value={member.tel} onChange={handleChange} />
                        </div>
                        <div className="">
                            <label className="label">
                                <span className="text-base label-text">이용약관</span>
                            </label>
                        
                            <textarea disabled className="w-full h-28 input input-bordered overflow-auto bg-gray-200 text-sm" style={customStyle} defaultValue={text1}/>
                            <div className="flex items-center">
                                <input type="checkbox" className="checkbox checkbox-sm" name="check2" id="check2"  value={member.check2} onChange={handleChange}/>
                                <label className="ml-1 text-sm" htmlFor="check2">위의 시설 이용 약관에 동의합니다.</label>
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
