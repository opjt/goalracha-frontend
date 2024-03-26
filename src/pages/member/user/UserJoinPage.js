import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { modifyMember, checkNickname } from "api/memberApi";
import useCustomLogin from "hooks/useCustomLogin";
import ResultModal from "components/common/ResultModal";
import { useNavigate } from "react-router-dom";
const agreeText = `
1. 개인정보의 수집항목 및 수집방법 
풋살 예약플랫폼 골라차(이하 골라차)에서는 기본적인 회원 서비스 제공을 위한 필수정보로 실명인증정보와 가입정보로 구분하여 다음의 정보를 수집하고 있습니다. 필수정보를 입력해주셔야 회원 서비스 이용이 가능합니다.

  가. 수집하는 개인정보의 항목 
    * 수집하는 필수항목
      - 실명인증정보 : 이름, 휴대전화번호, 카카오프로필, 사업자등록번호
      - 가입정보 : 아이디, 비밀번호, 사업자명, 이메일, 전화번호, 휴대전화번호, 담당자명, 카카오프로필
   
   [컴퓨터에 의해 자동으로 수집되는 정보]
   인터넷 서비스 이용과정에서 아래 개인정보 항목이 자동으로 생성되어 수집될 수 있습니다. 
    - IP주소, 서비스 이용기록, 방문기록 등
   
  나. 개인정보 수집방법
      홈페이지 회원가입을 통한 수집 

2. 개인정보의 수집/이용 목적 및 보유/이용 기간
골라차에서는 정보주체의 회원 가입일로부터 서비스를 제공하는 기간 동안에 한하여 골라차사이트 서비스를 이용하기 위한 최소한의 개인정보를 보유 및 이용 하게 됩니다. 회원가입 등을 통해 개인정보의 수집·이용, 제공 등에 대해 동의하신 내용은 언제든지 철회하실 수 있습니다. 회원 탈퇴를 요청하거나 수집/이용목적을 달성하거나 보유/이용기간이 종료한 경우, 사업 폐지 등의 사유발생시 개인 정보를 지체 없이 파기합니다.

  * 실명인증정보
    * 수집하는 필수항목
      - 실명인증정보 : 이름, 휴대전화번호, 카카오프로필, 사업자등록번호
      - 가입정보 : 아이디, 비밀번호, 사업자명, 이메일, 전화번호, 휴대전화번호, 담당자명, 카카오프로필
    - 개인정보의 수집·이용목적   : 홈페이지 이용에 따른 본인 식별/인증절차에 이용
    - 개인정보의 보유 및 이용기간 : 카카오(프로필)API는 별도로 저장하지 않으며 실명인증용으로만 이용

  * 가입정보
    - 개인정보 수집항목 : 아이디, 비밀번호, 사업자명, 이메일, 전화번호, 휴대전화번호, 담당자명, 카카오프로필
    - 개인정보의 수집·이용목적 : 홈페이지 서비스 이용 및 회원관리, 불량회원의 부정 이용방지, 민원신청 및 처리 등
    - 개인정보의 보유 및 이용기간 : 2년 또는 회원탈퇴시

정보주체는 개인정보의 수집·이용목적에 대한 동의를 거부할 수 있으며, 동의 거부시 골라체에 회원가입이 되지 않으며, 골라차에서 제공하는 서비스를 이용할 수 없습니다.

3. 수집한 개인정보 제3자 제공
골라차에서는 정보주체의 동의, 법률의 특별한 규정 등 개인정보 보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.
      
4. 개인정보 처리업무 안내
골라차에서는 개인정보의 취급위탁은 하지 않고 있으며, 원활한 서비스 제공을 위해 아래의 API와 자체 DB를 통해 통한 실명인증 및 로그인인증을 하고 있습니다. 

  * 수탁업체
    - 카카오로그인API
      · 인증 내용 : 카카오ID 및 프로필을 통한 개인인증

2. 회원탈퇴 약관
1. 언제든지 골라차서비스의 마이페이지 또는 고객센터를 통해 회원탈퇴를 할 수 있으며, 골라차는 특별한 사정이 없는 한 이를 지체없이 처리함
2. 회원탈퇴가 완료되는 경우, 회사는 개인정보 중 관렵 법령에 따라 보유 의무가 있는 정보를 제외한 개인정보를 즉시 삭제함
3. 한 번 탈퇴한 회원의 경우, 서비스 운앵정책에서 정하는 바에 따라 다시 가입하는 것이 제한될 수 있음
4. 회사는 본 조에 따라서 이용제한을 하는 경우 회원은 이용제한의 철회를 요청할 수 있으며, 구체적인 내용응 골라차 운영정첵에서 정하는 바임
5. 회원자격이 본 조에 따라 박탈되는 경우, 회사는 관련 법령 및 개인정보처리방침에 따라 보유하는 회원의 정보를 제외한 계정에 등록된 정보를 즉시 삭제함

[ 부 칙 ]
본 약관은 2024년 4월 18일 부로 시행함

3. 환불 규정
- 이용 5일 전까지 : 100% 환불
- 4일 전 ~ 3일 전 : 50% 환불
- 2일 전 ~ 대관 당일 : 환불 불가
- 다음과 같은 경우에는 상단 규정대로 처리
- 고객의 사정으로 예약된 날짜에 구장 이용을 못하는 경우
- 구장, 날짜, 시간 등을 실수로 잘못 선택했을 경우
- 단순 변심으로 인해 환불이나 변경을 요청하는 경우

4. 이용안내
[ 주차 상세 ]
- 사업자회원 작성
[ 구장 출입문 안내 ]
- 사업자회원 작성
[ 구장이용 안내 ]
사업자회원 작성)
[ 대여 상세 ]
- 사업자회원 작성
[ 물, 음료 ]
- 사업자회원 작성
5. 이용규칙 
- 풋살장 예약시간 준수
- 풋살장 내 취사, 흡연 및 음주행위, 지나친 소음행위 금지(적발 시 이용불가)
- 시설 사용 후 정리정돈 ( 쓰레기 반드시 처리 )
- 고의 및 과실로 인한 시설물 훼손 및 파손시 사용자가 배상하며 경기중 부상은 본인이 책임집니다.
- 잔디보호와 부상방지를 위하여 스터드가 있는 축구화(SG, FG, HG, AG)는 착용이 금지되며 풋살화(TF)만 착용 가능 합니다.
- 위 내용이 지켜지지 않을 경우 무환불 퇴장조치 될 수 있으니 예약시 꼭 참고부탁드립니다.
- 위 내용을 지키지 않아 발생하는 문제는 예약자 본인에게 있습니다.
정보 입력후 관리자에게 승인 요청 `
const initState = {
  name: "",
  nickname: "",
  tel: "",
  email: "",
  uNo: "",
};

const JoinPage = () => {
  const [member, setMember] = useState(initState);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [checkname, setCheckname] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showMessage, setShowMessage] = useState(false); // 중복 확인 메시지 표시 여부
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // 버튼 활성화 여부
  const loginInfo = useSelector((state) => state.loginSlice);
  const { moveToPath, isLogin, doUpdate } = useCustomLogin();
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 페이지 이동 선언
  // 상태 변수 추가
  const [nicknameInput, setNicknameInput] = useState(""); // 입력된 닉네임 상태 변수 추가

  useEffect(() => {
    if (!isLogin) {
      moveToPath("/");
    } else {
      if (loginInfo.email !== loginInfo.nickname) {
        moveToPath("/");
      }
    }
    setMember({ ...member, email: loginInfo.email, uNo: loginInfo.uNo });
  }, [loginInfo]);

  const handleChange = (e) => {
    setMember({ ...member, [e.target.name]: e.target.value });
  };

  // 닉네임 중복검사 코드
  const handleClickCheckNickname = async () => {
    if (nicknameInput === "") {
      return;
    }
    try {
      const encodedNickname = encodeURIComponent(nicknameInput); // 닉네임 인코딩
      const result = await checkNickname(encodedNickname); // 인코딩된 닉네임으로 요청 보내기
      setCheckname(!result.available); // 결과에 따라 중복 여부 설정
      setShowMessage(true); // 메시지 표시
      setIsButtonDisabled(true); // 중복확인 버튼 비활성화
    } catch (error) {
      console.error("Error while checking nickname:", error);
    }
  };

  // 닉네임 입력 변경 시 실행되는 함수
  const handleNicknameChange = (e) => {
    setMember({ ...member, nickname: e.target.value });
    setNicknameInput(e.target.value); // 입력된 닉네임 상태 변수 업데이트
    setIsButtonDisabled(false); // 닉네임 입력이 변경되면 중복확인 버튼 활성화
    setShowMessage(false); // 닉네임이 변경되면 중복 확인 메시지 숨기기
    setCheckname(false); // 중복 확인 상태 초기화
  };

  // 회원가입 버튼 클릭 조건
  const handleClickModify = async () => {
    // 닉네임 중복 확인을 하지 않은 경우
    // 중복 확인 메시지가 "이미 사용 중인 닉네임입니다."이면 회원가입을 막고 모달창을 표시
    if (!checkname) {
      setModalContent("닉네임 중복을 확인해주세요.");
      setShowModal(true);
      return;
    }

    // 이름, 닉네임, 연락처, 약관동의를 만족하지 않을 경우
    if (
      member.name.length === 0 ||
      member.nickname.length === 0 ||
      member.tel.length === 0 ||
      !agreeTerms
    ) {
      setModalContent("모든 정보를 입력하고 약관에 동의해주세요.");
      setShowModal(true);
      return;
    }

    try {
      await modifyMember(member);
      const join = {
        ...loginInfo,
        name: member.name,
        tel: member.tel,
        nickname: member.nickname,
      };
      doUpdate(join);
      navigate(""); // 조건 충족 후 회원가입 클릭시 페이지 이동
    } catch (error) {
      console.error("Error while modifying member:", error);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleAgreeTerms = () => {
    setAgreeTerms(!agreeTerms);
  };

  return (
    <div className="relative flex flex-col justify-center h-screen ">
      {showModal && (
        <ResultModal
          title="알림"
          content={modalContent}
          callbackFn={handleModalClose}
          close={"확인"}
        />
      )}
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-gray-700">
          유저 회원가입
        </h1>
        <form className="space-y-4">
          <div>
            <label className="label">
              <span className="text-base label-text">카카오 이메일</span>
            </label>
            <input
              className="w-full input input-disabled"
              name="name"
              type="text"
              placeholder="Name"
              value={member.email || ""}
              readOnly
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">이름</span>
            </label>
            <input
              className="w-full input input-bordered"
              name="name"
              type="text"
              placeholder="이름을 입력해주세요."
              value={member.name || ""}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">닉네임</span>
            </label>
            <div className="flex">
              <input
                className="w-4/5 input input-bordered"
                name="nickname"
                type="text"
                placeholder="사용하실 닉네임을 입력해주세요."
                value={member.nickname || ""}
                onChange={handleNicknameChange} // 닉네임이 변경될 때마다 호출
              />

              <button
                type="button"
                onClick={handleClickCheckNickname}
                className={`btn btn-neutral ${isButtonDisabled ? "btn-disabled" : ""} w-1/5 ml-1 text-ellipsis min-w-24`}
                disabled={isButtonDisabled} // 버튼 비활성화 여부 설정
              >
                중복확인
              </button>
            </div>

            {showMessage && nicknameInput && (
              <div className={checkname ? "text-green-500" : "text-red-500"}>
                {checkname
                  ? "사용 가능한 닉네임입니다."
                  : "이미 사용 중인 닉네임입니다."}
              </div>
            )}
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">연락처</span>
            </label>
            <input
              id="pcs"
              className="w-full input input-bordered"
              type="text"
              name="tel"
              placeholder="(-)을 포함하여 입력해주세요."
              value={member.tel || ""}
              onChange={handleChange}
              onBlur={() => {
                var phoneNumber = document.getElementById("pcs").value;
                if (phoneNumber) {
                  var regex = /^(01[0-9]{1}-?[0-9]{4}-?[0-9]{4}|01[0-9]{8})$/;

                  if (!regex.test(phoneNumber)) {
                    setModalContent("잘못된 형식의 전화번호입니다.");
                    setShowModal(true);
                    document.getElementById("pcs").value = "";
                    return false;
                  }

                  var pcs = phoneNumber.replace(/[^0-9]/g, "");

                  if (pcs.length === 10) {
                    pcs =
                      pcs.substring(0, 3) +
                      "-" +
                      pcs.substring(3, 7) +
                      "-" +
                      pcs.substring(7, 11);
                  } else if (pcs.length === 11) {
                    pcs =
                      pcs.substring(0, 3) +
                      "-" +
                      pcs.substring(3, 7) +
                      "-" +
                      pcs.substring(7, 11);
                  }

                  document.getElementById("pcs").value = pcs;
                }
              }}
            />
          </div>
          <div>
            <textarea disabled className="w-full h-28 input input-bordered overflow-auto bg-gray-200 text-sm " 
			style={{cursor: 'initial',color: 'black'}}defaultValue={agreeText}></textarea>
            <div className="flex items-center"> 
              {/* <input
                type="checkbox"
                required
                checked={agreeTerms}
                onChange={handleAgreeTerms}
              />
              <label>약관동의</label> */}

			  <input type="checkbox" required className="checkbox checkbox-sm" name="check2" id="check2"  checked={agreeTerms} onChange={handleAgreeTerms}/>
            	<label className="ml-1 text-sm" htmlFor="check2">위의 약관에 동의합니다.</label>
            </div>
          </div>
          <div>
            <button
              type="button"
              className="btn btn-block"
              onClick={handleClickModify}
            >
              회원가입
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JoinPage;
