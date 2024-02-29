import React, { Component } from 'react';

class Adminheader extends Component {
  render() {
    return (
    <header className="bg-gray-800 text-white h-16 max-w-screen-xl mx-auto flex items-center justify-between p-4">
      {/* 로고 */}
      <div className="flex items-center pr-60">
        <img src="/path/to/logo.png" alt="Logo" className="h-8 mr-4" />
      </div>

      {/* 마이페이지 버튼 */}
      <button className="bg-blue-500 text-white px-4 py-2 rounded ml-auto">
        마이페이지
      </button>
    </header>
    );
  }
}

export default Adminheader;