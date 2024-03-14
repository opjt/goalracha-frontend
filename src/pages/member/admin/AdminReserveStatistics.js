import React, { useState, useEffect } from 'react';

const AdminGroundListPage = () => {
  const [grounds, setGrounds] = useState([]); // 구장 리스트를 저장할 상태
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', '1' (미승인), '2' (승인)
  const [selectedGround, setSelectedGround] = useState(null); // 모달에 표시될 구장의 상세 정보
  const [showModal, setShowModal] = useState(false); // 모달 표시 여부

  useEffect(() => {
    fetchGrounds();
  }, []);

  const fetchGrounds = () => {
    setIsLoading(true);
    fetch('http://localhost:8080/goalracha/ground/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Could not fetch ground data.');
        }
        return response.json();
      })
      .then(data => {
        console.log("Loaded grounds data:", data.dtoList); // 로그 출력: 불러온 데이터
        setGrounds(data.dtoList);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setIsLoading(false);
      });
  };

  // 마우스 이벤트 핸들러
  const handleMouseEnter = (id) => {
    setGrounds(grounds =>
      grounds.map(ground =>
        ground.gno === id ? { ...ground, isMouseOver: true } : ground
      )
    );
  };

  const handleMouseLeave = (id) => {
    setGrounds(grounds =>
      grounds.map(ground =>
        ground.gno === id ? { ...ground, isMouseOver: false } : ground
      )
    );
  };

   // 모달 닫기 함수
   const closeModal = () => {
    setShowModal(false);
    setSelectedGround(null); // 선택된 구장 정보 초기화
  };

  if (isLoading) return <div>Loading...</div>;
  if (!grounds.length) return <div>No ground data found.</div>;

  // 필터링된 구장 목록, 승인된 구장만 표시
  const filteredGrounds = grounds.filter(ground => ground.state === 2);

  return (
    <div className="container mx-auto mt-5">
      <h2 className="text-2xl font-bold mb-5">예약통계(DB 연동)</h2>

      {/* 테이블 */}
      <table className="table-auto w-full">
        <thead className="bg-gray-200">
          <tr>
            {["구장이름", "구장주소", "실내외", "구장크기", "잔디정보", "추천인원", "기본이용시간", "오픈시간", "마감시간", "요금", "이용안내", "이용규칙", "환불규정", "변경규정", "팀조끼대여여부", "풋살화대여여부", "샤워실여부", "공대여여부", "지붕여부", "냉난방시설여부", "주차장여부", "구장상태", "유저일련번호"].map((header, index) => (
              <th key={index} className="px-4 py-2">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody className="text-sm">
          {filteredGrounds.map((ground, index) => (
            <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
              {/* 구장 이름에 onClick 이벤트 추가 */}
              <td className="border px-4 py-2 cursor-pointer hover:bg-gray-200" onClick={() => {
                setSelectedGround(ground);
                setShowModal(true);
              }}>
                {ground.name}
              </td>
              <td className="border px-4 py-2">{ground.addr}</td>
              <td className="border px-4 py-2">{ground.inAndOut}</td>
              <td className="border px-4 py-2">{ground.width}</td>
              <td className="border px-4 py-2">{ground.grassInfo}</td>
              <td className="border px-4 py-2">{ground.recommdMan}</td>
              <td className="border px-4 py-2">{ground.usageTime}</td>
              <td className="border px-4 py-2">{ground.openTime}</td>
              <td className="border px-4 py-2">{ground.closeTime}</td>
              <td className="border px-4 py-2">{ground.fare}</td>
              <td className="border px-4 py-2">{ground.userGuide}</td>
              <td className="border px-4 py-2">{ground.userRules}</td>
              <td className="border px-4 py-2">{ground.refundRules}</td>
              <td className="border px-4 py-2">{ground.changeRules}</td>
              <td className="border px-4 py-2">{ground.vestIsYn ? '예' : '아니오'}</td>
              <td className="border px-4 py-2">{ground.footwearIsYn ? '예' : '아니오'}</td>
              <td className="border px-4 py-2">{ground.showerIsYn ? '예' : '아니오'}</td>
              <td className="border px-4 py-2">{ground.ballIsYn ? '예' : '아니오'}</td>
              <td className="border px-4 py-2">{ground.airconIsYn ? '예' : '아니오'}</td>
              <td className="border px-4 py-2">{ground.parkareaIsYn ? '예' : '아니오'}</td>
              <td className="border px-4 py-2">{ground.roopIsYn ? '예' : '아니오'}</td>
              <td className="border px-4 py-2">{ground.state}</td>
              <td className="border px-4 py-2">{ground.u_no}</td>
            </tr>
          ))}
        </tbody>
      </table>

       {/* 모달 창 */}
       {showModal && selectedGround && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" onClick={closeModal}>
        <div className="relative top-20 mx-auto p-5 border w-3/4 shadow-lg rounded-md bg-white" onClick={e => e.stopPropagation()}>
        <div className="mt-3 text-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900">{selectedGround.name} - 상세 정보</h3>
        {/* 모달 내용: 선택된 구장의 상세 정보 표시 */}
        {/* 예: 사진이나 상세 설명 */}
        <div className="mt-2">
          {/* 여기에 구장 사진 또는 상세 설명을 표시 */}
        </div>
        <div className="mt-4">
          <button onClick={() => setShowModal(false)} className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500">
            닫기
          </button>
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default AdminGroundListPage;