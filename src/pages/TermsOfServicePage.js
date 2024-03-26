const TermsOfServicePage = () => {
  return (
    <div className="max-w-screen-lg mx-auto mt-10 mb-10 border border-gray-400 p-8">
      <h1 className="text-4xl font-bold">📋 이용약관</h1>
      <div className="max-w-screen-lg mx-auto mt-10 border border-gray-400 p-8">
        <h2 className="text-2xl font-bold mb-2">1. 회원탈퇴 약관</h2>
        <p className="mb-4">
          1. 언제든지 골라차 서비스의 마이페이지 또는 고객센터를 통해 회원탈퇴를
          할 수 있으며, 특별한 사정이 없는 한 이를 지체없이 처리합니다.
          <br />
          2. 회원탈퇴가 완료되는 경우, 회사는 관련 법령에 따라 보유 의무가 있는
          정보를 제외한 개인정보를 즉시 삭제합니다.
          <br />
          3. 한 번 탈퇴한 회원의 경우, 서비스 운영정책에서 정하는 바에 따라 다시
          가입하는 것이 제한될 수 있습니다.
          <br />
          4. 회사는 본 조에 따라서 이용제한을 하는 경우 회원은 이용제한의 철회를
          요청할 수 있으며, 구체적인 내용은 골라차 운영정책에서 정합니다.
          <br />
          5. 회원자격이 본 조에 따라 박탈되는 경우, 회사는 관련 법령 및
          개인정보처리방침에 따라 보유하는 회원의 정보를 제외한 계정에 등록된
          정보를 즉시 삭제합니다.
        </p>
      </div>
      <div className="max-w-screen-lg mx-auto mt-10 border border-gray-400 p-8">
        {" "}
        <h2 className="text-2xl font-bold mb-2">2. 환불 규정</h2>
        <p className="mb-4">
          - 이용 5일 전까지: 100% 환불
          <br />
          - 4일 전 ~ 3일 전: 50% 환불
          <br />
          - 2일 전 ~ 대관 당일: 환불 불가
          <br />
          - 특정 사유에 따른 환불 요청 시 상단 규정에 따릅니다.
          <br />
          - 다음과 같은 경우에는 상단 규정대로 처리됩니다:
          <br />
          - 고객의 사정으로 예약된 날짜에 구장 이용을 못하는 경우
          <br />
          - 구장, 날짜, 시간 등을 실수로 잘못 선택했을 경우
          <br />- 단순 변심으로 인해 환불이나 변경을 요청하는 경우
        </p>
      </div>
      <div className="max-w-screen-lg mx-auto mt-10 border border-gray-400 p-8">
        <h2 className="text-2xl font-bold mb-2">3. 이용규칙</h2>
        <p className="mb-4">이용규칙은 아래와 같습니다.</p>
        <ul className="list-disc pl-6 mb-4">
          <li>풋살장 예약시간 준수</li>
          <li>
            풋살장 내 취사, 흡연 및 음주행위, 지나친 소음행위 금지(적발 시
            이용불가)
          </li>
          <li>시설 사용 후 정리정돈 ( 쓰레기 반드시 처리 )</li>
          <li>
            고의 및 과실로 인한 시설물 훼손 및 파손시 사용자가 배상하며 경기중
            부상은 본인이 책임집니다.
          </li>
          <li>
            잔디보호와 부상방지를 위하여 스터드가 있는 축구화(SG, FG, HG, AG)는
            착용이 금지되며 풋살화(TF)만 착용 가능합니다.
          </li>
          <li>
            위 내용이 지켜지지 않을 경우 무환불 퇴장조치 될 수 있으니 예약시 꼭
            참고부탁드립니다.
          </li>
          <li>
            위 내용을 지키지 않아 발생하는 문제는 예약자 본인에게 있습니다.
          </li>
          <li>정보 입력후 관리자에게 승인 요청</li>
        </ul>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
