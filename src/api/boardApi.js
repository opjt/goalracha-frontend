import axios from "axios";
import boardRouter from "../router/boardRouter";
import jwtAxios from "util/jwtUtil";

// 서버주소
export const API_SERVER_HOST = `${process.env.REACT_APP_SERVER}`

const prefix = `${API_SERVER_HOST}/api/board`

export const getOne = async (bno) => {  //localhost:8080/board/1
  const res = await axios.get(`${prefix}/g/${bno}`)
  return res.data
}

export const getList = async (pageParam) => {
  const {page, size} = pageParam
  const res = await axios.get(`${prefix}/g/list`, {params : {page : page, size : size}})

  return res.data
}

export const postAdd = async (boardObj) => {
  const res = await jwtAxios.post(`${prefix}/`, boardObj)
  return res.data
}

export const deleteOne = async (bno) => {
  const res = await jwtAxios.delete(`${prefix}/${bno}`)
  return res.data
}

export const putOne = async (board) => {
  const res = await jwtAxios.put(`${prefix}/${board.bno}`, board)
  return res.data
}


