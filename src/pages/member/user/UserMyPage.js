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

const initState = {
  name: "",
  nickname: "",
  tel: "",
  email: "",
};

const UserMyPage = () => {
  const [member, setMember] = useState(initState);
  const loginState = useSelector((state) => state.loginSlice);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLogin, moveToLogin } = useCustomLogin();
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin) {
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
  }, [loginState]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 회원 탈퇴 버튼 클릭 시 처리
  const handleClickModify = async () => {
    try {
      const res = await getUserReservationStatus(
        { page: 1, size: 100 },
        loginState.uNo
      );
      console.log(res);
      var totalCount = res.totalCount;
      if (totalCount !== 0) {
        setModalContent("예약이 존재하여 탈퇴할 수 없습니다.");
        setShowModal(true);
        return;
      }
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
      navigate("/logout");
    }
  };

  return (
    <BasicLayout>
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
                  <div class="dropdown dropdown-hover">
                    <div tabindex="0" role="button" class="btn m-1">
                      계정관리
                    </div>
                    <ul
                      tabindex="0"
                      class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                    >
                      <li>
                        <button onClick={openModal}>프로필수정</button>
                      </li>
                      <li>
                        <button onClick={handleClickModify}>회원탈퇴</button>
                      </li>
                      <li>
                        <Link to={"/logout"}>
                          <button>로그아웃</button>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-8 flex-col items-center">
            <div className="mb-8">
              <Link
                to={{
                  pathname: "/reserve/PreviousReservations",
                  state: { uNo: loginState.uNo },
                }}
              >
                <button class="btn btn-wide">이용 내역 조회</button>
              </Link>
            </div>
            <div>
              <Link
                to={{
                  pathname: "/reserve/ReservationStatus",
                  state: { uNo: loginState.uNo },
                }}
              >
                <button class="btn btn-wide">예약 현황 조회</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <UserModifyModal
          closeModal={closeModal}
          uNo={loginState.uNo}
          nickname={member.nickname}
          tel={member.tel}
        />
      )}
      {showModal && (
        <Result2Modal
          title="알림"
          content={modalContent}
          close="확인"
          callbackFn={handleModalClose}
        />
      )}
    </BasicLayout>
  );
};

export default UserMyPage;
