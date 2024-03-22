import React, { useState } from "react";
import { putUserModify, checkNickname } from "api/memberApi";
import useCustomLogin from "hooks/useCustomLogin";

const UserModifyModal = ({ closeModal, uNo, nickname, tel, onModalClose }) => {
  const [newNickname, setNewNickname] = useState(nickname); // 새 닉네임 상태
  const [newTel, setNewTel] = useState(tel); // 새 전화번호 상태
  const { loginState, doUpdate } = useCustomLogin();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // 버튼 활성화 여부
  const [showNicknameMessage, setShowNicknameMessage] = useState(false); // 닉네임 중복 확인 메시지 표시 여부
  const [showTelMessage, setShowTelMessage] = useState(false); // 전화번호 유효성 메시지 표시 여부
  const [checkname, setCheckname] = useState(false);

  // 닉네임 입력 변경 시 실행되는 함수
  const handleNicknameChange = (event) => {
    const newNicknameValue = event.target.value;
    setNewNickname(newNicknameValue); // 새로운 닉네임 상태 업데이트
    setIsButtonDisabled(false); // 중복 확인 버튼 활성화
    setShowNicknameMessage(false); // 닉네임 메시지 숨기기
  };

  // 전화번호 변경 시 실행되는 함수
  const handleTelChange = (event) => {
    const newTelValue = event.target.value;
    setNewTel(newTelValue); // 새로운 전화번호 상태 업데이트
  };

  // 전화번호 유효성 검사 함수
  const handleBlurCheckTel = () => {
    const phoneNumber = newTel;
    const regex = /^(01[0-9]{1}-?[0-9]{4}-?[0-9]{4}|01[0-9]{8})$/;
    const isValidTel = regex.test(phoneNumber);
    setShowTelMessage(!isValidTel); // 올바르지 않은 전화번호를 입력한 경우 메시지 표시
  };

  // 모달 닫기 함수
  const handleCloseModal = () => {
    closeModal();
  };

  // 사용자 정보 저장 함수
  const handleSave = async () => {
    // 전화번호 유효성 검사
    const regex = /^(01[0-9]{1}-?[0-9]{4}-?[0-9]{4}|01[0-9]{8})$/;
    if (!regex.test(newTel)) {
      setShowTelMessage(true); // 올바르지 않은 전화번호를 입력한 경우 메시지 표시
      return; // 유효하지 않은 전화번호이므로 저장하지 않음
    }

    // 이미 사용 중인 닉네임인 경우 저장하지 않음
    if (!checkname) {
      return;
    }

    const modifiedUserInfo = {
      nickname: newNickname,
      tel: newTel,
    };

    try {
      const response = await putUserModify(modifiedUserInfo, uNo);
      console.log("사용자 정보 수정 완료:", response);

      const modify = {
        ...loginState,
        tel: newTel,
        nickname: newNickname,
      };
      doUpdate(modify);

      // 모달 닫기 이벤트 호출
      handleCloseModal();
    } catch (error) {
      console.error("사용자 정보 수정 오류:", error);
    }
  };

  // 닉네임 중복 검사 함수
  const handleClickCheckNickname = async () => {
    if (newNickname === "") {
      return; // 닉네임이 비어있으면 검사를 하지 않음
    }
    try {
      const encodedNickname = encodeURIComponent(newNickname); // 닉네임 인코딩
      const result = await checkNickname(encodedNickname); // 인코딩된 닉네임으로 중복 확인 요청
      setShowNicknameMessage(true); // 메시지 표시
      setCheckname(!result.available); // 결과에 따라 중복 여부 설정
      setIsButtonDisabled(true); // 중복확인 버튼 비활성화

      // 사용 가능한 닉네임이면 정보 저장 함수 호출
      if (result.available) {
        handleSave(); // 정보 저장 함수 호출
      }
    } catch (error) {
      console.error("Error while checking nickname:", error);
    }
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
  
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
  
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-8 sm:pb-6">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 sm:mt-0 w-full">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-title"
                >
                  ✔️ 프로필 수정
                </h3>
                {/* 닉네임 입력 폼 */}
                <div className="mt-4 flex justify-between items-center">
                  <input
                    type="text"
                    placeholder="닉네임을 입력하세요."
                    className="input input-bordered w-full max-w-md mr-4"
                    value={newNickname}
                    onChange={handleNicknameChange}
                  />
                  <button
                    type="button"
                    onClick={handleClickCheckNickname}
                    className={`btn btn-neutral ${isButtonDisabled ? "btn-disabled" : ""} w-1/5 text-ellipsis min-w-24`}
                    disabled={isButtonDisabled}
                  >
                    중복확인
                  </button>
                </div>
                {showNicknameMessage && (
                  <div className={checkname ? "text-green-500 mt-2" : "text-red-500 mt-2"}>
                    {checkname ? "사용 가능한 닉네임입니다." : "이미 사용 중인 닉네임입니다."}
                  </div>
                )}
  
                {/* 전화번호 입력 폼 */}
                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="(-)을 포함하여 입력하세요."
                    className="input input-bordered w-full max-w-md"
                    value={newTel}
                    onChange={handleTelChange}
                    onBlur={handleBlurCheckTel}
                  />
                  {showTelMessage && (
                    <div className="text-red-500 mt-2">
                      잘못된 전화번호 형식입니다.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
  
          {/* 모달 footer */}
          <div className="bg-gray-50 px-4 py-3 sm:px-8 sm:flex sm:flex-row-reverse">
            <button
              onClick={handleSave} // 저장 버튼 클릭 시 handleSave 호출
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-600 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              저장
            </button>
            <button
              onClick={closeModal} // 취소 버튼 클릭 시 closeModal 호출
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:w-auto sm:text-sm"
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  
  
};

export default UserModifyModal;
