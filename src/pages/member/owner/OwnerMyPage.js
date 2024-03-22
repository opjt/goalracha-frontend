import React, { useState, useEffect } from "react";
import BasicLayout from "layouts/BasicLayout"; // 기본 레이아웃 컴포넌트 import
import { useSelector } from "react-redux"; // Redux에서 상태를 가져오기 위한 hook import
import OwnerPwModifyModal from "components/member/owner/OwnerPwModifyModal";    // 비밀번호 수정 모달
import OwnerModifyModal from "components/member/owner/OwnerModifyModal";    // 담당자 수정 모달
import { Link } from "react-router-dom"; // react-router의 Link 컴포넌트 import
import { withdrawMember } from "api/memberApi"; // 회원 탈퇴 API 호출
import Result2Modal from "components/common/Result2Modal";
import { useNavigate } from "react-router-dom";

// 초기 상태 정의
const initState = {
    businessId: '', // 사업자 등록 번호
    businessName: '', // 사업자명
    name: '', // 담당자 이름
    userId: '', // 아이디
    pw: '', // 비밀번호
    email: '', // 이메일
    tel: '', // 연락처
};

// OwnerMyPage 컴포넌트 정의
const OwnerMyPage = () => {
    const [member, setMember] = useState(initState); // 회원 정보 상태
    const loginInfo = useSelector((state) => state.loginSlice); // Redux 상태에서 로그인 정보 가져오기
    const [result, setResult] = useState(); // 결과 메시지 상태
    const [isPwModalOpen, setIsPwModalOpen] = useState(false); // 비밀번호 수정 모달 열림 상태
    const [isModalOpen, setIsModalOpen] = useState(false);  // 담당자 수정 모달 열림 상태
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        // 로그인 정보가 변경될 때마다 실행되는 부분
        if (loginInfo) {
            // 회원 정보 상태 업데이트
            setMember({
                ...member,
                businessId: loginInfo.businessId,
                businessName: loginInfo.businessName,
                userId: loginInfo.userId,
                pw: "******", // 비밀번호를 가립니다.
                name: loginInfo.name,
                email: loginInfo.email,
                tel: loginInfo.tel,
            });
        }
        // 로컬 스토리지에서 수정된 정보 가져오기
        
    }, [loginInfo]); // loginInfo가 변경될 때마다 실행

    // 비밀번호 모달 열기 함수
    const openPwModifyModal = () => {
        setIsPwModalOpen(true); // 비밀번호 수정 모달 열기
    };

    // 비밀번호 모달 닫기 함수
    const closePwModifyModal = () => {
        setIsPwModalOpen(false); // 비밀번호 수정 모달 닫기
    };

    const openModifyModal = () => {
        setIsModalOpen(true); // 담당자 수정 모달 열기
    };

    const closeModifyModal = () => {
        setIsModalOpen(false);  // 담당자 수정 모달 닫기
    };

    // 회원 탈퇴 결과 모달 닫기 함수
    const handleModalClose = () => {
        setShowModal(false);
        if (modalContent === "회원 탈퇴가 성공적으로 이루어졌습니다.") {
            navigate("/logout");
        }
        };
    

    // 회원 탈퇴 버튼 클릭 시 처리
    const handleClickModify = async () => {
    try {
        withdrawMember(loginInfo.uNo);
        setModalContent("회원 탈퇴가 성공적으로 이루어졌습니다.");
        setShowModal(true);
    } catch (error) {
        console.error("Error while handling member withdrawal:", error);
    }
    };


    return (
        <BasicLayout> {/* 기본 레이아웃 사용 */}

            <div className="container mx-auto max-w-[1080px]">
                <div className="w-full border border-black rounded-lg p-10 mb-4 mt-4 flex flex-col items-center">
                    <h1 className="text-3xl font-semibold text-center text-gray-700">
                        내 정보
                    </h1>

                    <form className="space-y-0.5">
                        <div>
                            <label className="label">
                                <span className="text-base label-text">
                                    사업자 등록 번호
                                </span>
                            </label>
                            <input
                                className="w-full input input-bordered bg-gray-200"
                                name="business_id"
                                type="text"
                                value={member.businessId}
                                readOnly
                            />
                        </div>

                        <div className="flex justify-between">
                            <div className="w-1/2 mr-1">
                                <label className="label">
                                    <span className="text-base label-text">사업자명</span>
                                </label>
                                <input
                                    className="input w-full input-bordered bg-gray-200"
                                    value={member.businessName}
                                    readOnly
                                    type="text"
                                    name="business_name"
                                    placeholder=""
                                />
                            </div>

                            <div className="w-1/2 mr-1">
                                <label className="label">
                                    <span className="text-base label-text">아이디</span>
                                </label>
                                <input
                                    className="input w-full input-bordered bg-gray-200"
                                    value={member.userId}
                                    readOnly
                                    type="text"
                                    name="userId"
                                    placeholder=""
                                />
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <div className="w-3/4 mr-1">
                                <label className="label">
                                    <span className="text-base label-text">비밀번호</span>
                                </label>
                                <input
                                    className="input w-full input-bordered bg-gray-200"
                                    value={member.pw}
                                    readOnly
                                    type="text"
                                    name="pw"
                                    placeholder=""
                                />
                            </div>
                            <div className="w-1/4 ml-1">
                                <button
                                    type="button"
                                    className="btn btn-block btn-outline mt-10
                                    bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded"
                                    onClick={openPwModifyModal}
                                >
                                    비밀번호 수정
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="label">
                                <span className="text-base label-text">이메일</span>
                            </label>
                            <input
                                className="w-full input input-bordered bg-gray-200"
                                name="email"
                                type="email"
                                value={member.email}
                                readOnly
                            />
                        </div>

                        <div>
                            <label className="label">
                                <span className="text-base label-text">담당자 이름</span>
                            </label>
                            <input
                                className="w-full input input-bordered bg-gray-200"
                                name="name"
                                type="text"
                                value={member.name}
                                readOnly
                            />
                        </div>

                        <div>
                            <label className="label">
                                <span className="text-base label-text">연락처</span>
                            </label>
                            <input
                                className="w-full input input-bordered bg-gray-200"
                                name="tel"
                                type="tel"
                                value={member.tel}
                                readOnly
                            />
                        </div>



                        <div className="flex justify-end ml-auto mt-4">
                            {/* 담당자 수정 버튼 */}
                            <button type="button" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded mr-5 mt-5"
                                onClick={openModifyModal}>
                                담당자 수정
                            </button>

                            {/* 회원탈퇴 버튼 */}
                            <button 
                            onClick={handleClickModify}
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded mr-5 mt-5">
                                회원탈퇴
                            </button>

                            {/* 로그아웃 버튼 */}
                            <Link to="/logout">
                                <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded mr-5 mt-5">
                                    로그아웃
                                </button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>

            {/* 비밀번호 수정 모달 */}
            {isPwModalOpen && (
                <OwnerPwModifyModal
                    closeModal={closePwModifyModal}
                    uNo={loginInfo.uNo}
                    pw={member.pw}
                    isOpen={isPwModalOpen} // isOpen prop 추가
                />
            )}

            {/* 담당자 수정 모달 */}
            {isModalOpen && (
                <OwnerModifyModal
                    closeModal={closeModifyModal}
                    uNo={loginInfo.uNo}
                    name={member.name}
                    tel={member.tel}
                    isOpen={isModalOpen} // isOpen prop 추가
                />
            )}

        {showModal && (
        <Result2Modal
            title="알림"
            content={modalContent}
            close="확인"
            callbackFn={handleModalClose}
        />
        )}

        </BasicLayout >
    );
};

export default OwnerMyPage;
