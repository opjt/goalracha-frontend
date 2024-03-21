import axios from 'axios';

// API의 기본 URL 설정
const API_BASE_URL = 'http://localhost:8080/goalracha/ground/';
const host = `${process.env.REACT_APP_SERVER}/api/member`;

// 구장 목록을 불러오는 함수
export const fetchGrounds = async () => {
  return await axios.get(`${API_BASE_URL}`);
};

// 구장 상태를 변경하는 함수
export const changeGroundState = async (gno, newState) => {
  return await axios.put(`${API_BASE_URL}changeState/${gno}`, { newState });
};

export const fetchImagesByGno = async (gno) => {
  try {
    const response = await fetch(`${API_BASE_URL}images/${gno}`);
    return response.json();
  } catch (error) {
    console.error('Error fetching images:', error);
  }
};

// 사용자 목록 불러오기
export const fetchMembers = async () => {
  try {
    const response = await axios.get(`${host}/user`);
    return response.data;
  } catch (error) {
    console.error("Fetching members failed:", error);
    throw error;
  }
};

// 사업자 목록 불러오기
export const fetchOwners = async () => {
  try {
    const response = await axios.get(`${host}/owner`);
    return response.data;
  } catch (error) {
    console.error("Fetching members failed:", error);
    throw error;
  }
};

export const fetchReservationsForUser = async (userName) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/reserve/v/list/${userName}`);
    return response.data.dtoList; // 'dtoList' 프로퍼티로 배열 데이터에 접근
  } catch (error) {
    console.error("Fetching reservations for user failed:", error);
    throw error;
  }
};