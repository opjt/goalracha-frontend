// 상세페이지(임의 클릭시 나오는 페이지)

import BasicLayout from "../layouts/BasicLayout";
import { useEffect, useRef, useState } from "react";
import { loadPaymentWidget } from "@tosspayments/payment-widget-sdk";
import { nanoid } from "nanoid";

const { kakao } = window;

const Test = () => {
  	const [map, setMap] = useState(null);

  	var mapOption = {
    	center: new kakao.maps.LatLng(0, 0), // 지도의 중심좌표
    	level: 3, // 지도의 확대 레벨
  	};
	useEffect(() => {
		const container = document.getElementById("map");
    	var map = new kakao.maps.Map(container, mapOption);
    	const geocoder = new kakao.maps.services.Geocoder();
		geocoder.addressSearch( "대전광역시 서구 관저로 7-6",function (result, status) {
			if (status === kakao.maps.services.Status.OK) {
				var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
				var marker = new kakao.maps.Marker({
					map: map,
					position: coords,
				});
				map.setCenter(coords);
			}
		}
		);
  }, []);
  const handleClick = () => {
	
  };

  return (
    <BasicLayout>
      <div
        id="map"
        style={{ width: "99%", height: "200px" }}
        onClick={handleClick}
      ></div>

      {/* <div className="bg-white p-6  md:mx-auto">
        <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
          <path
            fill="currentColor"
            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
          ></path>
        </svg>
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            결제 완료!
          </h3>
          <p className="text-gray-600 my-2">
            안필드
          </p>
          <table className="table max-w-80 mx-auto">
            <thead>
              <tr className="bg-slate-50">
                <th>예약일</th>
                <th>시간</th>
                <th>예약자</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white">
                <td>2024-12-12</td>
                <td>12:00 ~ 14:00</td>
                <td>박정태</td>
              </tr>
            </tbody>
          </table>
          <div className="py-10 text-center">
            <a
              href="#"
              className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white py-3"
            >
              예약내역 확인
            </a>
          </div>
        </div>
      </div> */}
    </BasicLayout>
  );
};

export default Test;
