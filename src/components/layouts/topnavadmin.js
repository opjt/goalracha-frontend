import React from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위해 React Router의 useNavigate 훅 사용

const TopnavAdmin = () => {
  const navigate = useNavigate(); // useNavigate 훅을 이용한 navigate 함수 초기화

  // 페이지 이동을 위한 함수들
  const goToStadiumManagement = () => navigate('/admin-ground-manage');
  const goToUserManagement = () => navigate('/admin-user-manage');
  const goToAnnouncements = () => navigate('/notice');
  const goToStatistics = () => navigate('/admin-statistics');
  const goToMyPage = () => navigate('/adminPage');

  return (
    <div className="max-w-screen-xl mx-auto navbar bg-base-100 px-2 py-0 min-h-1">
      <div className="navbar flex font-normal text-lg p-0 min-h-1">
        {/* 각 항목을 버튼으로 변경 */}
        <button onClick={goToStadiumManagement} className="font-bold btn btn-ghost">구장관리</button>
        <button onClick={goToUserManagement} className="ml-7 btn btn-ghost">유저관리</button>
        <button onClick={goToAnnouncements} className="ml-7 btn btn-ghost">공지사항</button>
        <button onClick={goToStatistics} className="ml-7 btn btn-ghost">통계관리</button>
        <button onClick={goToMyPage} className="ml-7 btn btn-ghost">마이페이지</button>
      </div>
    </div>
  );
}

export default TopnavAdmin;
