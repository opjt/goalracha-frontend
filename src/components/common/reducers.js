// 초기 상태 정의
const initialState = {
    loginSlice: {
        nickname: '',
        tel: '',
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
      default:
        return state;
    }
  };
  
  export default rootReducer;