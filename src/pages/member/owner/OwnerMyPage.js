import React, { useState, useEffect } from "react";
import BasicLayout from "layouts/BasicLayout"; // 기본 레이아웃 컴포넌트 import
import { useSelector } from "react-redux"; // Redux에서 상태를 가져오기 위한 hook import
import ResultModal from "components/common/ResultModal"; // 결과 모달 컴포넌트 import
import { putOwnerModify } from "api/memberApi"; // 소유자 정보 수정 API 함수 import
import useCustomLogin from "hooks/useCustomLogin"; // 커스텀 로그인 훅 import
import OwnerPasswordModal from "components/member/owner/OwnerPasswordModal"; // 소유자 비밀번호 모달 컴포넌트 import
import { Link } from "react-router-dom"; // react-router의 Link 컴포넌트 import

// 초기 상태 정의
const initState = {
    businessId: '',
    businessName: '',
    name: '',
    userId: '',
    pw: '',
    email: '',
    tel: '',
};

// OwnerMyPage 컴포넌트 정의
const OwnerMyPage = () => {
    // 상태 변수 정의
    const [member, setMember] = useState(initState); // 회원 정보 상태
    const loginInfo = useSelector((state) => state.loginSlice); // Redux 상태에서 로그인 정보 가져오기
    const [result, setResult] = useState(); // 결과 메시지 상태
    const [isPwModalOpen, setIsPwModalOpen] = useState(false); // 비밀번호 수정 모달 열림 상태
    const { moveToPath } = useCustomLogin(); // 커스텀 로그인 훅 사용

    // 컴포넌트가 마운트될 때 로그인 정보가 변경될 때마다 실행되는 useEffect
    useEffect(() => {
        // 로그인 정보가 존재하는 경우
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
    }, []);

    // 모달 닫기 함수
    const closeModal = () => {
        setResult(null);
        moveToPath(); // 홈으로 이동
    };

    // 비밀번호 모달 열기 함수
    const handleOpenPwModal = () => {
        setIsPwModalOpen(true);
    };

    // 비밀번호 모달 닫기 함수
    const handleClosePwModal = () => {
        setIsPwModalOpen(false);
    };

    // 비밀번호 변경 핸들러
    const handlePasswordChange = (newPassword) => {
        setMember((prevState) => ({
            ...prevState,
            pw: newPassword,
        }));
    };

    // JSX 반환
    return (
        <BasicLayout> {/* 기본 레이아웃 사용 */}

            {/* 소유자 비밀번호 모달 컴포넌트 */}
            <OwnerPasswordModal
                isOpen={isPwModalOpen}
                closeModal={handleClosePwModal}
                handlePasswordChange={handlePasswordChange}
            />

            <div className="container mx-auto max-w-[1080px]">
                <div className="w-full border border-black rounded-lg p-10 mb-4 mt-4 flex flex-col items-center">
                    <h1 className="text-3xl font-semibold text-center text-gray-700">
                        마이 페이지
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
                                    bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
                                    onClick={handleOpenPwModal}
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
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded mr-5 mt-5">
                                담당자 수정
                            </button>

                            {/* 회원탈퇴 버튼 */}
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded mr-5 mt-5">
                                회원탈퇴
                            </button>

                            {/* 로그아웃 버튼 */}
                            <Link to="/userlogout">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded mr-5 mt-5">
                                    로그아웃
                                </button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </BasicLayout>
    );
};

export default OwnerMyPage;