
## 프로젝트 소개

<center>![image](https://github.com/opjt/goalracha-backend/assets/153418952/7354d04e-a304-455d-83ad-969f4e4897d2)<br>
## 맨날가는 구장 지루해? 이젠 골라차
</center>

> 현대사회는 길어지는 수명과 늘어난 여가시간으로 생활체육에 대한 관심도가 지대하게 높아졌습니다.<br>
> 골라차(goalracha)는 높아지는 축구의 인기와 사람들의 생활체육의 관심도를 기반으로 시작한 프로젝트입니다.<br><br>
> 손쉽게 구장을 예약하고 사용자에게 필요정보를 제공하여 생활체육의 접근성을 높이고, <br>
> 사업자에게 여러구장을 하나의 플랫폼에서 간단하게 관리할 수 있는 구장 중개 사이트입니다.

### Features
> * 사용자는 다양한 구장 정보를 한 번에 비교 할 수 있고,
> * 사업자는 여러구장의 정보 및 상태와 예약현황을 손쉽게 관리
> * 각 기능별 최소한의 UI를 통해 사용자와 사업자로 하여금 쉽고 빠른 사용성을 제공 <br>

### develope
> [👉Front-end Repository](https://github.com/opjt/goalracha-frontend)<br>
> [👉Back-end Repository](https://github.com/opjt/goalracha-backend)<br><br>
> **📆 개발 기간**<br>
> 2024-02-28 ~ 2024-03-29



## 👪 팀원

<div >
<table align="left">
  
  <tr>
    <td align="center" class="wook">
        <img src="https://github.com/changwooki.png" height="100px" /><br>
            <a href="https://github.com/CHANGWOOKI">김창욱</a>
    </td>
    <td align="center" class="opjt">
        <img src="https://github.com/opjt.png" height="100px" /><br>
            <a href="https://github.com/opjt">박정태</a>
    </td>
    <td align="center" class="yoo2">
        <img src="https://github.com/jaegyuyoo.png" height="100px" /><br>
            <a href="https://github.com/jaegyuyoo">유재규</a>
    </td>
    <td align="center" class="sky">
        <img src="https://github.com/HaneulHong.png" height="100px" /><br>
            <a href="https://github.com/HaneulHong">홍하늘</a>
    </td>
    <td align="center" class="hieunji">
    <img src="https://github.com/hieunji.png" height="100px" /><br>
            <a href="https://github.com/hieunji">황은지</a>
    </td>
  </tr>

</table>
</div> 
<br>

## 📝 ERD  
[👉 ERD Cloud에서 직접 보기](https://www.erdcloud.com/d/wcMQAFkk2i4yxuMzb)
![ERD](https://github.com/YesunPark/cafe-bom/assets/57663597/5e003930-aeae-4568-b4c4-c755d91b5b06)




## ⚙ 기술 스택

**Backend** \
<img src="https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white">
<img src="https://img.shields.io/badge/Spring_Security-6DB33F?style=for-the-badge&logo=springSecurity&logoColor=white">
<img src="https://img.shields.io/badge/JPA-green?style=for-the-badge&logo=spring&logoColor=white">
<img src="https://img.shields.io/badge/oracle-F80000?style=for-the-badge&logo=oracle&logoColor=white">
<img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white">  

 
**Frontend**  
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white">
<img src="https://img.shields.io/badge/tailwind_css-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
<img src="https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=white">
<img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">
<img src="https://img.shields.io/badge/Daisy_ui-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white">  

## 💡 주요 기능

## 📃 API 명세서

| Domain |URL | Http Method | Description |
|---|---|---|---|
|Auth|/api/member/refresh|GET|JWT 재발급|
||/api/member/login|POST|스프링시큐리티 로그인|
|Board|/api/board/g/{bno}|GET|게시글 상세정보 조회|
||/api/board/g/list|GET|게시글 전체목록 조회|
||/api/board|POST|게시글 작성|
||/api/board/{bno}|PUT, DELETE|게시글 수정,삭제|
|Ground|/api/ground/{gno}|GET|구장 상세정보 조회|
||/api/ground/{gno}|PUT, DELETE|구장 수정,삭제|
||/api/ground/list|GET|구장목록 조회|
||/api/ground/images/{gno}|GET|구장의 사진 조회|
||/api/ground/g/view/{filename}|GET|파일이름으로 이미지 조회|
|Member|/api/member/{uno}|POST|유저 회원가입|
||/api/member/{uno}|DELETE|유저 회원탈퇴|
||/api/member/user/{uno}|PUT|유저 정보 수정|
||/api/member/owner/{uno}|PUT|사업자 정보 수정|
||/api/member/owner/pw/{uno}|PUT|사업자 비밀번호 수정|
||/api/member/user|GET|유저 목록 불러오기|
||/api/member/g/owner|POST|사업자 회원가입|
||/api/member/g/checknickname|GET|닉네임 중복검사|
||/api/member/g/checkid|GET|아이디 중복검사|
|Reserve|/api/reserve|POST|예약 등록|
||/api/reserve|DELETE|예약 취소|
||/api/reserve/info|POST|예약 상세정보|
||/api/reserve/g/list|POST|예약가능 구장목록 조회|
||/api/reserve/g/ground|POST|예약페이지 구장상세정보|
||/api/reserve/ulist|GET|유저의 예약목록 조회|
||/api/reserve/admin-list|GET|예약 전체목록 조회|
||/api/reserve/owner-list|GET|사업자 예약목록 조회|
||/api/reserve/owner/statistics|GET|사업자 통계|


## 📁 형상 관리
<table align="center"> <!-- 팀원 표 -->
  <tr>
   <th>
      <img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white">
      <br/>
      프로젝트 관리, 문서관리, 미팅로그, 업무보고일지 등
      <br/>
      프로젝트 진행에 필요한 전반적인 사항 기록
   </th>
   <th>
      <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
      <br/>
      프론트엔드와 백엔드 리포지토리를 개별적으로 만들고
      <br/>
      개인의 브랜치를 통해 18:30까지 작업후 병합하여 관리
   </th>
   </tr>
  <tr>
   <td align="left" width="500px" class="Notion">
        <img src=https://github.com/opjt/goalracha-backend/assets/153418952/de2afad7-438d-4cf3-94a9-7ec35a6f3244/>
      <img src=https://github.com/opjt/goalracha-backend/assets/153418952/7133c147-464a-4141-9537-babc0c5b60ec/>
      <img src=https://github.com/opjt/goalracha-backend/assets/153418952/14cee57e-5a93-4769-823d-705c6324577f/>
   </td>
   <td align="left" width="500px" class="Jira">
      <img src=https://github.com/opjt/goalracha-backend/assets/153418952/36e076dd-6e70-47cb-88f9-bf4d339956cb/>
      <img src=https://github.com/opjt/goalracha-backend/assets/153418952/4a80aaa8-d885-4881-87b1-a8c34e370982/>
      <img src=https://github.com/opjt/goalracha-backend/assets/153418952/9706d2dc-9c61-4704-9f49-eb45d5c6210a/>
  </tr>
</table>
<br/>


## ▶️ 프로젝트 실행

> .env 파일 추가

[🔗카카오톡로그인 API키 발급](https://developers.kakao.com/docs/latest/ko/kakaologin/common)  
[🔗토스페이먼츠 API키 발급](https://developers.tosspayments.com/)
```json
// goalracha-frontend/.env
REACT_APP_SERVER = "서버주소"
REACT_APP_RESTAPIKEY = "카카오톡APIKEY"
REACT_APP_TOSS_SK = "토스페이먼츠 시크릿키"
REACT_APP_TOSS_CK = "토스페이먼츠 클라이언트키"
```