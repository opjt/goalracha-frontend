import React, { useState } from "react";
import { putOwnerPwModify } from "api/memberApi";
import useCustomLogin from "hooks/useCustomLogin";

const OwnerPwModifyModal = ({ onPwModalClose, uNo, closeModal }) => {
    const { doLogout, moveToPath } = useCustomLogin();
    const [pw, setPw] = useState({
        oldpw: '',
        newpw: '',
        newpwr: ''
    });
    const [errorMessage, setErrorMessage] = useState(null);

    const handlePwChange = (event) => {
        const { name, value } = event.target;
        setPw(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSave = async () => {
        const { oldpw, newpw, newpwr } = pw;

        if (newpw !== newpwr) {
            setErrorMessage("새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다.");
            return;
        }

        try {
            const response = await putOwnerPwModify({ oldpw, newpw, newpwr }, uNo);
            console.log("비밀번호 수정 완료", response);
            alert("비밀번호가 변경되었습니다")
            
            closeModal(); // 모달을 닫는 함수 호출

        } catch (error) {
            // 오류 메시지를 백엔드에서 반환했다면 그것을 사용하고, 그렇지 않으면 기본 오류 메시지를 사용합니다.
            const errorMessageFromServer = error.response?.data?.message || "기존 비밀번호가 일치하지 않습니다.";
            setErrorMessage(errorMessageFromServer);
        }
    };

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        
                            
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">✔️ 비밀번호 수정</h3>
                                {errorMessage && <div className="text-red-500 text-sm">{errorMessage}</div>}

                                <div className="mt-4">
                                    
                                    <input type="password" name="oldpw" id="oldpw" className="input input-bordered w-full max-w-md" placeholder="기존 비밀번호를 입력하세요"  />
                                </div>
                                

                                <div className="mt-4">
                                    
                                    <input type="password" name="newpw" id="newpw" className="input input-bordered w-full max-w-md" placeholder="새 비밀번호를 입력하세요."  />
                                </div>
                                <div className="mt-4">
                                    
                                    <input type="password" name="newpwr" id="newpwr" className="input input-bordered w-full max-w-md" placeholder="새 비밀번호를 다시 입력하세요."  />
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

export default OwnerPwModifyModal;
