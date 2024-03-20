import React, { useEffect, useState } from "react";
import BasicLayout from "layouts/BasicLayout";
import { useSelector } from "react-redux";
import UserModifyModal from "components/member/user/UserModifyModal";
import { Link } from "react-router-dom";
import useCustomLogin from "hooks/useCustomLogin";
import WithdrawConfirmationModal from "components/member/user/WithdrawConfirmationModal"; // 회원 탈퇴 확인 모달 import
import { withdrawMember } from "api/memberApi"; // 회원 탈퇴 API 호출

// 초기 상태 정의
const initState = {
  name: '',
  nickname: '',
  tel: '',
  email: '',
}

const UserMyPage = () => {
  const [member, setMember] = useState(initState); // 사용자 정보 상태
  const loginState = useSelector((state) => state.loginSlice); // 로그인 상태 가져오기
  const [result, setResult] = useState(); // 결과 메시지 상태
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const {isLogin, moveToLogin} = useCustomLogin();
  const [isWithdrawConfirmationModalOpen, setIsWithdrawConfirmationModalOpen] = useState(false); // 회원 탈퇴 확인 모달 상태

  // 컴포넌트가 마운트될 때 로그인 정보가 변경될 때마다 실행되는 useEffect
  useEffect(() => {
    // 로그인 정보가 존재하는 경우
    if (isLogin) {
      // 회원 정보 상태 업데이트
      setMember({
        ...member,
        nickname: loginState.nickname,
        tel: loginState.tel,
        email: loginState.email,
        name: loginState.name,
      });
    } else {
        moveToLogin();
    }
  }, [loginState]); // loginState가 변경될 때마다 실행

  // 모달 열기 함수
  const openModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setIsModalOpen(false);
  };

 // 회원 탈퇴 함수
  const handleWithdraw = async () => {
  try {
    await withdrawMember(loginState.uNo); // 회원 탈퇴 요청
    setResult("회원 탈퇴가 성공적으로 처리되었습니다.");
  } catch (error) {
    setResult("회원 탈퇴에 실패하였습니다.");
  }
};

// 모달 열기 함수
const openWithdrawConfirmationModal = () => {
  setIsWithdrawConfirmationModalOpen(true);
};

// 모달 닫기 함수
const closeWithdrawConfirmationModal = () => {
  setIsWithdrawConfirmationModalOpen(false);
};


  return (
    <BasicLayout>
      {/* 사용자 정보 UI */}
      <div className="container mx-auto max-w-[1080px]">
        <div className="w-full border border-black rounded-lg p-10 mb-4 mt-4 flex flex-col items-center">
          <div className="flex justify-center">
            <img
              alt="사용자 프로필 사진"
              src="/img/user.png"
              className="w-24 h-24 rounded-full"
            />
          </div>
          <div className="container text-center mt-2 font-bold">
            {member.nickname}
          </div>
          <div className="flex justify-end ml-auto mt-4">
            <button
              onClick={openModal} // 프로필 수정 모달 열기
              className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              프로필 수정
            </button>
          </div>
          {/* 예약 내역 조회 및 이용 내역 조회 버튼 */}
          <div className="flex justify-center mt-4">
            <Link
              to={{
                pathname: "/reserve/PreviousReservations",
                state: { uNo: loginState.uNo } // uNo를 state로 전달
              }}
            >
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
                이전 예약 내역 목록
              </button>
            </Link>
            <Link
              to={{
                pathname: "/reserve/ReservationStatus",
                state: { uNo: loginState.uNo } // uNo를 state로 전달
              }}
            >
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
                예약 현황
              </button>
            </Link>
          </div>
          {/* 회원탈퇴 및 로그아웃 버튼 */}
          <div className="flex justify-end ml-auto mt-4">
            <button
              onClick={openWithdrawConfirmationModal} // 회원탈퇴 확인 모달
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
            >
              회원탈퇴
            </button>
            <Link to={"/logout"}>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
                로그아웃
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* 프로필 수정 모달 */}
      {isModalOpen && (
        <UserModifyModal
          closeModal={closeModal} // 모달 닫기 함수 전달
          uNo={loginState.uNo} // 사용자 번호 전달
          nickname={member.nickname} // 닉네임 정보 전달
          tel={member.tel} // 전화번호 정보 전달

        />
      )}

      {/* 회원 탈퇴 확인 모달 */}
      <WithdrawConfirmationModal
        isOpen={isWithdrawConfirmationModalOpen}
        onClose={closeWithdrawConfirmationModal}
        onConfirmWithdraw={handleWithdraw}
      />

    </BasicLayout>
  );
};

export default UserMyPage;
