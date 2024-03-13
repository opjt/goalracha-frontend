import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { putOwnerPwModify } from "api/memberApi";
import { modifyUserInfo } from "components/common/actions";

const initState = {
    oldpw: '',
    pw: '',
    pwr: ''
};

const OwnerPwModifyModal = ({ onModalClose, uNo, pw, closeModal }) => {
    const dispatch = useDispatch();
    const [newPw, setNewPw] = useState(initState);

    const handlePwChange = (event) => {
        setNewPw(event.target.value);
    };

    const handleSave = async () => {
        const modifiedPwInfo = {
            pw: newPw
        };
        try {
            const response = await putOwnerPwModify(modifiedPwInfo, uNo);
            console.log("비밀번호 수정 완료", response);

            // 수정된 정보를 Redux store에 반영
            dispatch(modifyUserInfo(modifiedPwInfo));

            // 모달 닫기 이벤트 호출
            closeModal();
            // 모달 닫히면서 새로운 비밀번호 전달 (로그인 상태 업데이트)
            onModalClose(modifiedPwInfo);
        } catch(error){
            console.error("사용자 정보 수정 오류 : " , error)
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
                                    비밀번호 수정
                                </h3>
                                {/* 기존 비밀번호 입력 폼 */}
                                <div className="mt-4">
                                    <label
                                        htmlFor="oldpw"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        기존 비밀번호
                                    </label>
                                    <input
                                        type="password"
                                        name="oldpw"
                                        id="oldpw"
                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        placeholder="기존 비밀번호를 입력하세요"
                                    />
                                </div>
                                {/* 새 비밀번호 입력 폼 */}
                                <div className="mt-4">
                                    <label
                                        htmlFor="pw"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        새 비밀번호
                                    </label>
                                    <input
                                        type="password"
                                        name="pw"
                                        id="pw"
                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        placeholder="새 비밀번호를 입력하세요."
                                        onChange={handlePwChange}
                                    />
                                </div>

                                {/* 새 비밀번호 확인 입력 폼 */}
                                <div className="mt-4">
                                    <label
                                        htmlFor="pwr"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        새 비밀번호 확인
                                    </label>
                                    <input
                                        type="password"
                                        name="pwr"
                                        id="pwr"
                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        placeholder="새 비밀번호 한번 더 입력하세요."

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
    );
};

export default OwnerPwModifyModal;