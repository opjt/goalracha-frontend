import React, { useState, useEffect } from "react";
import BasicLayout from "layouts/BasicLayout"; // 기본 레이아웃 컴포넌트 import
import { useSelector } from "react-redux"; // Redux에서 상태를 가져오기 위한 hook import
import OwnerPwModifyModal from "components/member/owner/OwnerPwModifyModal"; // 비밀번호 수정 모달
import OwnerModifyModal from "components/member/owner/OwnerModifyModal"; // 담당자 수정 모달
import { Link } from "react-router-dom"; // react-router의 Link 컴포넌트 import
import { withdrawMember } from "api/memberApi"; // 회원 탈퇴 API 호출
import Result2Modal from "components/common/Result2Modal";
import { useNavigate } from "react-router-dom";
import { set } from "date-fns";
import OwnerInfoModal from "components/member/owner/OwnerInfoModal"; // 상세 조회 모달

// 초기 상태 정의
const initState = {
  businessId: "", // 사업자 등록 번호
  businessName: "", // 사업자명
  name: "", // 담당자 이름
  userId: "", // 아이디
  pw: "", // 비밀번호
  email: "", // 이메일
  tel: "", // 연락처
};

// OwnerMyPage 컴포넌트 정의
const OwnerMyPage = () => {
  const [member, setMember] = useState(initState); // 회원 정보 상태
  const loginInfo = useSelector((state) => state.loginSlice); // Redux 상태에서 로그인 정보 가져오기
  const [result, setResult] = useState(); // 결과 메시지 상태
  const [isPwModalOpen, setIsPwModalOpen] = useState(false); // 비밀번호 수정 모달 열림 상태
  const [isModalOpen, setIsModalOpen] = useState(false); // 담당자 수정 모달 열림 상태
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false); // 상세 조회 모달 열림 상태
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // 로그인 정보가 변경될 때마다 실행되는 부분
    if (loginInfo) {
      // 회원 정보 상태 업데이트
      setMember({
        ...member,
        businessId: loginInfo.businessId,
        businessName: loginInfo.businessName,
        userId: loginInfo.userId,
        pw: "******", // 비밀번호를 가립니다.
        name: loginInfo.name,
        email: loginInfo.email,
        tel: loginInfo.tel,
      });
    }
    // 로컬 스토리지에서 수정된 정보 가져오기
  }, [loginInfo]); // loginInfo가 변경될 때마다 실행

  // 비밀번호 모달 열기 함수
  const openPwModifyModal = () => {
    setIsPwModalOpen(true); // 비밀번호 수정 모달 열기
  };

  // 비밀번호 모달 닫기 함수
  const closePwModifyModal = () => {
    setIsPwModalOpen(false); // 비밀번호 수정 모달 닫기
  };

  const openModifyModal = () => {
    setIsModalOpen(true); // 담당자 수정 모달 열기
  };

  const closeModifyModal = () => {
    setIsModalOpen(false); // 담당자 수정 모달 닫기
  };

  const openInfoModal = () => {
    setIsInfoModalOpen(true); // 상세 조회 모달 열기
  };

  const closeInfoModal = () => {
    setIsInfoModalOpen(false); // 상세 조회 모달 닫기
  };

  // 회원 탈퇴 버튼 클릭 시 처리
  const handleClickModify = async () => {
    try {
      withdrawMember(loginInfo.uNo);
      setModalContent("회원 탈퇴가 성공적으로 이루어졌습니다.");
      setShowModal(true);
    } catch (error) {
      console.error("Error while handling member withdrawal:", error);
    }
  };

  // 회원 탈퇴 결과 모달 닫기 함수
  const handleModalClose = () => {
    setShowModal(false);
    if (modalContent === "회원 탈퇴가 성공적으로 이루어졌습니다.") {
      navigate("/logout");
    }
  };

  return (
    <>
      <div className="max-w-screen-xl mx-auto mt-4 p-4 max-md:p-0">
        {" "}
        {/* 마이페이지랑 담당자 정보 사이의 간격 조절 */}
        <div className="flex items-center mb-4 gap-2">
          <div className="font-bold text-xl">마이페이지</div>
        </div>
        <div className="border-2 rounded-md border-gray-100 p-5">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <div className="font-semibold text-md">
              👋🏻 {member.businessName} 님, 환영합니다 !
              </div>
              <div className="mt-1 font-thin text-gray-400">
                {member.userId}
              </div>
            </div>
            <div className="flex gap-2">
              <div
                className="btn hover:bg-inherit bg-inherit border-gray-200 font-light text-gray-500"
                onClick={openInfoModal}
              >
                내 정보
              </div>
              <div
                className="btn hover:bg-inherit bg-inherit border-gray-200 font-light text-gray-500"
                onClick={openPwModifyModal}
              >
                비밀번호 수정
              </div>
            </div>
          </div>
        </div>
        <div className="font-bold text-xl mt-6 mb-4">담당자 정보</div>
        <div className="border-2 rounded-md border-gray-100 p-5">
          <div className="flex justify-between ">
            <div className="flex flex-col">
              <div className="font-semibold text-md">
               👤 {member.name} 님이 담당하고 있어요.
              </div>
              <div className="mt-1 font-thin text-gray-400">{member.tel}</div>
            </div>
            <div className="flex gap-2">
              <div
                className="btn hover:bg-inherit bg-inherit border-gray-200 font-light text-gray-500"
                onClick={openModifyModal}
              >
                담당자 수정
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end ml-auto mt-8 mb-2">
          {" "}

          <Link to={"/logout"}>
            <div className="btn hover:bg-inherit bg-inherit border-gray-200 font-light text-gray-500 mr-5">
              로그아웃
            </div>
          </Link>
        </div>
      </div>
      {/* 비밀번호 수정 모달 */}
      {isPwModalOpen && (
        <OwnerPwModifyModal
          closeModal={closePwModifyModal}
          uNo={loginInfo.uNo}
          pw={member.pw}
          isOpen={isPwModalOpen}
        />
      )}
      {/* 담당자 수정 모달 */}
      {isModalOpen && (
        <OwnerModifyModal
          closeModal={closeModifyModal}
          uNo={loginInfo.uNo}
          name={member.name}
          tel={member.tel}
          isOpen={isModalOpen}
        />
      )}
      {/* 상세 조회 모달 */}
      {isInfoModalOpen && (
        <OwnerInfoModal
          closeModal={closeInfoModal}
          member={member}
          isOpen={isInfoModalOpen}
        />
      )}
      {/* 회원 탈퇴 모달 */}
      {showModal && (
        <Result2Modal
          title="알림"
          content={modalContent}
          close="확인"
          callbackFn={handleModalClose}
          closeButton="닫기"
        />
        )}

        </>
    );
};

export default OwnerMyPage;
