import React from "react";

const OwnerInfoModal = ({ isOpen, closeModal, member }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-8 w-96 relative">
            <h2 className="text-xl font-semibold mb-4">✔️ 내 정보</h2>
            <div className="text-gray-700 mb-4">
              <div className="font-semibold text-md">{member.businessName} 님, 로그인 정보를 알려드려요.</div>
              <div className="mt-1 font-thin text-gray-400">{member.email}</div>
              <div className="mt-1 font-thin text-gray-400">{member.businessId}</div>
              <div className="mt-1 font-thin text-gray-400">{member.userId}</div>
              <div className="mt-1 font-thin text-gray-400">{member.pw}</div>
            </div>
            <button
              onClick={closeModal}
              className="absolute bottom-4 right-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default OwnerInfoModal;
