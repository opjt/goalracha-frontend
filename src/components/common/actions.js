// 액션 타입 정의
export const MODIFY_USER_INFO = 'MODIFY_USER_INFO';

export const OWNER_CHANGE_PASSWORD = 'OWNER_CHANGE_PASSWORD';


// 액션 생성자 정의
export const modifyUserInfo = (userInfo) => ({
  type: MODIFY_USER_INFO,
  payload: userInfo,
});


export const modifyOwnerInfo = (initState) => ({
  type: OWNER_CHANGE_PASSWORD,
  payload: initState,
});