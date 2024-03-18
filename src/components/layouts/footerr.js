import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const handleClick = (destination) => {
    navigate(destination);
  };

  return (
    <div className="bg-base-200">
      <footer className="footer p-10 bg-base-200 text-base-content max-w-screen-2xl mx-auto">
        <aside className="left-1/4">
          <img src="/img/goal.png" className="h-12" alt="Goal logo" />
          <p>
            Copyright 2024, goal-racha Co.,Ltd
          </p>
          <span onClick={() => handleClick('/admin/login')}>admin login</span> 
        </aside>

        <nav>
          <h6 className="footer-title"></h6>
          <span onClick={() => handleClick('/privacy-policy')} className="link link-hover">
            개인정보처리방침
          </span>
          <span onClick={() => handleClick('/terms-of-service')} className="link link-hover">
            이용약관
          </span>
        </nav>

        <nav>
          <h6 className="footer-title">Company</h6>
          <p className="link link-hover">골라차 | 대표자 : 박정태 | 사업자등록번호 : 000 00 00000</p>
          <p className="link link-hover">
            주소 : 서울특별시 금천구 가산디지털1로 332, 3층 309호(가산동, 한라원앤원타워)
          </p>
          <p className="link link-hover">고객문의 : 070-0000-0000 (09시-23시)</p>
          <p className="link link-hover">대표번호 : 02-0000-0000 (평일 09시~19:30)</p>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
