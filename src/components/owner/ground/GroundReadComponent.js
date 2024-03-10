import { useEffect, useState } from "react";
import { getGround } from "../../../api/groundApi";

const initState = {
  groundInfoList: [],
  checkBoxList: [],
  StateList: [],
  gno: 0,
  name: '',
  addr: '',
  inAndOut: '',
  width: '',
  grassInfo: '',
  recommdMan: '',
  usageTime: '',
  openTime: '',
  closeTime: '',
  fare: 0,
  userGuide: '',
  userRules: '',
  refundRules: '',
  changeRules: '',
  vestIsYn: false,
  footwearIsYn: false,
  showerIsYn: false,
  ballIsYn: false,
  airconIsYn: false,
  parkareaIsYn: false,
  roopIsYn: false,
  state: 0,
  uno: 0
};

const GroundReadComponent = ({ gno }) => {

  const [ground, setGround] = useState(initState);

  useEffect(() => {
    getGround(gno).then(data => {
      console.log(data);
      setGround(data);
    });
  }, [gno]);

  return (
  <div>
    <h1>{ground.name}</h1>
    <p>주소: {ground.addr}</p>
    <p>구장크기: {ground.width}</p>
    <p>실내외: {ground.inAndOut}</p>
    <p>잔디정보: {ground.grassInfo}</p>
    <p>추천인원: {ground.recommdMan}</p>
    <p>기본이용시간: {ground.usageTime} 시간</p>
    <p>오픈시간: {ground.openTime}</p>
    <p>마감시간: {ground.closeTime}</p>
    <p>요금: {ground.fare} 원</p>
    <p>이용안내: {ground.userGuide}</p>
    <p>이용규칙: {ground.userRules}</p>
    <p>환불규정: {ground.refundRules}</p>
    <p>변경규정: {ground.changeRules}</p>
    <p>팀조끼대여여부: {ground.vestIsYnest_isYn ? "가능" : "불가능"}</p>
    <p>풋살화대여여부: {ground.footwearIsYn ? "가능" : "불가능"}</p>
    <p>샤워실여부: {ground.showerIsYn ? "있음" : "없음"}</p>
    <p>공대여여부: {ground.ballIsYn ? "가능" : "불가능"}</p>
    <p>지붕여부: {ground.airconIsYn ? "있음" : "없음"}</p>
    <p>냉난방시설여부: {ground.parkareaIsYn ? "있음" : "없음"}</p>
    <p>주차장여부: {ground.roopIsYn ? "있음" : "없음"}</p>
    <p>구장상태: {ground.state}</p>
  </div>
  )
};

export default GroundReadComponent;
