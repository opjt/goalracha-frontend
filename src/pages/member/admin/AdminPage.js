import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // React Router v6 사용
import MainHeader from "components/layouts/mainHeader";
import useCustomLogin from "hooks/useCustomLogin";
import axios from "axios";
import TopNavAdmin from "components/layouts/topnavadmin"; // TopNav_Admin 컴포넌트 임포트

const AdminPage = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 훅
  const { isLogin, loginState, moveToPath } = useCustomLogin();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogout = () => {
    // 로컬 스토리지에서 토큰 제거 등 로그아웃 처리
    // 예: localStorage.removeItem('token');

    // 홈페이지로 리다이렉트
    navigate("/user/logout");
  };

  // handleChangePassword 함수
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("새 비밀번호와 확인 비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await axios.put(
        `/api/admin/${loginState.userId}/change-password`,
        { newPassword: newPassword },
        { headers: { "Content-Type": "application/json" } }
      );

      alert("비밀번호가 변경되었습니다.");
      // 성공 후 로그아웃 처리나 추가적인 액션
    } catch (error) {
      console.error("비밀번호 변경 중 오류가 발생했습니다.", error);
      alert("비밀번호 변경에 실패했습니다.");
    }
  };

  return (
    <>
      <MainHeader />
      <TopNavAdmin /> {/* TopNav_Admin 컴포넌트 렌더링 */}
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-4">관리자 페이지</h1>
        <p className="mb-4">
          환영합니다, {loginState.nickname}님! 로그인에 성공하셨습니다.
        </p>
        <div className="mb-8">
          <p>ID: {loginState.userId}</p>
          <p>Email: {loginState.email}</p>
        </div>

        {/* 비밀번호 변경 폼 */}
        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700"
            >
              새 비밀번호:
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              새 비밀번호 확인:
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="submit"
              className="px-4 py-2 w-1/4 text-white bg-gray-600 rounded hover:bg-blue-700 focus:outline-none focus:border-blue-700 focus:ring-blue-500"
            >
              비밀번호 변경
            </button>
          </div>
        </form>

        {/* 로그아웃 버튼 추가 */}
        <div className="flex justify-end mt-4">
          <button
            onClick={handleLogout}
            className="px-4 py-2 w-1/4 text-white bg-gray-600 rounded hover:bg-red-700 focus:outline-none focus:border-red-700 focus:ring-red-500"
          >
            로그아웃
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
