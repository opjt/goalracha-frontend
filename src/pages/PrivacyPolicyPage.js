
const PrivacyPolicyPage = () => {
  return (
    <>

      <div className="max-w-screen-lg mx-auto mt-10">
        <h1 className="text-3xl font-bold mb-4">개인정보처리방침</h1>
        <p className="text-lg mb-4">
          본 서비스는 사용자의 개인정보를 중요시하며, 이를 보호하기 위해 최선의 노력을 다하고 있습니다. 이에 관한 상세한 내용은 아래에서 확인하실 수 있습니다.
        </p>
        <h2 className="text-2xl font-bold mb-2">1. 수집하는 개인정보 항목</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>이용자의 성명</li>
        <li>이용자의 연락처 (전화번호 또는 이메일 주소)</li>
        <li>예약 일시 및 시간</li>
      </ul>
      <h2 className="text-2xl font-bold mb-2">2. 개인정보의 수집 및 이용목적</h2>
      <p className="mb-4">
        이 서비스는 풋살장 예약을 위해 최소한의 개인정보를 수집하고 있습니다. 수집된 개인정보는 다음과 같은 목적으로 이용됩니다:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>풋살장 예약 관리</li>
        <li>이용자와의 연락</li>
      </ul>
      <h2 className="text-2xl font-bold mb-2">3. 개인정보의 보유 및 이용기간</h2>
      <p className="mb-4">
        수집된 개인정보는 이용자의 예약 정보를 관리하고 서비스 제공에 필요한 기간 동안 보유됩니다. 예약 정보가 더 이상 필요하지 않은 경우 즉시 파기됩니다.
      </p>
      <h2 className="text-2xl font-bold mb-2">4. 개인정보의 제공 및 공유</h2>
      <p className="mb-4">
        이 서비스는 이용자의 개인정보를 본래의 목적 이외에는 제3자에게 제공하지 않습니다.
      </p>
      <h2 className="text-2xl font-bold mb-2">5. 개인정보의 안전성 확보 조치</h2>
      <p className="mb-4">
        이 서비스는 이용자의 개인정보를 안전하게 관리하기 위해 다음과 같은 조치를 취하고 있습니다:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>개인정보 암호화</li>
        <li>접근 제어를 위한 시스템 구축</li>
        <li>보안 프로그램 설치 및 주기적인 업데이트</li>
      </ul>
      <h2 className="text-2xl font-bold mb-2">6. 개인정보 관련 권리</h2>
      <p className="mb-4">
        이용자는 본인의 개인정보에 대해 다음과 같은 권리를 행사할 수 있습니다:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>개인정보 열람 요청</li>
        <li>개인정보 수정 요청</li>
        <li>개인정보 삭제 요청</li>
        <li>개인정보 처리 일시 중단 요청</li>
      </ul>
      <p className="mb-4">위의 권리 행사는 해당 서비스의 고객센터를 통해 가능합니다.</p>
      <h2 className="text-2xl font-bold mb-2">7. 개인정보 처리방침 변경</h2>
      <p className="mb-4">
        이 개인정보 처리 방침은 법령, 정책 또는 보안 기술의 변경에 따라 변경될 수 있습니다. 변경 사항이 있는 경우 사전에 공지할 것입니다.
      </p>
      <h2 className="text-2xl font-bold mb-2">8. 개인정보 관리책임자</h2>
      <p className="mb-4">
        이 서비스의 개인정보 관리책임자는 다음과 같습니다:
        <ul className="list-disc pl-6 mb-4">
          <li>성명: [관리책임자 성명]</li>
          <li>이메일: [관리책임자 이메일 주소]</li>
          <li>전화번호: [관리책임자 연락처]</li>
        </ul>
      </p>
    </div>

    </>
  );
};

export default PrivacyPolicyPage;