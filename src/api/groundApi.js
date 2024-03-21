import axios from "axios"
import jwtAxios from "util/jwtUtil";

export const API_SERVER_HOST = 'http://localhost:8080';  // 백엔드 서버주소

const host = `${process.env.REACT_APP_SERVER}/goalracha/ground`

const prefix = `${API_SERVER_HOST}/goalracha/ground`

// 상세정보 불러오기
export const getGround = async (gno) => {
  const res = await axios.get(`${prefix}/read/${gno}`)

  return res.data
}

// 전체 리스트 불러오기(이미지가 등록된)
export const getGroundList = async (pageParam) => {
  const { page, size } = pageParam
  const res = await axios.get(`${prefix}/`, { params: { page: page, size: size } })

  return res.data
}

// 구장등록
export const postGroundRegister = async (groundInfo) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } }
  const res = await jwtAxios.post(`${prefix}/register`, groundInfo, header)

  return res.data
};

// 구장삭제
export const deleteGround = async (gno) => {
  const res = await axios.delete(`${prefix}/delete/${gno}`)

  return res.data
}

// 구장수정
export const putGround = async (gno, ground) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } }
  const res = await jwtAxios.put(`${prefix}/modify/${gno}`, ground, header)

  return res.data
}