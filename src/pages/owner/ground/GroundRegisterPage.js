import { useState, useRef } from "react";
import { postGroundRegister } from "../../../api/groundApi";
import ResultModal from "components/common/ResultModal";
import useCustomMove from "../../../hooks/groundCustomMove";
import Select from "react-select";
import useCustomLogin from "hooks/useCustomLogin";
import Slider from "react-slick";

const initState = {
  name: "",
  addr: "",
  inAndOut: "",
  width: "",
  grassInfo: "",
  recommdMan: "",
  usageTime: "",
  openTime: "",
  closeTime: "",
  fare: "",
  userGuide: "[ 주차 상세 ]\n- 사업자회원 작성 \n[ 구장 출입문 안내 ]\n-사업자회원 작성 \n[ 구장이용 안내 ]\n -사업자회원 작성) \n[ 대여 상세 ]\n -사업자회원 작성 \n[ 물, 음료 ]\n -사업자회원 작성",
  userRules: "- 풋살장 예약시간 준수\n- 풋살장 내 취사, 흡연 및 음주행위, 지나친 소음행위 금지(적발 시 이용불가)\n- 시설 사용 후 정리정돈 ( 쓰레기 반드시 처리 )\n- 고의 및 과실로 인한 시설물 훼손 및 파손시 사용자가 배상하며 경기중 부상은 본인이 책임집니다.\n- 잔디보호와 부상방지를 위하여 스터드가 있는 축구화(SG, FG, HG, AG)는 착용이 금지되며 풋살화(TF)만 착용 가능 합니다.\n- 위 내용이 지켜지지 않을 경우 무환불 퇴장조치 될 수 있으니 예약시 꼭 참고부탁드립니다.\n- 위 내용을 지키지 않아 발생하는 문제는 예약자 본인에게 있습니다. ",
  refundRules: "- 이용3일 전까지 : 100% 환불\n- 2일 전 ~ 대관 당일 : 환불 불가\n- 다음과 같은 경우에는 상단 규정대로 처리\n- 고객의 사정으로 예약된 날짜에 구장 이용을 못하는 경우\n- 구장, 날짜, 시간 등을 실수로 잘못 선택했을 경우\n- 단순 변심으로 인해 환불이나 변경을 요청하는 경우",
  vestIsYn: false,
  footwearIsYn: false,
  showerIsYn: false,
  ballIsYn: false,
  airconIsYn: false,
  parkareaIsYn: false,
  roopIsYn: false,
  state: 1,
  uNo: "",
  postcode: "",
  files: [],
};

const GroundRegisterPage = () => {
  const [imgFile, setImgFile] = useState([]);

  const [ground, setGround] = useState({ ...initState });
  const uploadRef = useRef();
  const [fetching, setFetching] = useState(false);
  const [result, setResult] = useState(null);
  const { isLogin, loginState } = useCustomLogin();

  const { moveToGroundList } = useCustomMove();

  const uNo = loginState.uNo;
  console.log(uNo)

  // ground 속성의 값을 등록받은 값으로 변경
  const handleChange = (e) => {
    ground[e.target.name] = e.target.value;

    // checkbox타입이 checkbox일 경우 checked속성을 값으로 입력받음
    if (e.target.type == "checkbox") {
      ground[e.target.name] = e.target.checked;
    }
    setGround({ ...ground });
  };

  // 등록 버튼 함수
  const handleClickAdd = (e) => {
    const files = uploadRef.current.files;

    const formData = new FormData();
    
    // 입력된 이미지를 폼데이터로 변경
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    // 입력된 구장정보를 폼데이터로 변경
    formData.append("name", ground.name);
    formData.append("addr", ground.addr);
    formData.append("inAndOut", ground.inAndOut);
    formData.append("width", ground.width);
    formData.append("grassInfo", ground.grassInfo);
    formData.append("recommdMan", ground.recommdMan);
    formData.append("usageTime", ground.usageTime);
    formData.append("openTime", ground.openTime);
    formData.append("closeTime", ground.closeTime);
    formData.append("fare", ground.fare);
    formData.append("userGuide", ground.userGuide);
    formData.append("userRules", ground.userRules);
    formData.append("refundRules", ground.refundRules);
    formData.append("vestIsYn", ground.vestIsYn);
    formData.append("footwearIsYn", ground.footwearIsYn);
    formData.append("showerIsYn", ground.showerIsYn);
    formData.append("ballIsYn", ground.ballIsYn);
    formData.append("airconIsYn", ground.airconIsYn);
    formData.append("parkareaIsYn", ground.parkareaIsYn);
    formData.append("roopIsYn", ground.roopIsYn);
    formData.append("state", ground.state);
    formData.append("uNo", uNo);

    // 값이 없거나 0일경우 경고창
    if (!uNo) {
      alert("사업자회원으로 로그인하셔야 등록가능합니다.")
    }
    if (!ground.name) {
      alert("구장이름을 입력해주세요.");
      return;
    }
    if (!ground.addr) {
      alert("구장주소를 입력해주세요.");
      return;
    }
    if (!ground.inAndOut) {
      alert("실내/실외를 선택해주세요.");
      return;
    }
    if (!ground.width) {
      alert("구장크기를 입력해주세요.");
      return;
    }
    if (!ground.recommdMan) {
      alert("추천인원을 입력해주세요.");
      return;
    }
    if (!ground.usageTime || ground.usageTime==0) {
      alert("기본이용시간을 입력해주세요.");
      return;
    }
    if (!ground.openTime) {
      alert("오픈 시간을 선택해주세요.");
      return;
    }
    if (!ground.closeTime) {
      alert("마감 시간을 선택해주세요.");
      return;
    }
    if (!ground.fare || ground.fare==0) { 
      alert("요금을 입력해주세요.");
      return;
    }
    if (files.length == 0) {
      alert("구장사진을 등록해주세요.");
      return;
    }
    if (!ground.userGuide) {
      alert("이용안내를 입력해주세요.");
      return;
    }
    if (!ground.userRules) {
      alert("이용규칙을 입력해주세요.");
      return;
    }
    if (!ground.refundRules) {
      alert("환불규정을 입력해주세요.");
      return;
    }

    setFetching(true);

    // 구장 등록 api호출, 폼데이터로 전송
    postGroundRegister(formData)
      .then((data) => {
        setFetching(false);
        setResult(data.result);
      })
      .catch((error) => console.error(error));
  };

  // 모달 닫은 후 리스트로 이동
  const closeModal = () => {
    setResult(null);
    moveToGroundList({ page: 1 });
  };

  // 이미지 업로드 input의 onChange 함수
  const saveImgFile = () => {
    const files = uploadRef.current.files;
    const fileArray = [];

    // 선택된 파일들을 fileArray에 추가
    for (let i = 0; i < files.length; i++) {
      fileArray.push(URL.createObjectURL(files[i]));
    }

    // 이미지 파일 상태를 업데이트
    setImgFile(fileArray);
  };

  // 다음 주소 api
  function DaumPostcode() {
    new window.daum.Postcode({
      oncomplete: function (data) {
        console.log(data);

        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
        // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
        // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
        var roadAddr = data.roadAddress; // 도로명 주소 변수
        var jibunAddr = data.jibunAddress; // 지번 주소 변수
        // 우편번호와 주소 정보를 해당 필드에 넣는다.
        if (roadAddr !== "") {
          ground.addr = roadAddr;
        } else if (jibunAddr !== "") {
          ground.addr = jibunAddr;
        }
        setGround({ ...ground });
      },
    }).open();
  }

  // 셀렉트 라이브러리를 사용한 ground 속성의 값 변경
  const handleSelectChange = (result, name) => {
    if (name == "inAndOut") {
      ground.inAndOut = result.value;
    } else if (name == "openTime") {
      ground.openTime = result.value;
    } else if (name == "closeTime") {
      ground.closeTime = result.value;
    }
    
    // ground 상태 업데이트
    setGround({ ...ground });
  };

  // 실내외 셀렉트 매핑
  const inAndOutSelect = [
    { value: "실내", label: "실내" },
    { value: "실외", label: "실외" },
  ];

  // 오픈시간, 마감시간 셀렉트 매핑
  const timeSelect = [
    { value: "1", label: "01시" },
    { value: "2", label: "02시" },
    { value: "3", label: "03시" },
    { value: "4", label: "04시" },
    { value: "5", label: "05시" },
    { value: "6", label: "06시" },
    { value: "7", label: "07시" },
    { value: "8", label: "08시" },
    { value: "9", label: "09시" },
    { value: "10", label: "10시" },
    { value: "11", label: "11시" },
    { value: "12", label: "12시" },
    { value: "13", label: "13시" },
    { value: "14", label: "14시" },
    { value: "15", label: "15시" },
    { value: "16", label: "16시" },
    { value: "17", label: "17시" },
    { value: "18", label: "18시" },
    { value: "19", label: "19시" },
    { value: "20", label: "20시" },
    { value: "21", label: "21시" },
    { value: "22", label: "22시" },
    { value: "23", label: "23시" },
    { value: "24", label: "24시" },
  ];

  // 슬라이더 세팅
  const sliderSettings = {
    dots: true,
    infinite: imgFile && imgFile.length  > 1 ? true : false, // 마지막 이미지 이후 첫 이미지로 자동 루프 여부
    slidesToShow: 1, // 한번에 보여지는 슬라이드 수
    slidesToScroll: 1, // 한번에 넘어가는 슬라이드 수
    autoplay: true, // 자동 슬라이드 여부
    autoplaySpeed: 3000, // 자동으로 넘어가는 시간 간격
    arrows: false, // 좌,우 버튼
    pauseOnHover: true, // hover시 정지
    appendDots: (dots) => (
      <div
        style={{
          padding: "50px",
        }}
      >
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
  };

    const formatRevenue = (value) => {
    return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(value);
};

  return (
    <div className=" flex-wrap flex-direction justify-center">
      <div className="flex mb-4 w-full">
        {result ? (
          <ResultModal
            title={"구장등록 결과"}
            content={`${ground.name} 등록 신청`}
            callbackFn={closeModal}
            close={"닫기"}
          />
        ) : (
          <></>
        )}
        <div className="bg-white mb-4 w-3/6 p-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">구장 등록</h2>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-800"
            >
              구장 이름:
            </label>
            <input
              required
              type={"text"}
              name="name"
              placeholder="골라차풋살클럽"
              value={ground.name}
              onChange={handleChange}
              className="input input-bordered w-full max-w-xs"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="addr"
              className="block text-sm font-medium text-gray-800"
            >
              구장 주소:
            </label>
            <button
              className="flex float-end mb-2 btn btn-xs"
              onClick={DaumPostcode}
            >
              주소 찾기
            </button>
            <input
              required
              id="addr"
              type={"text"}
              name="addr"
              placeholder="대한시 민국구 1945번길 815"
              value={ground.addr}
              onChange={handleChange}
              className="input input-bordered w-full max-w-xs"
              disabled
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="inAndOut"
              className="block text-sm font-medium text-gray-800"
            >
              실내외:
            </label>
            <Select
              required
              className=" w-full max-w-xs"
              type={"select"}
              name="InAndOut"
              onChange={(option) => handleSelectChange(option, "inAndOut")}
              options={inAndOutSelect}
              placeholder="유형 선택"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="width"
              className="block text-sm font-medium text-gray-800"
            >
              구장 크기:
            </label>
            <input
              required
              type={"text"}
              name="width"
              placeholder="40*40"
              value={ground.width}
              onChange={handleChange}
              className="input input-bordered w-full max-w-xs"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="grassInfo"
              className="block text-sm font-medium text-gray-800"
            >
              잔디 정보:
            </label>
            <input
              required
              type={"text"}
              name="grassInfo"
              placeholder="인조잔디"
              value={ground.grassInfo}
              onChange={handleChange}
              className="input input-bordered w-full max-w-xs"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="recommdMan"
              className="block text-sm font-medium text-gray-800"
            >
              추천 인원:
            </label>
            <input
              required
              type={"text"}
              name="recommdMan"
              placeholder="5:5"
              value={ground.recommdMan}
              onChange={handleChange}
              className="input input-bordered w-full max-w-xs"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="usageTime"
              className="block text-sm font-medium text-gray-800"
            >
              기본 이용 시간:
            </label>
            <input
              required
              type={"number"}
              name="usageTime"
              placeholder="1 (시간단위로 숫자만 입력)"
              value={ground.usageTime}
              onChange={handleChange}
              className="input input-bordered w-full max-w-xs"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="openTime"
              className="block text-sm font-medium text-gray-800"
            >
              오픈 시간:
            </label>
            <Select
              required
              className=" w-full max-w-xs"
              type={"select"}
              onChange={(option) => handleSelectChange(option, "openTime")}
              options={timeSelect}
              placeholder="오픈시간 선택"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="closeTime"
              className="block text-sm font-medium text-gray-800"
            >
              마감 시간:
            </label>
            <Select
              required
              className=" w-full max-w-xs"
              type={"select"}
              onChange={(option) => handleSelectChange(option, "closeTime")}
              options={timeSelect}
              placeholder="마감시간 선택"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="fare"
              className="block text-sm font-medium text-gray-800"
            >
              요금:
            </label>
            <input
              required
              type={"number"}
              step={"5000"}
              name="fare"
              placeholder="35000 (원단위로 숫자만 입력)"
              value={ground.fare}
              onChange={handleChange}
              className="input input-bordered w-full max-w-xs"
            />
          </div>
        </div>

        <div className="w-6/12 mb-4 bg-white p-8 ">
          <div className="text-2xl font-bold mb-4 text-gray-800">사진 등록</div>
              <Slider {...sliderSettings}>
                {imgFile.map((imgFile, i) => (
                  <div key={i}>
                    <img
                      src={imgFile}
                      alt={imgFile}
                    />
                  </div>
                ))}
              </Slider>
          <input
            required
            ref={uploadRef}
            type={"File"}
            onChange={saveImgFile}
            multiple={true}
            className="file-input file-input-bordered w-full max-w-xs"
          ></input>

          <div className="flex-wrap bg-white pt-8 w-full ">
            <h2 className="flex-auto text-2xl font-bold mb-4 text-gray-800">
              부대시설
            </h2>
            <div className="mb-4 form-control">
              <label htmlFor="vestIsYn" className="label cursor-pointer">
                <span>조끼</span>
                <input
                  type={"checkbox"}
                  name="vestIsYn"
                  className="checkbox"
                  checked={ground.vestIsYn}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="mb-4 form-control">
              <label htmlFor="footwearIsYn" className="label cursor-pointer">
                <span>풋살화</span>
                <input
                  type={"checkbox"}
                  name="footwearIsYn"
                  className="checkbox"
                  checked={ground.footwearIsYn}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="mb-4 form-control">
              <label htmlFor="showerIsYn" className="label cursor-pointer">
                <span>샤워실</span>
                <input
                  type={"checkbox"}
                  name="showerIsYn"
                  className="checkbox"
                  checked={ground.showerIsYn}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="mb-4 form-control">
              <label htmlFor="roopIsYn" className="label cursor-pointer">
                <span>지붕</span>
                <input
                  type={"checkbox"}
                  name="roopIsYn"
                  className="checkbox"
                  checked={ground.roopIsYn}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="mb-4 form-control">
              <label htmlFor="ballIsYn" className="label cursor-pointer">
                <span>공대여</span>
                <input
                  type={"checkbox"}
                  name="ballIsYn"
                  className="checkbox"
                  checked={ground.ballIsYn}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="mb-4 form-control">
              <label htmlFor="airconIsYn" className="label cursor-pointer">
                <span>에어컨</span>
                <input
                  type={"checkbox"}
                  name="airconIsYn"
                  className="checkbox"
                  checked={ground.airconIsYn}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="mb-4 form-control">
              <label htmlFor="parkareaIsYn" className="label cursor-pointer">
                <span>주차장</span>
                <input
                  type={"checkbox"}
                  name="parkareaIsYn"
                  className="checkbox"
                  checked={ground.parkareaIsYn}
                  onChange={handleChange}
                />
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
            required
            type={"text"}
            name="userGuide"
            value={ground.userGuide}
            onChange={handleChange}
            className="textarea textarea-bordered w-full h-40"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="userRules"
            className="block text-sm font-medium text-gray-800"
          >
            이용 규칙:
          </label>
          <textarea
            required
            type={"text"}
            name="userRules"
            value={ground.userRules}
            onChange={handleChange}
            className="textarea textarea-bordered w-full h-40"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="refundRules"
            className="block text-sm font-medium text-gray-800"
          >
            환불 규정:
          </label>
          <textarea
            required
            type={"text"}
            name="refundRules"
            value={ground.refundRules}
            onChange={handleChange}
            className="textarea textarea-bordered w-full h-40"
          />
        </div>

        <div className="mt-8">
          <button
            type="button"
            className="w-full btn btn-neutral text-xl"
            onClick={handleClickAdd}
          >
            등록
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroundRegisterPage;
