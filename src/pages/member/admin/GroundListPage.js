import React, { useState, useEffect } from 'react';
import { fetchGrounds, changeGroundState, fetchImagesByGno } from '../../../api/adminAPI';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const GroundListPage = () => {
  const [grounds, setGrounds] = useState([]); // 구장 리스트를 저장할 상태
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', '1' (미승인), '2' (승인)
  const [selectedGround, setSelectedGround] = useState(null); // 모달에 표시될 구장의 상세 정보
  const [showModal, setShowModal] = useState(false); // 모달 표시 여부
  // 여기에서 searchTerm 상태를 선언하고 초기화합니다.
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태를 위한 코드 추가

  useEffect(() => {
    fetchGroundsData();
  }, []);

  useEffect(() => {
    console.log('선택된 구장:', selectedGround);
  }, [selectedGround]);

  // const handleUpdateGroundState = async (gno, currentState) => {
  //   const newState = currentState === 1 ? 2 : 1;
  //   try {
  //     await changeGroundState(gno, newState);
  //     await fetchGroundsData(); // 상태 변경 후 목록 새로고침을 확실하게 수행
  //   } catch (error) {
  //     console.error('Error updating ground state:', error);
  //   }
  // };

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

  const handleUpdateGroundState = async (gno, newState) => {
    try {
      await changeGroundState(gno, newState);
      await fetchGroundsData(); // 상태 변경 후 데이터 새로고침
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

  // 검색어에 따른 필터링 추가
  const filteredGrounds = grounds.filter(ground => {
    if (filter === 'all' && searchTerm === '') return true;
    if (filter !== 'all' && !ground.state.toString().includes(filter)) return false;
    return ground.name.toLowerCase().includes(searchTerm.toLowerCase());
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
    <div className="container mx-auto mt-5" >
      <h2 className="text-2xl font-bold mb-5">구장 리스트(DB 연동)</h2>

      {/* 필터 버튼과 검색 입력 필드를 포함하는 div */}
      <div className="flex justify-between items-center mb-4" >
        {/* 필터 버튼 그룹 */}
        < div >
          <button onClick={() => setFilter('all')} className="mr-2 px-4 py-2 bg-gray-400 text-white rounded">모든 구장</button>
          <button onClick={() => setFilter('1')} className="mr-2 px-4 py-2 bg-red-500 text-white rounded">등록신청 구장</button>
          <button onClick={() => setFilter('2')} className="mr-2 px-4 py-2 bg-green-500 text-white rounded">오픈 구장</button>
          <button onClick={() => setFilter('4')} className="mr-2 px-4 py-2 bg-gray-500 text-white rounded">폐업신청 구장</button>
          <button onClick={() => setFilter('0')} className="mr-2 px-4 py-2 bg-gray-700 text-white rounded">폐업 구장</button>
        </div >

        {/* 검색 입력 필드 */}
        < div >
          <input
            type="text"
            placeholder="구장 검색..."
            className="input border p-2" // 스타일을 조정해 입력 필드를 눈에 띄게 만듭니다.
            style={{
              padding: '10px',
              fontSize: '1rem',
              border: '2px solid #4A90E2', // 테두리 색상 변경
              boxShadow: '0 4px 6px rgba(32, 33, 36, 0.28)', // 그림자 효과 추가
              borderRadius: '5px', // 테두리 둥글게
              width: '300px', // 입력 필드 너비
              transition: 'all 0.3s', // 부드러운 전환 효과
            }}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div >
      </div >

      {/* 테이블 */}
      < table className="table-auto w-full" >
        <thead className="bg-gray-200 w-full">
          <tr>
            {["구장이름", "구장주소", "실내외", "구장크기", "잔디정보", "추천인원", "기본이용시간", "오픈시간", "마감시간", "요금", "구장상태"].map((header, index) => (
              <th key={index} className="px-4 py-2">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody className="w-full text-sm">
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
              {/* 구장 상태(state) */}
              <td className="border px-4 py-2">
                <select
                  value={ground.state}
                  onChange={(e) => handleUpdateGroundState(ground.gno, parseInt(e.target.value))}
                  className="px-4 py-2 text-gary rounded" // 스타일링 조정 필요
                >
                  <option value="0">폐업</option>
                  <option value="1">등록신청</option>
                  <option value="2">오픈</option>
                  <option value="4">폐업신청</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table >

      {/* 모달 창 로직 */}
      {
        showModal && selectedGround && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" onClick={closeModal}>
            <div className="relative top-20 mx-auto p-5 border w-3/4 shadow-lg rounded-md bg-white"
              style={{ width: '800px', maxHeight: '800px', overflowY: 'scroll' }} onClick={e => e.stopPropagation()}>
              <div className="mt-3 text-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900">{selectedGround.name} - 구장상세 정보</h3>
                <div className="mt-2">
                  {/* 구장 사진 표시 */}
                  <Slider {...sliderSettings}>
                    {selectedGround.uploadFileNames && selectedGround.uploadFileNames.map((fileName, index) => (
                      <div className="mx-auto" style={{ width: '100%', maxHeight: '300px', overflow: 'hidden' }}> {/* 이미지 컨테이너 크기 조정 */}
                        <img key={index} src={`${process.env.REACT_APP_SERVER}/api/ground/g/view/${fileName}`} alt={`Ground Image ${index}`} className="max-w-full h-auto mx-auto" />
                      </div>
                    ))}
                  </Slider>
                </div >

                <div className='whitespace-pre-wrap'>
                  <div className='text-left '>
                    이용안내
                    <div className="border rounded-2xl px-4 py-2 text-left">{selectedGround.userGuide}</div>
                  </div>
                  <div className='text-left'>
                    이용규칙
                    <div className="border rounded-2xl px-4 py-2 text-left">{selectedGround.userRules}</div>
                  </div>
                  <div className='text-left'>
                    환불규정
                    <div className="border rounded-2xl px-4 py-2 text-left">{selectedGround.refundRules}</div>
                  </div>
                </div>
                <div className="flex-wrap pt-8 w-full ">
                  <h3 className="flex-auto text-2xl text-lefts mb-4 text-gray-800">
                    부대시설
                  </h3>
                  <div className="mb-4 ">
                    <div className="grid grid-cols-2 gap-x-4">
                      <label className="m-2 label flex items-center border border-gray-300 rounded-2xl px-5 ">
                        <span className="mr-2 ">조끼</span>
                        {selectedGround.vestIsYn ? "대여가능" : "대여불가능"}
                      </label>
                      <label className="m-2 label flex items-center border border-gray-300 rounded-2xl px-5 ">
                        <span className="mr-2">풋살화</span>
                        {selectedGround.footwearIsYn ? "대여가능" : "대여불가능"}
                      </label>
                      <label className="m-2 label flex items-center border border-gray-300 rounded-2xl px-5 ">
                        <span className="mr-2">샤워실</span>
                        {selectedGround.showerIsYn ? "보유" : "미보유"}
                      </label>
                      <label className="m-2 label flex items-center border border-gray-300 rounded-2xl px-5 ">
                        <span className="mr-2">지붕</span>
                        {selectedGround.roofIsYn ? "보유" : "미보유"}
                      </label>
                      <label className="m-2 label flex items-center border border-gray-300 rounded-2xl px-5 ">
                        <span className="mr-2">공대여</span>
                        {selectedGround.ballIsYn ? "대여가능" : "대여불가능"}
                      </label>
                      <label className="m-2 label flex items-center border border-gray-300 rounded-2xl px-5 ">
                        <span className="mr-2">에어컨</span>
                        {selectedGround.airconIsYn ? "보유" : "미보유"}
                      </label>
                      <label className="m-2 label flex items-center border border-gray-300 rounded-2xl px-5 ">
                        <span className="mr-2">주차장</span>
                        {selectedGround.parkareaIsYn ? "보유" : "미보유"}
                      </label>
                    </div>
                  </div>
                </div>


                <div className="mt-4">
                  <button onClick={closeModal} className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500">
                    닫기
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </div >
  );
};

export default GroundListPage;