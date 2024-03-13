import React, { useState } from "react";

// 초기 상태 정의
const initState = {
    pw: '',
    pwr: '',
    oldpw: ''
};

const OwnerPasswordModal = ({ isOpen, closeModal, handlePasswordChange }) => {
    const [pwInfo, setPwInfo] = useState(initState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPwInfo({ ...pwInfo, [name]: value });
    };

    const handleSubmit = () => {
        handlePasswordChange(pwInfo);
        closeModal();
    };

    return (
        <div className={`modal ${isOpen ? "modal-open" : ""}`}>
            <div className="modal-box">
                <h3 className="modal-title">비밀번호 수정</h3>
                <div className="modal-body">
                    <input
                        type="password"
                        value={pwInfo.oldpw}
                        onChange={handleChange}
                        name="oldpw"
                        placeholder="기존 비밀번호를 입력하세요..."
                    />
                </div>
                <h3 className="modal-title">비밀번호 수정</h3>
                <div className="modal-body">
                    <input
                        type="password"
                        value={pwInfo.pw}
                        onChange={handleChange}
                        name="pw"
                        placeholder="새로운 비밀번호를 입력하세요..."
                    />
                </div>
                <h3 className="modal-title">비밀번호 수정</h3>
                <div className="modal-body">
                    <input
                        type="password"
                        value={pwInfo.pwr}
                        onChange={handleChange}
                        name="pwr"
                        placeholder="새로운 비밀번호와 동일하게 입력하세요..."
                    />
                </div>

                <div className="modal-footer ">
                    <button className="btn btn-secondary" onClick={closeModal}>
                        취소
                    </button>
                    <button className="btn btn-primary" onClick={handleSubmit}>
                        확인
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OwnerPasswordModal;
