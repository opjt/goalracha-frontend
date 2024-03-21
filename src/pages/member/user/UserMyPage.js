import React, { useEffect, useState } from "react";
import BasicLayout from "layouts/BasicLayout";
import { useSelector } from "react-redux";
import UserModifyModal from "components/member/user/UserModifyModal";
import { Link } from "react-router-dom";
import useCustomLogin from "hooks/useCustomLogin";
import { useNavigate } from "react-router-dom";
import Result2Modal from "components/common/Result2Modal";
import { withdrawMember } from "api/memberApi"; // 회원 탈퇴 API 호출
import { getUserReservationStatus } from "api/reserveApi"; // 예약 현황 API 호출

// 초기 상태 정의
const initState = {
  name: "",
  nickname: "",
  tel: "",
  email: "",
};

const UserMyPage = () => {
  const [member, setMember] = useState(initState); // 사용자 정보 상태
  const [quitState, setQuitestate] = useState(null); // 회원 예약 현황 상태
  const loginState = useSelector((state) => state.loginSlice); // 로그인 상태 가져오기
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const { isLogin, moveToLogin } = useCustomLogin();
  const [showModal, setShowModal] = useState(false); // 모달 표시 여부
  const [modalContent, setModalContent] = useState(""); // 모달 내용
  const navigate = useNavigate();

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

  // 회원 탈퇴 버튼 클릭 시 처리
  const handleClickModify = async () => {
    try {
      // 사용자 예약 현황 불러오기
      const res = await getUserReservationStatus(
        { page: 1, size: 100 },
        loginState.uNo
      );
      console.log(res);
      var totalCount = res.totalCount;
      if (totalCount != 0) {
        setModalContent("예약이 존재하여 탈퇴할 수 없습니다.");
        setShowModal(true);
        return;
      }
      // 탈퇴 API 호출
      await withdrawMember(loginState.uNo);
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
      // 탈퇴 성공시 로그아웃 후 페이지 이동
      navigate("/logout");
    }
  };

  return (
    <BasicLayout>
      {/* 사용자 정보 UI */}
      <div className="container mx-auto max-w-[1080px]">
        <div className="w-full border border-gray rounded-lg p-10 mb-4 mt-4 flex flex-col items-center">
          <div className="flex justify-center">
            <div class="card w-96 bg-base-100 shadow-xl">
              <figure></figure>
              <div class="card-body">
                <h2 class="card-title">{member.name}</h2>
                <p>
                  ⚽️ {member.nickname}
                  <br />
                  🥅 {member.email}
                  <br />
                  🍀 {member.tel}
                  <br />
                </p>
                <div class="card-actions justify-end">
                  <button
                    onClick={openModal} // 프로필 수정 모달 열기
                    class="btn btn-"
                  >
                    프로필 수정
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 예약 내역 조회 및 이용 내역 조회 버튼 */}
          <div className="flex justify-center mt-8 flex-col items-center">
            <div className="mb-8">
              <Link
                to={{
                  pathname: "/reserve/PreviousReservations",
                  state: { uNo: loginState.uNo }, // uNo를 state로 전달
                }}
              >
                <button className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-12 rounded">
                  이용 내역 조회
                </button>
              </Link>
            </div>
            <div>
              <Link
                to={{
                  pathname: "/reserve/ReservationStatus",
                  state: { uNo: loginState.uNo }, // uNo를 state로 전달
                }}
              >
                <button className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-12 rounded">
                  예약 현황 조회
                </button>
              </Link>
            </div>
          </div>
          {/* 회원탈퇴 및 로그아웃 버튼 */}
          <div className="flex justify-end ml-auto mt-4">
            <button
              onClick={handleClickModify} // 회원 탈퇴 클릭 시 처리
              className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mr-4"
            >
              회원탈퇴
            </button>
            <Link to={"/logout"}>
              <button className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mr-4">
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

      {/* 회원 탈퇴 결과 모달 */}
      {showModal && (
        <Result2Modal
          title="알림"
          content={modalContent}
          close="확인"
          callbackFn={handleModalClose} // 결과 모달 닫기 함수 전달
        />
      )}
    </BasicLayout>
  );
};

export default UserMyPage;
