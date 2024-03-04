import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <footer id="footer" className="bg-gray-200 p-4">
        <div className="max-w-screen-xl mx-auto p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-4 sm:col-span-1">
              <a>
                <img src="/path/to/logo.png" alt="Logo" className="w-full" />
              </a>
              <div className="mt-4 text-gray-600">Copyright © 2024, goal-racha Co.,Ltd</div>
            </div>
            <div className="col-span-4 sm:col-span-1">
              <ul>
                <li><a href="/privacy-policy" className="text-blue-500 hover:underline">개인정보처리방침</a></li>
                <li><a href="/terms-of-service" className="text-blue-500 hover:underline">이용약관</a></li>
                <li><a href="/company-info" className="text-blue-500 hover:underline">회사소개/광고문의</a></li>
              </ul>
            </div>
            <div className="col-span-4 sm:col-span-2">
              <p className="mb-2 text-gray-800">골라차 | 대표자 : 박정태 | 사업자등록번호 : 000 00 00000</p>
              <p className="mb-2 text-gray-800">주소 : 서울특별시 금천구 가산디지털1로 332, 3층 309호(가산동, 한라원앤원타워)</p>
              <p className="mb-2 text-gray-800">고객문의 : 070-0000-0000 (09시-23시)</p>
              <p className="mb-2 text-gray-800">대표번호 : 02-0000-0000 (평일 09시~19:30)</p>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
