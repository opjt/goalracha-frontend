import { useEffect, useState } from "react";
import { deleteOne, getOne, putOne } from "../../api/boardApi";
import useCustomMove from "../../hooks/useCustomMoveboard";
import ResultModal from "../common/ResultModal";

const initState = {
  title: "",
  content: "",
  createdate: null,
};

const ModifyComponent = ({ bno }) => {
  const [board, setBoard] = useState({ ...initState });
  //모달 창을 위한 상태
  const [result, setResult] = useState(null);
  //이동을 위한 기능들
  const { moveToList, moveToRead } = useCustomMove();
  useEffect(() => {
    getOne(bno).then((data) => setBoard(data));
  }, [bno]);

  const handleClickModify = () => {
    // 수정 버튼 클릭시
    putOne(board).then((data) => {
      //console.log("modify result: " + data)
      setResult("수정완료");
    });
  };
  const handleClickDelete = () => {
    // 삭제 버튼 클릭시
    deleteOne(bno).then((data) => {
      //console.log("delete result: " + data)
      setResult("삭제완료");
    });
  };
  //모달 창이 close될때
  const closeModal = () => {
    if (result === "삭제완료") {
      moveToList();
    } else {
      moveToRead(bno);
    }
  };
  const handleChangeBoard = (e) => {
    board[e.target.name] = e.target.value;
    setBoard({ ...board });
  };

  return (
    <div className="rounded border-2 border-100 mt-10 m-2 p-4">
      {result ? (
        <ResultModal
          title={"처리결과"}
          content={result}
          callbackFn={closeModal}
        ></ResultModal>
      ) : (
        <></>
      )}

      <input
        type="text"
        placeholder="제목을 입력해주세요."
        className="input input-bordered w-full max-w-l mb-4 text-lg" // text-lg 클래스 추가: 폰트 크기를 크게 설정합니다.
        name="title"
        value={board.title}
        onChange={handleChangeBoard}
      />

      <textarea
        placeholder="내용을 입력해주세요."
        className="textarea textarea-bordered w-full max-w-l mb-4 text-lg h-64" // h-48 클래스 추가: 높이를 48픽셀로 설정합니다.
        name="content"
        value={board.content}
        onChange={handleChangeBoard}
      />

      <div className="flex justify-end p-4">
        <div className="relative mb-4 flex p-4 flex-wrap items-stretch">
          <button className="btn mr-2" onClick={handleClickDelete}>
            {" "}
            {/* 삭제하기 버튼 */}
            삭제하기
          </button>
          <button className="btn" onClick={handleClickModify}>
            {" "}
            {/* 수정하기 버튼 */}
            수정등록
          </button>
        </div>
      </div>
    </div>
  );
};
export default ModifyComponent;
