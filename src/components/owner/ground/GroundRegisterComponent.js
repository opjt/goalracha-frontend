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
  uNo: 2,
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
        <form className="bg-white mb-4 w-3/6 p-8">
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4">구장 등록</h2>

            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-600"
              >
                구장 이름:
              </label>
              <input
                type={"text"}
                name="name"
                value={ground.name}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="addr"
                className="block text-sm font-medium text-gray-600"
              >
                구장 주소:
              </label>
              <input
                type={"text"}
                name="addr"
                value={ground.addr}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="inAndOut"
                className="block text-sm font-medium text-gray-600"
              >
                실내외:
              </label>
              <input
                type={"text"}
                name="inAndOut"
                value={ground.inAndOut}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="width"
                className="block text-sm font-medium text-gray-600"
              >
                구장 크기:
              </label>
              <input
                type={"text"}
                name="width"
                value={ground.width}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="grassInfo"
                className="block text-sm font-medium text-gray-600"
              >
                잔디 정보:
              </label>
              <input
                type={"text"}
                name="grassInfo"
                value={ground.grassInfo}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="recommdMan"
                className="block text-sm font-medium text-gray-600"
              >
                추천 인원:
              </label>
              <input
                type={"text"}
                name="recommdMan"
                value={ground.recommdMan}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="usageTime"
                className="block text-sm font-medium text-gray-600"
              >
                기본 이용 시간:
              </label>
              <input
                type={"text"}
                name="usageTime"
                value={ground.usageTime}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="openTime"
                className="block text-sm font-medium text-gray-600"
              >
                오픈 시간:
              </label>
              <input
                type={"text"}
                name="openTime"
                value={ground.openTime}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="closeTime"
                className="block text-sm font-medium text-gray-600"
              >
                마감 시간:
              </label>
              <input
                type={"text"}
                name="closeTime"
                value={ground.closeTime}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="fare"
                className="block text-sm font-medium text-gray-600"
              >
                요금:
              </label>
              <input
                type={"text"}
                name="fare"
                value={ground.fare}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>
          </div>
        </form>

        <form className="w-6/12 mb-4 bg-white p-8 ">
          <div className="text-2xl font-bold mb-4">사진 등록</div>
          <img src={imgFile ? imgFile :`/img/download.png`} alt="안녕" className="w-full" />
          <div className=""></div>
          <input
            ref={uploadRef}
            type={"File"}
            accept="/image/*"
            onChange={saveImgFile}
            multiple={true}
            className="file-input file-input-bordered w-full max-w-xs"
          ></input>
        </form>
      </div>

      <form className="flex- bg-white p-8 w- h-100%">
        <div className="mb-4">
          <label
            htmlFor="userGuide"
            className="block text-sm font-medium text-gray-600"
          >
            이용 안내:
          </label>
          <input
            type={"text"}
            name="userGuide"
            value={ground.userGuide}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full h-40"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="userRules"
            className="block text-sm font-medium text-gray-600"
          >
            이용 규칙:
          </label>
          <input
            type={"text"}
            name="userRules"
            value={ground.userRules}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full h-40"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="refundRules"
            className="block text-sm font-medium text-gray-600"
          >
            환불 규정:
          </label>
          <input
            type={"text"}
            name="refundRules"
            value={ground.refundRules}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full h-40"
          />
        </div>
      </form>

      <form className="flex-wrap bg-white p-8 w-full ">
        <h2 className="flex-auto text-2xl font-bold mb-4">부대시설</h2>
        <div className="flex justify-center">
          <div className="mb-4 justify-center">
            <label
              htmlFor="vestIsYn"
              className="block text-sm font-medium justify-center mr-3 ml-3 text-gray-600"
            >
              조끼
            </label>
            <input
              type={"checkbox"}
              name="vestIsYn"
              className="justify-center mr-3 ml-3"
              value={ground.vestIsYn}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="footwearIsYn"
              className="block text-sm font-medium justify-center mr-3 ml-3 text-gray-600"
            >
              풋살화
            </label>
            <input
              type={"checkbox"}
              name="footwearIsYn"
              className="justify-center mr-3 ml-3"
              value={ground.footwearIsYn}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="showerIsYn"
              className="block text-sm font-medium justify-center mr-3 ml-3 text-gray-600"
            >
              샤워실
            </label>
            <input
              type={"checkbox"}
              name="showerIsYn"
              className="justify-center mr-3 ml-3"
              value={ground.showerIsYn}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="roopIsYn"
              className="block text-sm font-medium justify-center mr-3 ml-3 text-gray-600"
            >
              지붕
            </label>
            <input
              type={"checkbox"}
              name="roopIsYn"
              className="justify-center mr-3 ml-3 "
              value={ground.roopIsYn}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="ballIsYn"
              className="block text-sm font-medium justify-center mr-3 ml-3 text-gray-600"
            >
              공대여
            </label>
            <input
              type={"checkbox"}
              name="ballIsYn"
              className="justify-center mr-3 ml-3"
              value={ground.ballIsYn}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="airconIsYn"
              className="block text-sm font-medium justify-center mr-3 ml-3 text-gray-600"
            >
              에어컨
            </label>
            <input
              type={"checkbox"}
              name="airconIsYn"
              className="justify-center mr-3 ml-3"
              value={ground.airconIsYn}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="parkareaIsYn"
              className="block text-sm font-medium justify-center mr-3 ml-3 text-gray-600"
            >
              주차장
            </label>
            <input
              type={"checkbox"}
              name="parkareaIsYn"
              className="justify-center mr-3 ml-3"
              value={ground.parkareaIsYn}
              onChange={handleChange}
            />
          </div>
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
      </form>
    </div>
  );
};

export default GroundRegisterComponent;
