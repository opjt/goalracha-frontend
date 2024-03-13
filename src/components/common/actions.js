// 액션 타입 정의
export const MODIFY_USER_INFO = 'MODIFY_USER_INFO';

// 액션 생성자 정의
export const modifyUserInfo = (userInfo) => ({
  type: MODIFY_USER_INFO,
  payload: userInfo,
});