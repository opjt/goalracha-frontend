import React from 'react';

const UnauthorizedStadiumPage = ({ ground }) => {
  return (
    <div className="container mx-auto mt-5">
      <h2 className="text-2xl font-bold mb-5">접근 불가능한 구장</h2>
      <div className="bg-gray-100 p-4 rounded-lg">
        <p><strong>구장 이름:</strong> {ground.name}</p>
        <p><strong>구장 주소:</strong> {ground.addr}</p>
        <p>이 구장은 현재 접근할 수 없습니다.</p>
      </div>
    </div>
  );
};

export default UnauthorizedStadiumPage;
