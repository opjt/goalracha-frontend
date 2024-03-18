import React, { useState,useEffect } from "react";
import BasicLayout from "layouts/BasicLayout";
import { useSelector } from "react-redux";
import UserModifyModal from "components/member/user/UserModifyModal";
import { Link } from "react-router-dom";
import useCustomLogin from "hooks/useCustomLogin";

// 초기 상태 정의
const initState = {
  name: "",
  nickname: "",
  tel: "",
  email: "",
};

const UserMyPage = () => {
  const [member, setMember] = useState(initState); // 사용자 정보 상태
  const loginState = useSelector((state) => state.loginSlice); // 로그인 상태 가져오기
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false); // 회원 탈퇴 모달 상태
  const {isLogin, moveToLogin} = useCustomLogin();

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

  // 회원 탈퇴 모달 열기 함수
  const openWithdrawalModal = () => {
    // 사용자의 풋살장 구장 예약내역 확인
    const hasReservation = checkReservation();
    // 풋살장 구장 예약내역이 있는 경우 경고 모달 표시
    if (hasReservation) {
      // 경고 모달 표시
      return;
    }
    // 풋살장 구장 예약내역이 없는 경우 회원 탈퇴 모달 열기
    setIsWithdrawalModalOpen(true);
  };

  // 회원 탈퇴 모달 닫기 함수
  const closeWithdrawalModal = () => {
    setIsWithdrawalModalOpen(false);
  };

  // 풋살장 구장 예약내역 확인 함수
  const checkReservation = () => {
    // 여기서 풋살장 구장 예약내역을 확인하고 예약이 있는지 여부를 반환
    // 예약이 있는 경우 true를 반환, 없는 경우 false를 반환
    // 예약 확인 로직을 구현해주세요
    return false; // 임시로 false를 반환하도록 설정
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
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
              예약 내역 조회하기
            </button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
              이용 내역 조회하기
            </button>
          </div>
          {/* 회원탈퇴 및 로그아웃 버튼 */}
          <div className="flex justify-end ml-auto mt-4">
            <button
              onClick={openWithdrawalModal} // 회원 탈퇴 모달 열기
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

      {/* 회원 탈퇴 모달 */}
      {isWithdrawalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-auto max-w-sm mx-auto my-6">
            <div className="relative flex flex-col bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
              {/* Header */}
              <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
                <h3 className="text-3xl font-semibold">회원 탈퇴</h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={closeWithdrawalModal}
                >
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                </button>
              </div>
              {/* Body */}
              <div className="relative p-6 flex-auto">
                <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                  정말 탈퇴하시겠습니까? 탈퇴 후 모든 정보는 사라지며 되돌릴 수 없습니다.
                </p>
              </div>
              {/* Footer */}
              <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-blueGray-200">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  onClick={() => {
                    console.log("Cancel withdrawal");
                    closeWithdrawalModal();
                  }}
                >
                  취소
                </button>
                <button
                  className="bg-green-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  onClick={() => {
                    console.log("Confirm withdrawal");
                    // 여기에 회원 탈퇴 로직을 추가하세요
                    closeWithdrawalModal();
                  }}
                >
                  탈퇴하기
                </button>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </div>
      )}

      {/* 회원 탈퇴 모달 */}
      {isWithdrawalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-auto max-w-sm mx-auto my-6">
            <div className="relative flex flex-col bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
              {/* Header */}
              <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
                <h3 className="text-3xl font-semibold">회원 탈퇴</h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={closeWithdrawalModal}
                >
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                </button>
              </div>
              {/* Body */}
              <div className="relative p-6 flex-auto">
                <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                  정말 탈퇴하시겠습니까? 탈퇴 후 모든 정보는 사라지며 되돌릴 수 없습니다.
                </p>
              </div>
              {/* Footer */}
              <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-blueGray-200">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  onClick={() => {
                    console.log("Cancel withdrawal");
                    closeWithdrawalModal();
                  }}
                >
                  취소
                </button>
                <button
                  className="bg-green-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  onClick={() => {
                    console.log("Confirm withdrawal");
                    // 여기에 회원 탈퇴 로직을 추가하세요
                    closeWithdrawalModal();
                  }}
                >
                  탈퇴하기
                </button>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </div>
      )}
    </BasicLayout>
  );
};

export default UserMyPage;
