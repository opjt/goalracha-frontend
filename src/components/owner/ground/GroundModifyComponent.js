import { useState, useRef } from "react";
import { postGroundRegister } from "../../../api/groundApi";
import RegisterGroundModal from "../../../components/common/registerGroundModal";
import ResultModal from "components/common/ResultModal";
import useCustomMove from "../../../hooks/groundCustomMove";
import { useNavigate } from "react-router-dom";

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
  changeRules: "",
  vestIsYn: false,
  footwearIsYn: false,
  showerIsYn: false,
  ballIsYn: false,
  airconIsYn: false,
  parkareaIsYn: false,
  roopIsYn: false,
  state: 0,
  postcode: "",
  files: [],
};

const GroundRegisterComponent = () => {
  const [imgFile, setImgFile] = useState("");
  const imgRef = useRef();

  const navigate = useNavigate();
  const [ground, setGround] = useState({ ...initState });
  const uploadRef = useRef();
  const [fetching, setFetching] = useState(false);
  const [result, setResult] = useState(null);

  const { moveToGroundList } = useCustomMove();

  const handleChange = (e) => {
    ground[e.target.name] = e.target.value;
    setGround({ ...ground });
  };

  const handleClickAdd = (e) => {
    const files = uploadRef.current.files;

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
    formData.append("changeRules", ground.changeRules);
    formData.append("vestIsYn", ground.vestIsYn);
    formData.append("footwearIsYn", ground.footwearIsYn);
    formData.append("showerIsYn", ground.showerIsYn);
    formData.append("ballIsYn", ground.ballIsYn);
    formData.append("airconIsYn", ground.airconIsYn);
    formData.append("parkareaIsYn", ground.parkareaIsYn);
    formData.append("roopIsYn", ground.roopIsYn);
    formData.append("state", ground.state);

    setFetching(true);
    postGroundRegister(formData)
      .then((data) => {
        setFetching(false);
        setResult(data.result);
      })
      .catch((error) => console.error(error));
  };
  const closeModal = () => {
    setResult(null);
    moveToGroundList({ page: 1 });
  };

  // 이미지 업로드 input의 onChange
  const saveImgFile = () => {
    const file = uploadRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
  };
  
  function DaumPostcode(){
    new window.daum.Postcode({
          oncomplete: function(data) {
            
            console.log(data);
            
              // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
              // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
              // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
              var roadAddr = data.roadAddress; // 도로명 주소 변수
              var jibunAddr = data.jibunAddress; // 지번 주소 변수
              // 우편번호와 주소 정보를 해당 필드에 넣는다.
              if(roadAddr !== ''){
                  ground.addr = roadAddr;
              } 
              else if(jibunAddr !== ''){
                ground.addr = jibunAddr;
              }
              setGround({...ground})
          }
      }).open();
  }

  return (
    <div className=" flex-wrap flex-direction justify-center max-w-screen-lg h-100% bg-gray-100">
      <div className="max-w-screen-lg flex mb-4">
        {fetching ? <RegisterGroundModal /> : <></>}
        {result ? (
          <ResultModal
            title={"구장등록 결과"}
            content={`${ground.name} 등록 신청`}
            callbackFn={closeModal}
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
            <button className="flex float-end mb-2 btn btn-xs" onClick={DaumPostcode} >주소 찾기</button>
            <input
              id="addr"
              type={"text"}
              name="addr"
              placeholder="대한시 민국구 1945번길 815"
              value={ground.addr}
              onChange={handleChange}
              className="input input-bordered w-full max-w-xs"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="inAndOut"
              className="block text-sm font-medium text-gray-800"
            >
              실내외:
            </label>
            <input
              type={"text"}
              name="inAndOut"
              placeholder="실외"
              value={ground.inAndOut}
              onChange={handleChange}
              className="input input-bordered w-full max-w-xs"
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
              type={"text"}
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
            <input
              type={"text"}
              name="openTime"
              placeholder="8 (24시간단위로 숫자만 입력)"
              value={ground.openTime}
              onChange={handleChange}
              className="input input-bordered w-full max-w-xs"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="closeTime"
              className="block text-sm font-medium text-gray-800"
            >
              마감 시간:
            </label>
            <input
              type={"text"}
              name="closeTime"
              placeholder="24 (24시간단위로 숫자만 입력)"
              value={ground.closeTime}
              onChange={handleChange}
              className="input input-bordered w-full max-w-xs"
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
              type={"text"}
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
          <img
            src={imgFile ? imgFile : `/img/download.png`}
            alt="안녕"
            className="w-full rounded-md"
          />
          <div className="skeleton"></div>
          <input
            ref={uploadRef}
            type={"File"}
            accept="/image/*"
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
                  defaultChecked
                  className="checkbox"
                  value={ground.vestIsYn}
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
                  defaultChecked
                  className="checkbox"
                  value={ground.footwearIsYn}
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
                  defaultChecked
                  className="checkbox"
                  value={ground.showerIsYn}
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
                  defaultChecked
                  className="checkbox"
                  value={ground.roopIsYn}
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
                  defaultChecked
                  className="checkbox"
                  value={ground.ballIsYn}
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
                  defaultChecked
                  className="checkbox"
                  value={ground.airconIsYn}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="mb-4 form-control">
              <label htmlFor="parkareaIsYn" className="label cursor-pointer">
                <span className="label-text">주차장</span>
                <input
                  type={"checkbox"}
                  name="parkareaIsYn"
                  defaultChecked
                  className="checkbox"
                  value={ground.parkareaIsYn}
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
            className=" w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700"
            onClick={handleClickAdd}
          >
            등록
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroundRegisterComponent;