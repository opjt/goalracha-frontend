import { getGround } from "api/groundApi";
import { useEffect, useState } from "react";




const GroundModifyComponent = ({gno, moveList, moveRead}) =>  {

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
        uno: 0,
    
      };
    
    const [ground, setGround] = useState({...initState})

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
    useEffect(() => {
        getGround(gno).then(data => setGround(data))
    },[gno])

    const handleChangeComplete = (e) => {
        const value = e.target.value
        ground.complete = (value === 'Y')
        setGround({...ground})
    }
    

    return 
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
}




export default GroundModifyComponent