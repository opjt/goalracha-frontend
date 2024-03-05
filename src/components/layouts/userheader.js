import React, { Component } from 'react';

class Userheader extends Component {
  render() {
    return (
    <header className="bg-gray-800 text-white h-16 max-w-screen-xl mx-auto flex items-center justify-between p-4">
      {/* 로고 */}
      <div className="flex items-center pr-60">
        <img src="/path/to/logo.png" alt="Logo" className="h-8 mr-4" />
      </div>

      {/* 검색창과 검색 버튼 */}
      <div className="flex items-center ml-80">
        <input
          type="text"
          placeholder="주소, 구장명을 입력하세요"
          className="w-200 h-70 px-4 py-2 border border-gray-300 rounded mr-4 text-gray-700"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          검색
        </button>
      </div>

      {/* 마이페이지 버튼 */}
      <button className="bg-blue-500 text-white px-4 py-2 rounded ml-auto">
        마이페이지
      </button>
    </header>
    );
  }
}

export default Userheader;