import Header from "components/layouts/mainHeader"; // 헤더 컴포넌트 임포트
import Navbar from "components/layouts/topnav"; // 네비게이션 바 컴포넌트 임포트
import Footer from "components/layouts/footerr"; // 푸터 컴포넌트 임포트


const TermsOfServicePage = () => {
  return (
    <>
    <Header /> {/* 헤더 추가 */}
    <Navbar /> {/* 네비게이션 바 추가 */}
    <div className="max-w-screen-lg mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-4">이용약관</h1>
      <p className="text-lg mb-4">
        이 서비스를 이용함으로써 사용자는 아래의 이용약관에 동의하는 것으로 간주됩니다. 이에 따라 이용자는 서비스 이용 전에 아래의 약관을 주의 깊게 읽어보시기 바랍니다.
      </p>
      <h2 className="text-2xl font-bold mb-2">1. 서비스 이용</h2>
      <p className="mb-4">
        이 서비스를 이용함으로써 사용자는 서비스 내에서 제공되는 기능을 적법하게 사용할 것을 동의합니다. 서비스 이용 시에는 관련 법령과 이용약관을 준수하여야 합니다.
      </p>
      <h2 className="text-2xl font-bold mb-2">2. 회원가입 및 개인정보 보호</h2>
      <p className="mb-4">
        서비스를 이용하기 위해 회원가입이 필요할 수 있습니다. 이 경우 사용자는 본인의 실명과 정확한 정보를 제공하여야 하며, 개인정보 보호를 위해 비밀번호를 안전하게 관리하여야 합니다.
      </p>
      <h2 className="text-2xl font-bold mb-2">3. 책임 제한</h2>
      <p className="mb-4">
        이용자는 서비스를 이용함으로써 발생하는 일체의 손해에 대해 풋살장 예약 사이트를 책임지지 않습니다. 또한, 서비스 이용 과정에서 발생하는 정보의 손실 또는 파괴에 대해서도 책임을 지지 않습니다.
      </p>
      <h2 className="text-2xl font-bold mb-2">4. 서비스 제공의 중단</h2>
      <p className="mb-4">
        풋살장 예약 사이트는 사전 공지 없이 서비스를 일시적으로 중단할 수 있습니다. 이 경우 풋살장 예약 사이트는 관련 사용자에게 사전에 통지할 수 있으며, 이에 따른 손해에 대해서는 책임을 지지 않습니다.
      </p>
      <h2 className="text-2xl font-bold mb-2">5. 이용약관 변경</h2>
      <p className="mb-4">
        풋살장 예약 사이트는 필요한 경우 이용약관을 변경할 수 있습니다. 변경된 약관은 서비스 내에 공지되며, 변경된 약관에 동의하지 않는 사용자는 서비스 이용을 중단할 수 있습니다.
      </p>
      <h2 className="text-2xl font-bold mb-2">6. 분쟁 해결</h2>
      <p className="mb-4">
        서비스 이용과 관련하여 분쟁이 발생한 경우, 풋살장 예약 사이트와 이용자 간에 원만하게 해결하기 위해 노력할 것입니다.
      </p>
    </div>
    <Footer /> {/* 푸터 추가 */}
    </>
  );
};

export default TermsOfServicePage;
