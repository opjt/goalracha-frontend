

const WithdrawConfirmationModal = ({ isOpen, onClose, onConfirmWithdraw }) => {
  // 사용자가 확인을 누를 때의 동작
  const handleConfirmWithdraw = () => {
      onConfirmWithdraw(); // 실제 회원 탈퇴 함수 호출
      onClose(); // 모달 닫기
  };

  return (
      <div className={`modal ${isOpen ? 'is-active' : ''}`}>
          <div className="modal-background" onClick={onClose}></div>
          <div className="modal-content">
              <div className="box">
                  <p>정말 탈퇴하시겠습니까?</p>
              </div>
              {/* 확인 버튼 */}
              <button className="button is-danger" onClick={handleConfirmWithdraw}>확인</button>
          </div>
          <button className="modal-close is-large" aria-label="close" onClick={onClose}></button>
      </div>
  );
};

export default WithdrawConfirmationModal;


