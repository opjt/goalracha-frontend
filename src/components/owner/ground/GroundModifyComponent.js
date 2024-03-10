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
    
}

export default GroundModifyComponent