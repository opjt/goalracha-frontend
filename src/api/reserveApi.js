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
    const res = await jwtAxios.post(`${host}/v/p/`,req)
    return res.data
}