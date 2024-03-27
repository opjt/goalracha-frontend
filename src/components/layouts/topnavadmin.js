import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TopnavAdmin = () => {
  const navigate = useNavigate();
  const [showStadiumSubMenu, setShowStadiumSubMenu] = useState(false);
  const [showUserSubMenu, setShowUserSubMenu] = useState(false);
  const [showStatsSubMenu, setShowStatsSubMenu] = useState(false);

  // 페이지 이동 함수들
  const goToMyPage = () => navigate('/adminPage');
  const goToDashBoard = () => navigate('/adminPage/notice');

  // 구장관리 서브메뉴 이동
  const goToSubmenu2 = () => navigate('/adminPage/GroundListPage'); // 구장 리스트
  const goToSubmenu3 = () => navigate('/adminPage/ReserveListPage'); // 예약 내역 

  // 유저관리 서브메뉴 이동
  const goToUserSubmenu1 = () => navigate('/adminPage/OwnerManagePage'); // 사업자 관리
  const goToUserSubmenu2 = () => navigate('/adminPage/UserManagePage'); // 사용자 관리 

  // 통계관리 서브메뉴 이동
  const goToStatsSubmenu1 = () => navigate('/adminPage/ReserveStatisticsPage'); // 예약 통계
  const goToStatsSubmenu2 = () => navigate('/adminPage/MemberStatisticsPage'); // 년별 통계
  const goToStatsSubmenu3 = () => navigate('/adminPage/SalesStatisticsPage'); // 년별 통계

  return (
    <div className="max-w-screen-xl mx-auto navbar bg-base-100 px-2 py-0 min-h-1">
      <div className="navbar flex font-normal text-lg p-0 min-h-1 gap-x-4">
        {/* 구장관리 메뉴 */}
        <div 
          onMouseEnter={() => setShowStadiumSubMenu(true)} 
          onMouseLeave={() => setShowStadiumSubMenu(false)} 
          className="relative flex flex-col"
        >
          <button className="font-bold btn btn-ghost">구장관리</button>
          {showStadiumSubMenu && (
            <div className="absolute left-0 w-full mt-px bg-white shadow-xl flex flex-col rounded-md">
              <button onClick={goToSubmenu2} className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:shadow-lg rounded-md">구장<br />리스트</button>
              <button onClick={goToSubmenu3} className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:shadow-lg rounded-md">예약<br />내역</button>
            </div>
          )}
        </div>
  
        {/* 유저관리 메뉴 */}
        <div 
          onMouseEnter={() => setShowUserSubMenu(true)} 
          onMouseLeave={() => setShowUserSubMenu(false)} 
          className="relative flex flex-col"
        >
          <button className="font-bold btn btn-ghost">유저관리</button>
          {showUserSubMenu && (
            <div className="absolute left-0 w-full mt-px bg-white shadow-xl flex flex-col rounded-md">
              <button onClick={goToUserSubmenu1} className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:shadow-lg rounded-md">사업자 관리</button>
              <button onClick={goToUserSubmenu2} className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:shadow-lg rounded-md">사용자 관리</button>
            </div>
          )}
        </div>
  
        {/* 통계관리 메뉴 */}
        <div 
          onMouseEnter={() => setShowStatsSubMenu(true)} 
          onMouseLeave={() => setShowStatsSubMenu(false)} 
          className="relative flex flex-col"
        >
          <button className="font-bold btn btn-ghost">통계관리</button>
          {showStatsSubMenu && (
            <div className="absolute left-0 w-full mt-px bg-white shadow-xl flex flex-col rounded-md">
              <button onClick={goToStatsSubmenu1} className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:shadow-lg rounded-md">예약<br />통계</button>
              <button onClick={goToStatsSubmenu2} className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:shadow-lg rounded-md">회원<br />통계</button>
              <button onClick={goToStatsSubmenu3} className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:shadow-lg rounded-md">매출<br />통계</button>
            </div>
          )}
        </div>
  
        {/* 공지관리 메뉴 */}
        <button onClick={goToDashBoard} className="btn btn-ghost font-bold">공지관리</button>
      </div>
    </div>
  );
  
}

export default TopnavAdmin;
