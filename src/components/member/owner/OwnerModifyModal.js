import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { putOwnerModify } from "api/memberApi"
import useCustomLogin from "hooks/useCustomLogin";

const OwnerModifyModal = ({ closeModal, uNo, name, tel, onModalClose }) => {
    const dispatch = useDispatch();
    const [newName, setNewname] = useState(name);   // 새 담당자 이름 상태
    const [newTel, setNewTel] = useState(tel);  // 새 전화번호 상태
    const { loginState, doUpdate } = useCustomLogin();
    const [showTelMessage, setShowTelMessage] = useState(false); // 전화번호 유효성 메시지 표시 여부

    const handleNameChange = (event) => {
        setNewname(event.target.value);
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

    // 사용자 정보 저장 함수
    const handleSave = async () => {
    // 전화번호 유효성 검사
    const regex = /^(01[0-9]{1}-?[0-9]{4}-?[0-9]{4}|01[0-9]{8})$/;
    if (!regex.test(newTel)) {
      setShowTelMessage(true); // 올바르지 않은 전화번호를 입력한 경우 메시지 표시
      return; // 유효하지 않은 전화번호이므로 저장하지 않음
    }

    const modifiedUserInfo = {
        name : newName,
        tel: newTel,
    };

    try {
        const response = await putOwnerModify(modifiedUserInfo, uNo);
        console.log("사용자 정보 수정 완료:", response);

        const modify = {
        ...loginState,
        name : newName,
        tel: newTel,
        };
        doUpdate(modify);

      // 모달 닫기 이벤트 호출
        handleCloseModal();
    } catch (error) {
        console.error("사용자 정보 수정 오류:", error);
    }
    };

    // 모달 닫기 함수
    const handleCloseModal = () => {
    closeModal();
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
                      ✔️ 담당자 수정
                    </h3>
                    {/* 담당자 입력 폼 */}
                    <div className="mt-4 flex justify-between items-center">
                      <input
                        type="text"
                        placeholder="담당자 이름을 입력하세요."
                        className="input input-bordered w-full max-w-md"
                        value={newName}
                        onChange={handleNameChange}
                      />
                    </div>
                    
      
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
}

export default OwnerModifyModal