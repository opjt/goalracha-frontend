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
import moment from "moment";
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

  const handleClickQuit = async () => {
    try {
      const res = await getUserReservationStatus(
        { page: 1, size: 9999 },
        loginState.uNo
      );
      var resDTOlist = res.dtoList
      var totalCount= 0;
      for(var key in resDTOlist) {

        if(!(moment(resDTOlist[key].reserveDate).isBefore(moment().subtract(1, "days")) || resDTOlist[key].state === 0)) {
          totalCount++
          break;
        }
        
      }
      console.log(totalCount)
      
      if (totalCount !== 0) {
        setModalContent("예약이 존재하여 탈퇴할 수 없습니다.");
        setShowModal(true);
        return;
      }
      if (window.confirm("정말 탈퇴하시겠습니까?") == false){
        return true;
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
			<div className="max-w-screen-xl mx-auto mt-4 p-4 max-md:p-0">
        <div className="flex items-center mb-4 gap-2">
          <div className="font-bold text-xl ">마이페이지</div>
        </div>
				<div className="border-2 rounded-md border-gray-100 p-5">
					<div className="flex justify-between max-md:flex-col gap-2">
						<div className="flex flex-col">
							<div className="font-semibold text-md">👋🏻 {member.name} 님, 환영합니다 !</div>
							<div className="mt-1 font-thin text-gray-400">{member.email}</div>
              <div className="mt-1 font-thin text-gray-400">{member.tel}</div>
						</div>
						<div className="flex gap-2">
							
							<div className="btn hover:bg-inherit bg-inherit border-gray-200 font-light text-gray-500" onClick={openModal}>프로필 수정</div>
							<Link to={"/logout"}><div className="btn hover:bg-inherit bg-inherit border-gray-200 font-light text-gray-500">로그아웃</div></Link>
						</div>
            
					</div>
          <div className="text-right p-3 pt-2">
            <button className="text-gray-400 text-sm"onClick={handleClickQuit}>회원탈퇴</button>
          </div>
				</div>
				<div className="mt-8">
                    <div className="flex justify-between items-center mb-4 gap-2">
                        <div className="font-bold text-xl">예약 내역 </div>
                        <div className="inline-flex text-sm cursor-pointer" onClick={() => (navigate('/reserve/list'))}>더보기 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg></div>
                    </div>
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
