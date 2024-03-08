import { useState } from "react";
import { postGroundRegister } from "../../../api/groundApi";

const GroundRegisterComponent = () => {
  const initState = {
    groundInfoList: [],
    rulesList: [],
    checkBoxList: [],
    StateList: [],
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
  };

  const [formData, setFormData] = useState({
    groundInfoList: [],
    rulesList: [],
    checkBoxList: [],
    stateList: [],
  });

  const [ground, setGround] = useState({ ...initState });

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;

    // 체크박스인 경우, checked 값을 사용
    const updatedValue = type === "checkbox" ? checked : value;

    // 기존 객체를 직접 수정하지 않고, 새로운 객체를 생성하여 업데이트
    setGround((prevGround) => ({
      ...prevGround,
      [name]: updatedValue,
    }));
  };

  const handleRegister = () => {
    postGroundRegister(ground)
      .then((result) => {
        console.log(result);
        setGround({ ...initState });
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <div className=" flex-wrap flex-direction justify-center max-w-screen-lg h-100% bg-gray-100">
      <div className="max-w-screen-lg flex mb-4" >
      <form
        onSubmit={handleRegister}
        className="bg-white mb-4 w-3/6 p-8"
      >
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
              type="text"
              id="name"
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
              type="text"
              id="addr"
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
              type="text"
              id="inAndOut"
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
              type="text"
              id="width"
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
              type="text"
              id="grassInfo"
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
              type="text"
              id="recommdMan"
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
              type="text"
              id="usageTime"
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
              type="text"
              id="openTime"
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
              type="text"
              id="closeTime"
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
              type="text"
              id="fare"
              name="fare"
              value={ground.fare}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          </div>
</form>

<form className="w-6/12 mb-4 bg-white p-8 " ><h2 className="text-2xl font-bold mb-4">사진 등록</h2></form>
</div>

<div
        onSubmit={handleRegister}
        className="flex- bg-white p-8 w- h-100%"
      > 
          <div className="mb-4">
            <label
              htmlFor="userGuide"
              className="block text-sm font-medium text-gray-600"
            >
              이용 안내:
            </label>
            <input
              type="text"
              id="userGuide"
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
              type="text"
              id="userRules"
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
              type="text"
              id="refundRules"
              name="refundRules"
              value={ground.refundRules}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full h-40"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="changeRules"
              className="block text-sm font-medium text-gray-600"
            >
              변경 규정:
            </label>
            <input
              type="text"
              id="changeRules"
              name="changeRules"
              value={ground.changeRules}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full h-40"
            />
          </div>
</div>

<form
        onSubmit={handleRegister}
        className="flex-wrap bg-white p-8 w-full "
      >
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
              type="checkbox"
              id="vestIsYn"
              name="vestIsYn"
              className="justify-center mr-3 ml-3"
              checked={ground.vestIsYn}
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
              type="checkbox"
              id="footwearIsYn"
              name="footwearIsYn"
              className="justify-center mr-3 ml-3"
              checked={ground.footwearIsYn}
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
              type="checkbox"
              id="showerIsYn"
              name="showerIsYn"
              className="justify-center mr-3 ml-3"
              checked={ground.showerIsYn}
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
              type="checkbox"
              id="roopIsYn"
              name="roopIsYn"
              className="justify-center mr-3 ml-3 "
              checked={ground.roopIsYn}
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
              type="checkbox"
              id="ballIsYn"
              name="ballIsYn"
              className="justify-center mr-3 ml-3"
              checked={ground.ballIsYn}
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
              type="checkbox"
              id="airconIsYn"
              name="airconIsYn"
              className="justify-center mr-3 ml-3"
              checked={ground.airconIsYn}
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
              type="checkbox"
              id="parkareaIsYn"
              name="parkareaIsYn"
              className="justify-center mr-3 ml-3"
              checked={ground.parkareaIsYn}
              onChange={handleChange}
            />
          </div>
          </div>
        </form>
<form
        onSubmit={handleRegister}
        className="flex-wrap bg-white p-8 w-full"
      >
        <h2 className="flex-auto text-2xl font-bold mb-4">구장 상태</h2>
        <div className="justify-center">
          <label
            htmlFor="state"
            className="block text-sm font-medium text-gray-600 mb-2"
          >
          </label>
          <div className="flex space-x-4 justify-center">
            <label>
              <input
                type="radio"
                id="stateOpen"
                name="state"
                value={ground.state}
                onChange={handleChange}
              />
              <span className="ml-2">오픈</span>
            </label>

            <label>
              <input
                type="radio"
                id="stateClosed"
                name="state"
                value={ground.state}
                onChange={handleChange}
              />
              <span className="ml-2">마감</span>
            </label>

            <label>
              <input
                type="radio"
                id="statePreparing"
                name="state"
                value={ground.state}
                onChange={handleChange}
              />
              <span className="ml-2">준비중</span>
            </label>
          </div>
        </div>

        <div className="mt-8">
          <button
            type="submit"
            className=" w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700"
          >
            등록
          </button>
        </div>
      </form>
    </div>
  );
};

export default GroundRegisterComponent;
