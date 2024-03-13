import React, { useState, useEffect } from 'react';

const AdminGroundListPage = () => {
  const [grounds, setGrounds] = useState([]); // 구장 리스트를 저장할 상태
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', '1' (미승인), '2' (승인)

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
        setGrounds(data.dtoList);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setIsLoading(false);
      });
  };

  const changeGroundState = (gNo, newState) => {
    console.log(`구장 상태 변경: ${gNo} -> ${newState}`);
    // 백엔드에 상태 변경 요청 보내기
    fetch(`http://localhost:8080/goalracha/ground/changeState/${gNo}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newState }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('구장 상태 업데이트 실패');
      }
      return response.json();
    })
    .then(() => {
      fetchGrounds(); // 상태 변경 후 목록 새로고침
      // 필터 상태를 자동으로 조정하여 상태 변경에 따라 목록을 필터링
      setFilter(newState.toString()); // '1' (미승인) 또는 '2' (승인)으로 필터 변경
    })
    .catch(error => console.error('Error:', error));
  };

  // 마우스 이벤트 핸들러
  const handleMouseEnter = (id) => {
    setGrounds(grounds =>
      grounds.map(ground =>
        ground.gNo === id ? { ...ground, isMouseOver: true } : ground
      )
    );
  };

  const handleMouseLeave = (id) => {
    setGrounds(grounds =>
      grounds.map(ground =>
        ground.gNo === id ? { ...ground, isMouseOver: false } : ground
      )
    );
  };

  if (isLoading) return <div>Loading...</div>;
  if (!grounds.length) return <div>No ground data found.</div>;

   // 필터링된 구장 목록
   const filteredGrounds = grounds.filter(ground => {
    if (filter === 'all') return true;
    return ground.state.toString() === filter;
  });

  return (
    <div className="container mx-auto mt-5">
      <h2 className="text-2xl font-bold mb-5">구장 리스트(DB 연동)</h2>

      {/* 필터 버튼 */}
      <div className="mb-4">
        <button onClick={() => setFilter('all')} className="mr-2 px-4 py-2 bg-blue-400 text-white rounded">모든 구장</button>
        <button onClick={() => setFilter('1')} className="mr-2 px-4 py-2 bg-red-400 text-white rounded">미승인 구장</button>
        <button onClick={() => setFilter('2')} className="px-4 py-2 bg-green-400 text-white rounded">승인 구장</button>
      </div>

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
              <td className="border px-4 py-2">{ground.name}</td>
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
              {/* 구장 정보 */}
              <td className="border px-4 py-2">
                <button
                  onMouseEnter={() => handleMouseEnter(ground.gNo)}
                  onMouseLeave={() => handleMouseLeave(ground.gNo)}
                  onClick={() => changeGroundState(ground.gNo, ground.state === 1 ? 2 : 1)}
                  className="px-4 py-2 text-white rounded"
                  style={{
                    backgroundColor: ground.isMouseOver
                      ? ground.state === 1 ? 'green' : 'red' // 마우스 오버 시 미승인이면 초록색, 승인이면 빨간색으로 변경
                      : ground.state === 1 ? 'red' : 'green', // 기본 상태에서 미승인은 빨간색, 승인은 초록색
                  }}
                >
                  {ground.isMouseOver
                  ? ground.state === 1 ? '승인 변경' : '미승인 변경'
                  : ground.state === 1 ? '미승인' : '승인'}
                </button>
              </td>
              <td className="border px-4 py-2">{ground.u_no}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminGroundListPage;