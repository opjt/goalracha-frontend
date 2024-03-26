const PrivacyPolicyPage = () => {
  return (
    
    <div className="max-w-screen-lg mx-auto mt-10 border border-gray-400 p-8 mb-10">
      <h1 className="text-3xl font-bold mb-4">📋 개인정보 이용 동의약관</h1>
      <p className="text-lg mb-4">
        풋살 예약플랫폼 골라차(이하 골라차)에서는 회원 서비스 제공을 위해 다음의 개인정보를 수집하고 이를 수집/이용하며, 정보주체는 이에 동의하고 제공하는 개인정보에 대해 동의합니다.
      </p>

      <div className="max-w-screen-lg mx-auto mt-10 border border-gray-400 p-8">
      <h2 className="text-2xl font-bold mb-2">1. 개인정보의 수집항목 및 수집방법</h2>
      <p className="mb-4">
        골라차는 실명인증정보와 가입정보를 수집합니다. 이는 홈페이지 회원가입을 통해 수집됩니다.
        <br />
        수집하는 개인정보의 항목은 다음과 같습니다:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>실명인증정보: 이름, 휴대전화번호, 카카오프로필, 사업자등록번호</li>
        <li>가입정보: 아이디, 비밀번호, 사업자명, 이메일, 전화번호, 휴대전화번호, 담당자명, 카카오프로필</li>
      </ul>
      <p className="mb-4">
        또한 인터넷 서비스 이용과정에서 IP주소, 서비스 이용기록, 방문기록 등이 자동으로 생성되어 수집될 수 있습니다.
      </p>

      <h2 className="text-2xl font-bold mb-2">2. 개인정보의 수집/이용 목적 및 보유/이용 기간</h2>
      <p className="mb-4">
        골라차는 회원 가입일로부터 서비스 제공하는 기간 동안 최소한의 개인정보를 보유하고 이용합니다.
        회원가입 등을 통해 동의한 내용은 언제든지 철회할 수 있습니다.
        수집한 개인정보는 수집/이용 목적이 달성되거나 보유/이용기간이 종료된 경우 지체 없이 파기됩니다.
      </p>
      <p className="mb-4">
        보유/이용기간 및 목적은 다음과 같습니다:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>실명인증정보: 홈페이지 이용에 따른 본인 식별/인증절차에 이용, 보유 및 이용기간: 카카오(프로필)API는 별도로 저장하지 않으며 실명인증용으로만 이용</li>
        <li>가입정보: 홈페이지 서비스 이용 및 회원관리, 불량회원의 부정 이용방지, 민원신청 및 처리 등, 보유 및 이용기간: 2년 또는 회원탈퇴시</li>
      </ul>

      <h2 className="text-2xl font-bold mb-2">3. 수집한 개인정보 제3자 제공</h2>
      <p className="mb-4">
        골라차는 정보주체의 동의나 법률의 특별한 규정에 따라 개인정보를 제3자에게 제공합니다.
      </p>

      <h2 className="text-2xl font-bold mb-2">4. 개인정보 처리업무 안내</h2>
      <p className="mb-4">
        골라차는 개인정보의 취급위탁을 하지 않으며, 아래의 API와 자체 DB를 통해 실명인증 및 로그인인증을 합니다.
      </p>
      <p className="mb-4">수탁업체:</p>
      <ul className="list-disc pl-6 mb-4">
        <li>카카오로그인API: 카카오ID 및 프로필을 통한 개인인증</li>
      </ul></div></div>
);
};

export default PrivacyPolicyPage;