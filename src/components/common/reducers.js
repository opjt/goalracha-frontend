// 초기 상태 정의
const initialState = {
  loginSlice: {
    nickname: '',
    tel: '',
    pw: '' // pw로 수정
  }
};

// 리듀서 정의
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case MODIFY_USER_INFO:
      return {
        ...state,
        loginSlice: {
          ...state.loginSlice,
          ...action.payload,
        }
      };
    case OWNER_CHANGE_PASSWORD:
      return {
        ...state,
        loginSlice: {
          ...state.loginSlice,
          pw: action.payload.newPassword
        }
      };
    default:
      return state;
  }
};

export default rootReducer;
