import axios from 'axios';
import jwtAxios from 'util/jwtUtil';

// API의 기본 URL 설정
const API_BASE_URL = `${process.env.REACT_APP_SERVER}/api/ground`;
const host = `${process.env.REACT_APP_SERVER}/api/member`;

// 구장 목록을 불러오는 함수
export const fetchGrounds = async () => {
  return await jwtAxios.get(`${API_BASE_URL}/list`, { params: {page:1,size:99999} });
};

// 구장 상태를 변경하는 함수
export const changeGroundState = async (gno, newState) => {
  return await jwtAxios.put(`${API_BASE_URL}/state/${gno}`, { newState });
};

export const fetchImagesByGno = async (gno) => {
  try {
    const response = await jwtAxios.get(`${API_BASE_URL}/images/${gno}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
  }
};

// 사용자 목록 불러오기
export const fetchMembers = async () => {
  try {
    const response = await jwtAxios.get(`${host}/user`);
    return response.data;
  } catch (error) {
    console.error("Fetching members failed:", error);
    throw error;
  }
};

// 사업자 목록 불러오기
export const fetchOwners = async () => {
  try {
    const response = await jwtAxios.get(`${host}/owner`);
    return response.data;
  } catch (error) {
    console.error("Fetching members failed:", error);
    throw error;
  }
};

export const fetchReservationsForUser = async (userName) => {
  try {
    console.log(userName)
    const response = await jwtAxios.get(`${process.env.REACT_APP_SERVER}/api/reserve/admin-list/${userName}`);
    return response.data.dtoList; // 'dtoList' 프로퍼티로 배열 데이터에 접근
  } catch (error) {
    console.error("Fetching reservations for user failed:", error);
    throw error;
  }
};

export const fetchUserReservationsWithUserInfo = async (uNo, pageRequest = { page: 1, size: 10 }) => {
  try {
    const response = await jwtAxios.get(`${process.env.REACT_APP_SERVER}/api/reserve/user-reservations/${uNo}`, { params: pageRequest });
    return response.data;
  } catch (error) {
    console.error("Fetching user reservations with user info failed:", error);
    throw error;
  }
};