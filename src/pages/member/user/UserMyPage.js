import React, { useState } from "react";
import BasicLayout from "layouts/BasicLayout";
import { useSelector } from "react-redux";
import UserModifyModal from "components/member/common/UserModifyModal";
import { Link } from "react-router-dom";

const UserMyPage = () => {
  const loginState = useSelector((state) => state.loginSlice);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <BasicLayout>
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
            {loginState.nickname}
          </div>
          <div className="flex justify-end ml-auto mt-4">
            <button
              onClick={openModal}
              className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              프로필 수정
            </button>
          </div>

          <div className="flex justify-center mt-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
              예약 내역 조회하기
            </button>
          </div>

          <div className="flex justify-center mt-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
              예약 내역 조회하기
            </button>
          </div>

          <div className="flex justify-end ml-auto mt-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
              회원탈퇴
            </button>
            <Link to={"/user/logout"}>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
                로그아웃
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* 모달 */}
      {isModalOpen && <UserModifyModal closeModal={closeModal} />}
    </BasicLayout>
  );
};

export default UserMyPage;
