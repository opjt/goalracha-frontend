import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginPost } from "../api/memberApi";
import { getCookie, setCookie, removeCookie } from "../util/cookieUtil";
const initState = {
    email: ''
}

const loadMemberCookie = () => { //쿠키에서 로그인 정보 로딩
    const memberInfo = getCookie("member")
    //닉네임 처리
    if (memberInfo && memberInfo.nickname) {
        memberInfo.nickname = decodeURIComponent(memberInfo.nickname)
    }
    return memberInfo
}

export const loginPostAsync = createAsyncThunk('loginPostAsync', (param) => {
    return loginPost(param);
})

const loginSlice = createSlice({
    name: 'LoginSlice',
    initialState: loadMemberCookie() || initState,
    reducers: {
        login: (state, action) => {
            console.log("로그인.....")
            const payload = action.payload
            setCookie("member", JSON.stringify(payload), 1) //1 일
            return payload
        },
        logout: (state, action) => {
            console.log("로그아웃....")
            removeCookie("member")
            return { ...initState }
        },
        update: (state, action) => { 
            const payload = action.payload
            console.log(payload.nickname) 
            setCookie("member", JSON.stringify(payload), 1) //1 일
            return payload
        }
        
    },
    extraReducers: (builder) => {
        builder.addCase(loginPostAsync.fulfilled, (state, action) => {
            console.log("fulfilled : 완료")
            const payload = action.payload
            if (!payload.error) {
                console.log("쿠키 저장")
                setCookie("member", JSON.stringify(payload), 1)
            }
            return payload

        })
            .addCase(loginPostAsync.pending, (state, action) => {
                console.log("pending : 처리중")
            })
            .addCase(loginPostAsync.rejected, (state, action) => {
                console.log("rejected : 오류")
            })
    }

})
export const { login, logout, update } = loginSlice.actions
export default loginSlice.reducer