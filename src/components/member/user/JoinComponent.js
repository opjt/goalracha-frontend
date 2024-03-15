import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { modifyMember, checkNickname } from "api/memberApi";
import useCustomLogin from "hooks/useCustomLogin";
import ResultModal from "../../common/ResultModal";

const initState = {
  name: "",
  nickname: "",
  tel: "",
  email: "",
  uNo: "",
};

const JoinComponent = () => {
  const [member, setMember] = useState(initState);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [checkname, setCheckname] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // 버튼 활성화 여부
  const loginInfo = useSelector((state) => state.loginSlice);
  const { moveToPath, isLogin, doUpdate } = useCustomLogin();

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
    if (member.nickname === "") {
      return;
    }
    try {
      const encodedNickname = encodeURIComponent(member.nickname); // 닉네임 인코딩
      const result = await checkNickname(encodedNickname); // 인코딩된 닉네임으로 요청 보내기
      setCheckname(!result.available); // 결과에 따라 중복 여부 설정
      setShowMessage(true); // 메시지 표시
      setIsButtonDisabled(false); // 중복확인 후 버튼 활성화
    } catch (error) {
      console.error("Error while checking nickname:", error);
    }
  };

  // 회원가입 조건
  const handleClickModify = () => {
    if (
      member.name.length === 0 ||
      member.nickname.length === 0 ||
      member.tel.length === 0 ||
      !agreeTerms ||
      checkname
    ) {
      setModalContent("모든 정보를 입력하고 약관에 동의해주세요.");
      setShowModal(true);
      return;
    }
    modifyMember(member).then((result) => {
      const join = {
        ...loginInfo,
        name: member.name,
        tel: member.tel,
        nickname: member.nickname,
      };
      doUpdate(join);
      moveToPath("/");
    });
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleAgreeTerms = () => {
    setAgreeTerms(!agreeTerms);
  };

  return (
    <div className="relative flex flex-col justify-center h-screen overflow-hidden">
      {showModal && (
        <ResultModal
          title="알림"
          content={modalContent}
          callbackFn={handleModalClose}
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
                onChange={handleChange}
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
            {showMessage && (
              <div className={checkname ? "text-green-500" : "text-red-500"}>
                {checkname
                  ? "사용 가능한 닉네임입니다." : "이미 사용 중인 닉네임입니다."
                  }
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
            <div className="w-full input input-bordered overflow-auto ">
              약관동의서 내용...
            </div>
            <div>
              <input
                type="checkbox"
                required
                checked={agreeTerms}
                onChange={handleAgreeTerms}
              />
              <label>약관동의</label>
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

export default JoinComponent;
