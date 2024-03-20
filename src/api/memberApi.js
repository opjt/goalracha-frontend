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
//아이디 중복검사
export const checkMemberId = async (member) => {
    console.log(member)
    const config = {
        headers: {
            'Content-Type': 'text/plain; charset=UTF-8'
        }
    };
    const res = await axios.post(`${host}/checkid`, member, config)
    return res.data
}

// 닉네임 중복검사
export const checkNickname = async (nickname) => {
    const res = await axios.get(`${host}/checkNickname/${nickname}`);
    return res.data;
};


//사업자회원 회원가입
export const joinOwner = async (member) => {
    const res = await axios.post(`${host}/owner`, member)
    return res.data
}

// 사용자 정보 수정 API 호출 함수
export const putUserModify = async (member, uNo) => {
    const res = await axios.put(`${host}/user/modify/${uNo}`, member);

    return res.data;
};

// 사업자 정보 수정 API 호출 함수
export const putOwnerModify = async (member, uNo) => {
    const res = await axios.put(`${host}/owner/modify/${uNo}`, member);

    return res.data;
};

export const putOwnerPwModify = async (member, uNo) => {
    try {
        const res = await axios.put(`${host}/owner/pwmodify/${uNo}`, member);
        return res.data; // 정상적으로 처리되었을 경우 응답 데이터 반환
    } catch (error) {
        throw error; // 오류 발생 시 오류를 호출한 곳으로 반환
    }
};

// 회원 탈퇴 API 호출 함수
export const withdrawMember = async (uNo) => {
    try {
        const res = await axios.delete(`${host}/${uNo}`);
        return res.data; // 성공적으로 처리되었을 경우 응답 데이터 반환
    } catch (error) {
        throw error; // 오류 발생 시 오류를 호출한 곳으로 반환
    }
};