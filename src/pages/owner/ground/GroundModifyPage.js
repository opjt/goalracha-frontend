import { useState, useRef, useEffect } from "react";
import { API_SERVER_HOST, getGround, putGround } from "../../../api/groundApi";
import ResultModal from "components/common/ResultModal";
import useCustomMove from "../../../hooks/groundCustomMove";
import Slider from "react-slick";
import Select from "react-select";
import { useParams,useNavigate } from "react-router-dom";
import useCustomLogin from "hooks/useCustomLogin";

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
  userGuide: "",
  userRules: "",
  refundRules: "",
  vestIsYn: false,
  footwearIsYn: false,
  showerIsYn: false,
  ballIsYn: false,
  airconIsYn: false,
  parkareaIsYn: false,
  roopIsYn: false,
  postcode: "",
  uploadFileNames: [],
};

const GroundModifyComponent = () => {

  const [ground, setGround] = useState(initState);
  const [imgFile, setImgFile] = useState([]);
  const uploadRef = useRef();
  const [fetching, setFetching] = useState(false);
  const [result, setResult] = useState(null);
  const { gno } = useParams();
  const navigate = useNavigate();
  const { loginState } = useCustomLogin();

  const { moveToGroundList, moveToModifyRead } = useCustomMove();

  const host = API_SERVER_HOST;

  // 구장 정보에 기존구장정보 값 설정
  useEffect(() => {
    console.log(loginState)
    setFetching(true);
    
    getGround(gno).then((data) => {
      if (loginState.uNo !== parseInt(data.uno)) { // 유저값이 다를경우 뒤로가기
        alert("잘못된 접근입니다.");
        navigate(-1);
      }
      var oldImages = data.uploadFileNames.map(
        (fileName) => `${fileName}`
      );
      setGround(data);
      console.log(data.uploadFileNames);
      setImgFile(oldImages);
      setFetching(false);
    });
  }, [gno]);

  // 정보입력
  const handleChangeModify = (e) => {
    ground[e.target.name] = e.target.value;

    if (e.target.type == "checkbox") {
      ground[e.target.name] = e.target.checked;
    }
    setGround({ ...ground });
  };

  // 업로드된 이미지 imgFile에 업데이트
  const saveImgFile = () => {
    const files = uploadRef.current.files;
    const fileArray = [...imgFile];

    // 선택된 파일들을 fileArray에 추가
    for (let i = 0; i < files.length; i++) {
      fileArray.push(URL.createObjectURL(files[i]));
    }

    // 이미지 파일 상태를 업데이트
    setImgFile(fileArray);
  };

  // 전체 이미지 삭제
  const deleteAllImages = () => {
    
    // imgFile 비우기
    setImgFile([]);
    const deletImgFile = { ...ground, uploadFileNames: [] };

    // uploadRef 비우기
    uploadRef.current.value = null;

    setGround(deletImgFile);
  };

// 한개 이미지 삭제
const deleteOldImages = (imageName) => {

  // 삭제 버튼 눌린 이미지 지우기
  const deletImgFile = imgFile.filter((img) => img !== imageName);

  // 삭제 버튼 눌린 이미지 구장 정보에서 지우기
  const deleteOldFileNames = ground.uploadFileNames.filter((img) => img !== imageName);

  // 새로 추가된 이미지 삭제
  //const newFiles = Array.from(uploadRef.current.files).filter(file => URL.createObjectURL(file) !== imageName);

  // imgFile 최신화 및 이미지 삭제에 대한 구장정보 최신화
  setImgFile(deletImgFile);
  //uploadRef.current.files = newFiles.map(file => file);
  setGround({ ...ground, uploadFileNames: deleteOldFileNames });
};


  // 수정 버튼 함수
  const handleClickModify = (e) => {
    const files = uploadRef.current.files;
    const formData = new FormData();

    // 새로운 파일 폼데이터로 변경
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    // 구장정보 폼데이터로 변경
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

    // 기존이미지 폼데이터로 변경
    for (let i = 0; i < ground.uploadFileNames.length; i++) {
      formData.append("uploadFileNames", ground.uploadFileNames[i]);
    }

    // 수정버튼 클릭시 입력되지 않은 값 경고
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
    if (!ground.usageTime) {
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
    if (!ground.fare) {
      alert("요금 입력해주세요.");
      return;
    }
    if (files.length == 0 && ground.uploadFileNames.length == 0) {
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

    // 구장정보 수정
    putGround(gno, formData)
      .then((data) => {
        console.log(data);
        setResult("Modified");
        setFetching(false);
      })
      .catch((error) => console.error(error));
  };

  // 삭제버튼 모든 정보값은 그대로, 구장상태만 폐업신청(state 4, 사장에겐 폐업으로 표출, 관리가자 폐업승인시 삭제된구장(state 0)으로 표출)으로 변경
  const handleClickDelete = (e) => {
    const confirmDelete = window.confirm(
      "정말로 폐업신청하시겠습니까?\n폐업신청 시 구장예약이 불가능하며, 되돌릴 수 없습니다."
    );

    if (confirmDelete) {
      const files = uploadRef.current.files;
      const newState = 4;
      const formData = new FormData();

      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }

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
      formData.append("state", newState);

      for (let i = 0; i < ground.uploadFileNames.length; i++) {
        formData.append("uploadFileNames", ground.uploadFileNames[i]);
      }

      setFetching(true);

      putGround(gno, formData)
        .then((data) => {
          console.log(data);
          setResult("Deleted");
          setFetching(false);
        })
        .catch((error) => console.error(error));
    }
  };

  // 모달 종류
  const closeModal = () => {
    if (result === "Modified") {
      moveToModifyRead(gno);
    } else if (result === "Deleted") {
      moveToGroundList({ page: 1 });
    }
  };

  // 다음 우편주소 api
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

  // 구장 상태 매핑
  const stateMapping = {
    0: "삭제된 구장입니다",
    1: "등록신청",
    2: "오픈",
    3: "준비중",
    4: "폐업",
  };

  // 이미지 슬라이더 값 세팅
  const sliderSettings = {
    dots: true, // 이미지 개수 표출 점
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

  // 셀렉트 라이브러리를 사용한 ground 속성의 값 변경
  const handleSelectChange = (result, name) => {
    if (name == "inAndOut") {
      ground.inAndOut = result.value;
    } else if (name == "openTime") {
      ground.openTime = result.value;
    } else if (name == "closeTime") {
      ground.closeTime = result.value;
    } else if (name == "state") {
      ground.state = result.value;
    }

    setGround({ ...ground });
  };

  // 사장이 변경 가능한 구장 상태값 셀렉트
  const stateSelect = [
    { value: "2", label: "오픈" },
    { value: "3", label: "준비중" },
  ];

  // 실내 실외 셀렉트
  const inAndOutSelect = [
    { value: "실내", label: "실내" },
    { value: "실외", label: "실외" },
  ];

  // 오픈, 마감시간 셀렉트
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

  const formatRevenue = (value) => {
    return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(value);
};

  return (
    <div className="flex-wrap flex-direction justify-center w-full">
      <div className="flex mb-4 justify-center w-full">
        {result ? (
          <ResultModal
            title={"구장수정 결과"}
            content={`${ground.name} 수정완료`}
            callbackFn={closeModal}
            close={"닫기"}
          />
        ) : (
          <></>
        )}
        <div className="mb-4 w-3/6 p-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">구장 수정</h2>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-800"
            >
              구장 이름:
            </label>
            <input
              type={"text"}
              name="name"
              placeholder="골라차풋살클럽"
              value={ground.name}
              onChange={handleChangeModify}
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
              id="addr"
              type={"text"}
              name="addr"
              placeholder="대한시 민국구 1945번길 815"
              value={ground.addr}
              onChange={handleChangeModify}
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
              value={{ value: ground.inAndOut, label: ground.inAndOut }}
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
              type={"text"}
              name="width"
              placeholder="40*40"
              value={ground.width}
              onChange={handleChangeModify}
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
              type={"text"}
              name="grassInfo"
              placeholder="인조잔디"
              value={ground.grassInfo}
              onChange={handleChangeModify}
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
              type={"text"}
              name="recommdMan"
              placeholder="5:5"
              value={ground.recommdMan}
              onChange={handleChangeModify}
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
              type={"number"}
              name="usageTime"
              placeholder="1 (시간단위로 숫자만 입력)"
              value={ground.usageTime}
              onChange={handleChangeModify}
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
              value={{ value: ground.openTime, label: ground.openTime }}
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
              value={{ value: ground.closeTime, label: ground.closeTime }}
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
              type={"number"}
              name="fare"
              placeholder="35,000 (원단위로 숫자만 입력)"
              value={ground.fare}
              onChange={handleChangeModify}
              className="input input-bordered w-full max-w-xs"
            />
          </div>
        </div>

        <div className="w-6/12 mb-4 p-8 ">
          <div className="text-2xl font-bold mb-4 text-gray-800">사진 수정</div>
            <Slider {...sliderSettings}>
              {imgFile.map((imgFile, i) => (
                <div key={i} className="relative">
                  <svg
                    type={"button"}
                    className="cursor-pointer absolute right-4 top-4 rounded-full bg-black bg-opacity-30"
                    onClick={() => (deleteOldImages(imgFile))}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#f0f0f0"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                  
                  <img src={imgFile.includes('blob:http') ? imgFile : `${host}/api/ground/g/view/${imgFile}`} alt={imgFile} />
  
                </div>
              ))}
            </Slider>
          <input
            ref={uploadRef}
            type={"File"}
            multiple={true}
            onChange={saveImgFile}
            className="file-input file-input-bordered w-full max-w-xs"
          ></input>

          <button
            className="btn btn-neutral w-full mt-6"
            onClick={deleteAllImages}
          >
            모든 이미지 삭제
          </button>

          <div className="flex-wrap pt-8 w-full ">
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
                  onChange={handleChangeModify}
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
                  onChange={handleChangeModify}
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
                  onChange={handleChangeModify}
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
                  onChange={handleChangeModify}
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
                  onChange={handleChangeModify}
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
                  onChange={handleChangeModify}
                />
              </label>
            </div>

            <div className="mb-4 form-control">
              <label htmlFor="parkareaIsYn" className="label cursor-pointer">
                <span className="label-text">주차장</span>
                <input
                  type={"checkbox"}
                  name="parkareaIsYn"
                  className="checkbox"
                  checked={ground.parkareaIsYn}
                  onChange={handleChangeModify}
                />
              </label>
            </div>

            <h2 className="flex-auto text-2xl font-bold mb-4 text-gray-800">
              구장상태
            </h2>
            <div>
              <label className="label"></label>
              <Select
                required
                className=" w-full max-w-xs"
                type={"select"}
                onChange={(option) => handleSelectChange(option, "closeTime")}
                options={stateSelect}
                placeholder={stateMapping[ground.state]}
                isDisabled={!(ground.state === 2 || ground.state === 3)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="fle- p-8 w- h-100%">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-800">
            이용 안내:
          </label>
          <textarea
            type={"text"}
            name="userGuide"
            value={ground.userGuide}
            onChange={handleChangeModify}
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
            type={"text"}
            name="userRules"
            value={ground.userRules}
            onChange={handleChangeModify}
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
            type={"text"}
            name="refundRules"
            value={ground.refundRules}
            onChange={handleChangeModify}
            className="textarea textarea-bordered w-full h-40"
          />
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            className="m-2 w-4/12 btn btn-neutral text-xl"
            onClick={moveToGroundList}
          >
            목록
          </button>
          <button
            type="button"
            className="m-2 w-4/12 btn btn-neutral text-xl"
            onClick={handleClickModify}
          >
            수정
          </button>
          <button
            type="button"
            className="m-2 w-4/12 btn btn-error text-xl"
            onClick={handleClickDelete}
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroundModifyComponent;
