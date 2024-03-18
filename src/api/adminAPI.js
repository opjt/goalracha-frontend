import axios from 'axios';

// API의 기본 URL 설정
const API_BASE_URL = 'http://localhost:8080/goalracha/ground/';

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