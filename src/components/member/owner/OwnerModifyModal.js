import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { putOwnerModify } from "api/memberApi"
import useCustomLogin from "hooks/useCustomLogin";

const OwnerModifyModal = ({ closeModal, uNo, name, tel, onModalClose }) => {
    const dispatch = useDispatch();
    const [newName, setNewname] = useState(name);   // 새 담당자 이름 상태
    const [newTel, setNewTel] = useState(tel);  // 새 전화번호 상태
    const { loginState, doUpdate } = useCustomLogin();
    const handleNameChange = (event) => {
        setNewname(event.target.value);
    };

    const handleTelChange = (event) => {
        setNewTel(event.target.value);
    }

    const handleSave = async () => {
        const modifiedInfo = {
            name: newName,
            tel: newTel
        };

        try {
            const response = await putOwnerModify(modifiedInfo, uNo);
            console.log("사용자 정보 수정 완료 : ", response);

            const modify = {
                ...loginState,
                name: newName,
                tel: newTel 
              };
            doUpdate(modify);


            // 모달 닫기 이벤트 호출
            closeModal();


            
        } catch (error) {
            console.error("사용자 정보 수정 오류 : ", error);
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
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                                <svg
                                    className="h-6 w-6 text-blue-600"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 19l-7-7 7-7"
                                    />
                                </svg>
                            </div>
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3
                                    className="text-lg leading-6 font-medium text-gray-900"
                                    id="modal-title"
                                >
                                    담당자 수정
                                </h3>
                                {/* 담당자 이름 입력 폼 */}
                                <div className="mt-4">
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        담당자 이름
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        placeholder="담당자 이름을 입력하세요."
                                        value={newName} // 수정: newName 상태 사용
                                        onChange={handleNameChange}
                                    />
                                </div>
                                {/* 연락처 입력 폼 */}
                                <div className="mt-4">
                                    <label
                                        htmlFor="tel"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        연락처
                                    </label>
                                    <input
                                        type="text"
                                        name="tel"
                                        id="tel"
                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        placeholder="연락처를 입력하세요."
                                        value={newTel} // 수정: newTel 상태 사용
                                        onChange={handleTelChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* 모달 footer */}
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                            onClick={handleSave} // 저장 버튼 클릭 시 handleSave 호출
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                            저장
                        </button>
                        
                        <button
                            onClick={closeModal} // 취소 버튼 클릭 시 closeModal 호출
                            type="button"
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                        >
                            취소
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default OwnerModifyModal