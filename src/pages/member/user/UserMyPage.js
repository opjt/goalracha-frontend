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
import UserReserveListComponent from "components/reserve/UserReserveListComponent";
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

  const handleModalClose = () => {
    setShowModal(false);
    if (modalContent === "회원 탈퇴가 성공적으로 이루어졌습니다.") {
      navigate("/logout");
    }
  };

  return (
    <BasicLayout>
		<>
			<div className="max-w-screen-xl mx-auto mt-1 p-4 max-md:p-0">
        <div className="flex items-center mb-2 gap-2">
          <div className="font-bold text-xl ">마이페이지</div>
        </div>
				<div className="border-2 rounded-md border-gray-100 p-5">
					<div className="flex justify-between">
						<div className="flex flex-col">
							<div className="font-semibold text-md">{member.name}</div>
							<div className="-mt-1 font-thin text-gray-400">{member.email}</div>
						</div>
						<div className="flex gap-2">
							
							<div className="btn hover:bg-inherit bg-inherit border-gray-200 font-light text-gray-500" onClick={openModal}>프로필 수정</div>
							<Link to={"/logout"}><div className="btn hover:bg-inherit bg-inherit border-gray-200 font-light text-gray-500">로그아웃</div></Link>
						</div>
					</div>
				</div>
				<div className="mt-8">
					<div className="font-semibold text-base mt-3">예약 내역</div>
					<UserReserveListComponent />
				</div>
  

				
			</div>

		</>
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
