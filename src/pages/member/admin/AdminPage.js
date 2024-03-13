import React, { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom"; // React Router v6 사용
import useCustomLogin from "hooks/useCustomLogin";
import jwtAxios from "util/jwtUtil"



const AdminPage = () => {
  const navigate = useNavigate();
  const { loginState } = useCustomLogin();
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogout = () => {
    navigate("/user/logout");
  };

  const toggleChangePasswordForm = () => {
    setShowChangePasswordForm(!showChangePasswordForm);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("새 비밀번호와 확인 비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      await jwtAxios.put(
        `/api/admin/${loginState.userId}/change-password`,
        { newPassword: newPassword },
        { headers: { "Content-Type": "application/json" } }
      );

      alert("비밀번호가 변경되었습니다.");
      handleLogout(); // Or another action
    } catch (error) {
      console.error("비밀번호 변경 중 오류가 발생했습니다.", error);
      alert("비밀번호 변경에 실패했습니다.");
    }
  };

  return (
    <>
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-4">관리자 페이지</h1>
        <p className="mb-4">
          환영합니다, {loginState.nickname}님! 로그인에 성공하셨습니다.
        </p>
        
        <button
          onClick={toggleChangePasswordForm}
          className="mb-4 px-4 py-2 text-white bg-gray-600 hover:bg-blue-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          비밀번호 변경
        </button>
        

        {showChangePasswordForm && (
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                새 비밀번호:
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                새 비밀번호 확인:
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="submit"
                className="px-4 py-2 text-white bg-gray-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                변경하기
              </button>
            </div>
          </form>
        )}

        <div className="flex justify-end mt-4">
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-white bg-gray-600 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            로그아웃
          </button>
        </div>
      </div>
            {/* Outlet 추가 */}
            <Outlet />
    </>
  );
};

export default AdminPage;