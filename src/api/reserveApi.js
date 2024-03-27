import axios from "axios"
import jwtAxios from "../util/jwtUtil"
const host = `${process.env.REACT_APP_SERVER}/api/reserve`

//필터별 구장 전체검색
export const getListbyFilter = async (req) => {
    // console.log(req)
    const res = await axios.post(`${host}/g/list/`, req)
    return res.data
}
//구장상세정보페이지
export const getInfoByGno = async (req) => {
    const res = await axios.get(`${host}/g/ground/${req.gno}/${req.date}`)
    return res.data
}

//user 구장예약
export const addReserv = async (req) => {
    const res = await jwtAxios.post(`${host}/`, req)
    return res.data
}

//user 예약정보
export const reserveInfo = async (req) => {
    const res = await jwtAxios.post(`${host}/info`, req)
    return res.data
}


//user 예약 취소
export const cancelReserv = async (req) => {
    const res = await jwtAxios.post(`${host}/cancel`, req)
    return res.data
}

// user 예약 목록
export const getUserReservationStatus = async (pageParam, uNo) => {
    const { page, size } = pageParam
    const res = await jwtAxios.get(`${host}/ulist/${uNo}`, { params: { page: page, size: size } })
    return res.data
}

// owner 예약 목록
export const getOwnerReserveList = async (pageParam, uNo) => {
    const { page, size } = pageParam
    const res = await jwtAxios.get(`${host}/owner-list/${uNo}`, { params: { page: page, size: size } })
    return res.data
}


// admin 예약 목록(전체)
export const getAllReserveList = async (pageParam) => {
    const { page, size } = pageParam
    const res = await jwtAxios.get(`${host}/admin-list`, { params: { page: page, size: size } })
    return res.data
}

// owner 예약 목록
export const getOwnerReserveListSearch = async (pageParam, uNo, searchName) => {
    const { page, size } = pageParam
    const res = await jwtAxios.get(`${host}/owner-list/${uNo}/${searchName}`, { params: { page: page, size: size } })
    return res.data
}

// admin 예약 목록(전체)
export const getAllReserveListSearch = async (pageParam, uNo, searchName) => {
    const { page, size } = pageParam
    const res = await jwtAxios.get(`${host}/admin-list/${uNo}/${searchName}`, { params: { page: page, size: size } })
    return res.data
}

// owner 예약 목록(리스트 출력)
export const getOwnerStatistics = async (uNo) => {
    const res = await jwtAxios.get(`${host}/owner/statistics/${uNo}`)
    return res.data
}