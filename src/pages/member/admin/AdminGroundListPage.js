import React, { useState, useEffect } from 'react';
import { fetchGrounds, changeGroundState, fetchImagesByGno } from '../../../api/adminAPI';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const AdminGroundListPage = () => {
  const [grounds, setGrounds] = useState([]); // 구장 리스트를 저장할 상태
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', '1' (미승인), '2' (승인)
  const [selectedGround, setSelectedGround] = useState(null); // 모달에 표시될 구장의 상세 정보
  const [showModal, setShowModal] = useState(false); // 모달 표시 여부

  useEffect(() => {
    fetchGroundsData();
  }, []);

  useEffect(() => {
    console.log('선택된 구장:', selectedGround);
  }, [selectedGround]);
  
  const fetchGroundsData = async () => {
    setIsLoading(true);
    try {
      const response = await fetchGrounds();
      setGrounds(response.data.dtoList || []);
    } catch (error) {
      console.error('Error fetching grounds:', error);
    }
    setIsLoading(false);
  };

  const handleUpdateGroundState = async (gno, currentState) => {
    const newState = currentState === 1 ? 2 : 1;
    try {
      await changeGroundState(gno, newState);
      await fetchGroundsData(); // 상태 변경 후 목록 새로고침을 확실하게 수행
    } catch (error) {
      console.error('Error updating ground state:', error);
    }
  };

  const handleSelectGround = async (ground) => {
    setIsLoading(true);
    try {
      const images = await fetchImagesByGno(ground.gno);
      setSelectedGround({ ...ground, uploadFileNames: images });
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching images for ground:', error);
    } finally {
      setIsLoading(false);
    }
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

   // 필터링된 구장 목록
   const filteredGrounds = grounds.filter(ground => {
    if (filter === 'all') return true;
    return ground.state.toString() === filter;
  });

  // 슬라이더 설정
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <button className="slick-prev">Previous</button>,
    nextArrow: <button className="slick-next">Next</button>
  };

  

  return (
    <div className="container mx-auto mt-5">
      <h2 className="text-2xl font-bold mb-5">구장 리스트(DB 연동)</h2>

      {/* 필터 버튼 */}
      <div className="mb-4">
        <button onClick={() => setFilter('all')} className="mr-2 px-4 py-2 bg-gray-400 text-white rounded">모든 구장</button>
        <button onClick={() => setFilter('1')} className="mr-2 px-4 py-2 bg-red-400 text-white rounded">미승인 구장</button>
        <button onClick={() => setFilter('2')} className="px-4 py-2 bg-green-400 text-white rounded">승인 구장</button>
      </div>

      {/* 테이블 */}
      <table className="table-auto w-full">
        <thead className="bg-gray-200">
          <tr>
            {["구장이름", "구장주소", "실내외", "구장크기", "잔디정보", "추천인원", "기본이용시간", "오픈시간", "마감시간", "요금", "이용안내", "이용규칙", "환불규정", "팀조끼대여여부", "풋살화대여여부", "샤워실여부", "공대여여부", "지붕여부", "냉난방시설여부", "주차장여부", "구장상태"].map((header, index) => (
              <th key={index} className="px-4 py-2">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody className="text-sm">
          {filteredGrounds.map((ground, index) => (
            
            <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
              {/* 구장 이름에 onClick 이벤트 추가 */}
              <td className="border px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={() => handleSelectGround(ground)}>
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
              <td className="border px-4 py-2">{ground.vestIsYn ? '예' : '아니오'}</td>
              <td className="border px-4 py-2">{ground.footwearIsYn ? '예' : '아니오'}</td>
              <td className="border px-4 py-2">{ground.showerIsYn ? '예' : '아니오'}</td>
              <td className="border px-4 py-2">{ground.ballIsYn ? '예' : '아니오'}</td>
              <td className="border px-4 py-2">{ground.airconIsYn ? '예' : '아니오'}</td>
              <td className="border px-4 py-2">{ground.parkareaIsYn ? '예' : '아니오'}</td>
              <td className="border px-4 py-2">{ground.roopIsYn ? '예' : '아니오'}</td>
              {/* 구장 상태(state) */}
              <td className="border px-4 py-2">
                {}
                <button
                  onMouseEnter={() => handleMouseEnter(ground.gno)}
                  onMouseLeave={() => handleMouseLeave(ground.gno)}
                  onClick={() =>  { console.log(ground.gno); handleUpdateGroundState(ground.gno, ground.state)}} // 버튼 클릭 시 상태 변경 함수 호출
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

{/* 모달 창 로직 */}
{showModal && selectedGround && (
  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" onClick={closeModal}>
    <div className="relative top-20 mx-auto p-5 border w-3/4 shadow-lg rounded-md bg-white" onClick={e => e.stopPropagation()}>
      <div className="mt-3 text-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900">{selectedGround.name} - 상세 정보</h3>
        <div className="mt-2">
          {/* 구장 사진 표시 */}
          <Slider {...sliderSettings}>
          {selectedGround.uploadFileNames && selectedGround.uploadFileNames.map((fileName, index) => (
            <img key={index} src={`http://localhost:8080/goalracha/ground/view/${fileName}`} alt={`Ground Image ${index}`} className="max-w-full h-auto mx-auto"/>
          ))}
          </Slider>
        </div>
        <div className="mt-4">
          <button onClick={closeModal} className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500">
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