import axios from "axios"
import jwtAxios from "../util/jwtUtil"
const host = `${process.env.REACT_APP_SERVER}/api/member`


export const loginPost = async (loginParam) => {

    const header = { headers: { "Content-Type": "x-www-form-urlencoded" } }

    const form = new FormData()
    form.append('username', loginParam.id)
    form.append('password', loginParam.pw)

    const res = await axios.post(`${host}/login`, form, header)

    return res.data
}

export const modifyMember = async (member) => {
    const res = await jwtAxios.put(`${host}/${member.uNo}`, member)
    return res.data
}