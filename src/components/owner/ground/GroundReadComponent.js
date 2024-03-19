import { useEffect, useState } from "react";
import { API_SERVER_HOST, getGround } from "../../../api/groundApi";
import useCustomMove from "hooks/groundCustomMove";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const initState = {
  uploadFileNames: [],
  gno: 0,
  name: "",
  addr: "",
  inAndOut: "",
  width: "",
  grassInfo: "",
  recommdMan: "",
  usageTime: "",
  openTime: "",
  closeTime: "",
  fare: 0,
  userGuide: "",
  userRules: "",
  refundRules: "",
  changeRules: "",
  vestIsYn: false,
  footwearIsYn: false,
  showerIsYn: false,
  ballIsYn: false,
  airconIsYn: false,
  parkareaIsYn: false,
  roopIsYn: false,
  state: 0,
  uno: 0,
  uploadFileNames: [],
};

const GroundReadComponent = ({ gno }) => {
  const [ground, setGround] = useState(initState);

  const host = API_SERVER_HOST;

  const { moveToList, moveToModify, moveToDelete } = useCustomMove();

  useEffect(() => {
    getGround(gno).then((data) => {
      console.log(data);
      setGround(data);
    });
  }, [gno]);

  const stateMapping = {
    0: "삭제된 구장입니다",
    1: "등록신청",
    2: "오픈",
    3: "준비중",
    4: "폐업",
  };

  const sliderSettings = {
    dots: true, // 아래 점 (dots) 표시 여부
    infinite: true, // 마지막 이미지 이후 첫 이미지로 자동 루프 여부
    slidesToShow: 1, // 한번에 보여지는 슬라이드 수
    slidesToScroll: 1, // 한번에 넘어가는 슬라이드 수
    autoplay: true, // 자동 슬라이드 여부
    autoplaySpeed: 3000, // 자동으로 넘어가는 시간 간격
    arrows: true, // 좌,우 버튼
    pauseOnFocus: true, // focus시 정지
    pauseOnHover: true, // hover시 정지
  };

  return (
    <div className=" flex-wrap flex-direction justify-center max-w-screen-lg h-100% bg-gray-100">
      <div className="max-w-screen-lg flex mb-4">
        <div className="bg-white mb-4 w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">구장 상세</h2>

          <div className="mb-4 " tabIndex={0}>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-800"
            >
              구장 이름:
            </label>
            <div className="collapse bg-base-200 collapse-title text-xl font-medium w-full max-w-1/2">
              {ground.name}
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="addr"
              className="block text-sm font-medium text-gray-800"
            >
              구장 주소:
            </label>
            <div className="collapse bg-base-200 collapse-title text-xl font-medium w-full max-w-1/2">
              {ground.addr}
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="inAndOut"
              className="block text-sm font-medium text-gray-800"
            >
              실내외:
            </label>
            <div className="collapse bg-base-200 collapse-title text-xl font-medium w-full max-w-1/2">
              {ground.inAndOut}
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="width"
              className="block text-sm font-medium text-gray-800"
            >
              구장 크기:
            </label>
            <div className="collapse bg-base-200 collapse-title text-xl font-medium w-full max-w-1/2">
              {ground.width}
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="grassInfo"
              className="block text-sm font-medium text-gray-800"
            >
              잔디 정보:
            </label>
            <div className="collapse bg-base-200 collapse-title text-xl font-medium w-full max-w-1/2">
              {ground.grassInfo}
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="recommdMan"
              className="block text-sm font-medium text-gray-800"
            >
              추천 인원:
            </label>
            <div className="collapse bg-base-200 collapse-title text-xl font-medium w-full max-w-1/2">
              {ground.recommdMan}
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="usageTime"
              className="block text-sm font-medium text-gray-800"
            >
              기본 이용 시간:
            </label>
            <div className="collapse bg-base-200 collapse-title text-xl font-medium w-full max-w-1/2">
              {ground.usageTime}
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="openTime"
              className="block text-sm font-medium text-gray-800"
            >
              오픈 시간:
            </label>
            <div className="collapse bg-base-200 collapse-title text-xl font-medium w-full max-w-1/2">
              {ground.openTime}
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="closeTime"
              className="block text-sm font-medium text-gray-800"
            >
              마감 시간:
            </label>
            <div className="collapse bg-base-200 collapse-title text-xl font-medium w-full max-w-1/2">
              {ground.closeTime}
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="fare"
              className="block text-sm font-medium text-gray-800"
            >
              요금:
            </label>
            <div className="collapse bg-base-200 collapse-title text-xl font-medium w-full max-w-1/2">
              {ground.fare}
            </div>
          </div>
        </div>
        <div className="w-6/12 mb-4 bg-white p-8 ">
          <div className="text-2xl font-bold mb-4 text-gray-800">구장 사진</div>
          <div>
            <Slider {...sliderSettings}>
              {ground.uploadFileNames.map((imgFile, i) => (
                <div key={i} className="carousel-item relative w-full align-middle">
                  <img
                    key={i} // carousel 내부의 각 <img>에 대해  고유한 key 필요
                    src={`${host}/goalracha/ground/view/${imgFile}`}
                    className="w-full h-full object-cover"
                    alt={imgFile} // 파일명을 alt 속성으로 사용
                  />
                  <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2"></div>
                </div>
              ))}
            </Slider>
          </div>

          <div className="flex-wrap bg-white pt-8 w-full ">
            <h2 className="flex-auto text-2xl font-bold mb-4 text-gray-800">
              부대시설
            </h2>
            <div className="mb-4">
              <label className="label">
                <span>조끼</span>
                {ground.vestIsYn ? "대여가능" : "대여불가능"}
              </label>
              <label className="label">
                <span>풋살화</span>
                {ground.footwearIsYn ? "대여가능" : "대여불가능"}
              </label>
              <label className="label">
                <span>샤워실</span>
                {ground.showerIsYn ? "보유" : "미보유"}
              </label>
              <label className="label">
                <span>지붕</span>
                {ground.roopIsYn ? "보유" : "미보유"}
              </label>
              <label className="label">
                <span>공대여</span>
                {ground.ballIsYn ? "대여가능" : "대여불가능"}
              </label>
              <label className="label">
                <span>에어컨</span>
                {ground.airconIsYn ? "보유" : "미보유"}
              </label>
              <label className="label">
                <span>주차장</span>
                {ground.parkareaIsYn ? "보유" : "미보유"}
              </label>
            </div>

            <h2 className="flex-auto text-2xl font-bold mb-4 text-gray-800">
              구장상태
            </h2>
            <div>
              <label className="label">
                {stateMapping[ground.state] || "상태 정보 없음"}
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex- bg-white p-8 w- h-100%">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-800">
            이용 안내:
          </label>
          <textarea
            className="textarea textarea-bordered w-full h-40"
            defaultValue={ground.userGuide}
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-800">
            이용 규칙:
          </label>
          <textarea
            className="textarea textarea-bordered w-full h-40"
            defaultValue={ground.userRules}
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-800">
            환불 규정:
          </label>
          <textarea
            className="textarea textarea-bordered w-full h-40"
            defaultValue={ground.refundRules}
          ></textarea>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            className="m-4 text-xl w-6/12 btn btn-neutral"
            onClick={moveToList}
          >
            목록
          </button>
          <button
            type="button"
            className="m-4 text-xl w-6/12 btn btn-neutral"
            onClick={() => moveToModify(gno)}
          >
            수정
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroundReadComponent;