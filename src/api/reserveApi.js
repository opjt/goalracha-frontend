import axios from "axios"
import jwtAxios from "../util/jwtUtil"
const host = `${process.env.REACT_APP_SERVER}/api/reserve`


//아이디 중복검사
export const getListbyFilter = async (req) => {
    // console.log(req)
    const res = await axios.post(`${host}/v/date/`, req)
    return res.data
}

export const getInfoByGno = async (req) => {
    const res = await axios.get(`${host}/v/ground/${req.gno}/${req.date}`)
    return res.data
}

export const addReserv = async (req) => {
    const res = await jwtAxios.post(`${host}/v/p/`, req)
    return res.data
}

// user 이전 예약 목록
export const getUserPreviousReservations = async (pageParam, uNo) => {
    const { page, size } = pageParam
    const res = await axios.get(`${host}/v/previous-reservations/${uNo}`, { params: { page: page, size: size } })
    return res.data
}

// user 예약현황 목록
export const getUserReservationStatus = async (pageParam, uNo) => {
    const { page, size } = pageParam
    const res = await axios.get(`${host}/v/reservation-status/${uNo}`, { params: { page: page, size: size } })
    return res.data
}

// owner 예약 목록
export const getOwnerReserveList = async (pageParam, uNo) => {
    const { page, size } = pageParam
    const res = await axios.get(`${host}/v/owner-list/${uNo}`, { params: { page: page, size: size } })
    return res.data
}

// admin 예약 목록(전체)
export const getAllReserveList =async(pageParam) => {
    const {page, size} = pageParam
    const res = await axios.get(`${host}/v/list`,{params: {page:page, size:size}})
    return res.data
}