import axios from "axios"
import jwtAxios from "util/jwtUtil";


const prefix = `${process.env.REACT_APP_SERVER}/api/ground`
export const API_SERVER_HOST = `${process.env.REACT_APP_SERVER}`

// 상세정보 불러오기
export const getGround = async (gno) => {
  const res = await jwtAxios.get(`${prefix}/${gno}`)

  return res.data
}

// 구장 사업자 구장목록
export const getOwnerGroundList = async (pageParam, uNo) => {
  const { page, size } = pageParam
  const res = await jwtAxios.get(`${prefix}/list/${uNo}`, { params: { page: page, size: size } })
  
  return res.data
}

// 구장 사업자 구장목록
export const getOwnerGroundListSearch = async (pageParam, uNo, searchName) => {
  const { page, size } = pageParam
  const res = await jwtAxios.get(`${prefix}/list/${uNo}/${searchName}`, { params: { page: page, size: size } })
  
 return res.data
}

// 구장 목록
export const getGroundList = async (pageParam) => {
  const { page, size } = pageParam
  const res = await jwtAxios.get(`${prefix}/list`, { params: { page: page, size: size } })

    return res.data
}
  

// 구장등록
export const postGroundRegister = async (groundInfo) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } }
  const res = await jwtAxios.post(`${prefix}/`, groundInfo, header)

  return res.data
};

// 구장삭제
export const deleteGround = async (gno) => {
  const res = await jwtAxios.delete(`${prefix}/${gno}`)

  return res.data
}

// 구장수정
export const putGround = async (gno, ground) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } }
  const res = await jwtAxios.put(`${prefix}/${gno}`, ground, header)

  return res.data
}