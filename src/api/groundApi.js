import axios from "axios"
import jwtAxios from "util/jwtUtil";

export const API_SERVER_HOST = 'http://localhost:8080';  // 백엔드 서버주소

const host = `${process.env.REACT_APP_SERVER}/goalracha/ground`

const prefix = `${API_SERVER_HOST}/goalracha/ground`

export const getGround = async (gno) => {
  const res = await axios.get(`${prefix}/read/${gno}`)

  return res.data
}

export const getGroundList = async ( pageParam ) => {
  const{page, size} = pageParam
  const res = await axios.get(`${prefix}/`, {params: {page:page, size:size}})

  return res.data
}

export const postGroundRegister = async (groundInfo) => {
  const header = {headers: {"Content-Type": "multipart/form-data"}}

  const res = await jwtAxios.post(`${prefix}/register`,groundInfo, header)

  return res.data
};

export const deleteGround = async (gno) => {
  const res = await axios.delete(`${prefix}/delete/${gno}`)
  
  return res.data
}

export const putModifyGround = async (ground) => {
  const res = await axios.put(`${prefix}/modify/${ground.gno}`, ground)
  
  return res.data
}