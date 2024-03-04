import axios from "axios"
import jwtAxios from "../util/jwtUtil"
const host = `${process.env.REACT_APP_SERVER}/api/member`


export const loginPost = async (loginParam) => {

    const header = { headers: { "Content-Type": "x-www-form-urlencoded" } }

    const form = new FormData()
    form.append('username', loginParam.email)
    form.append('password', loginParam.pw)

    const res = await axios.post(`${host}/login`, form, header)

    return res.data
}
