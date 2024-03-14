import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { modifyMember, checkNickname } from "api/memberApi"; // checkNickname 함수 import
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
  const [showModal, setShowModal] = useState(false); // 이름을 입력하지 않았을 때 모달 창을 보여주는 상태
  const [checkNickname, setNicknameCheck] = useState(false); // 닉네임 중복 여부 상태
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

  const handleClickCheckNickname = async () => {
    if (member.nickname === "") {
      return;
    }
    try {
      const result = await checkNickname(member.nickname);
      setNicknameCheck(result.isDuplicate);
    } catch (error) {
      console.error("Error while checking nickname:", error);
    }
  };

  const handleClickModify = () => {
    if (member.name.length === 0) {
      setShowModal(true); // 이름을 입력하지 않았을 때 모달 창을 보여줍니다.
      return;
    }
    // 회원 가입 처리 코드
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

  return (
    <div className="relative flex flex-col justify-center h-screen overflow-hidden">
      {showModal && (
        <ResultModal
          title="알림"
          content="이름을 입력해주세요."
          callbackFn={() => setShowModal(false)} // 모달 닫기
        />
      )}
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-gray-700">
          유저 회원가입
        </h1>
        <form className="space-y-4">
          <div>
            <label className="label">
              <span className="text-base label-text">이름</span>
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
              placeholder="Name"
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
                placeholder="닉네임입력"
                value={member.nickname || ""}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={handleClickCheckNickname}
                className={`btn btn-neutral ${checkNickname ? "btn-disabled" : ""} w-1/5 ml-1 text-ellipsis min-w-24`}
              >
                중복확인
              </button>
            </div>
            {checkNickname && (
              <div className="text-red-500">이미 사용 중인 닉네임입니다.</div>
            )}
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">전화번호</span>
            </label>
            <input
              className="w-full input input-bordered"
              type="text"
              name="tel"
              placeholder="-포함하여 입력하십시오"
              value={member.tel || ""}
              onChange={handleChange}
            />
          </div>
          <div>
            <div className="w-full input input-bordered overflow-auto ">
              약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서약관동의서관동의서약관동의서약관동의서약관동의서약관동의서약관동의서
            </div>
            <div>
              <input type="checkbox" required />
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
