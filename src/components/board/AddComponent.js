import { useState } from "react";
import { postAdd } from "../../api/boardApi";
import ResultModal from "../common/Result2Modal";
import useCustomMove from "../../hooks/useCustomMoveboard";

const initState = {
  title: "",
  content: "",
  createdate: null,
};

const AddComponent = () => {
  const [board, setBoard] = useState({ ...initState });

  const [result, setResult] = useState(null);

  const { moveToList } = useCustomMove();

  // `setErrors` 함수를 여기서 정의
  const setErrors = (errors) => {
    // 오류 상태를 설정하는 구현
  };

  const handleChangeBoard = (e) => {
    board[e.target.name] = e.target.value;
    setBoard({ ...board }); // Updated spread syntax
    setErrors({}); // 변경 시 오류 지우기
  };

  const handleClickAdd = () => {
    board.uno = 1;
    postAdd(board)
      .then((result) => {
        console.log(result);
        setResult(result.BNO);
        setBoard({ ...initState });
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const closeModal = () => {
    setResult(null);
    moveToList();
  };

  return (
    <div className="rounded border-2 border-100 mt-10 m-2 p-4">
      {result ? (
        <ResultModal
          title={"처리완료"}
          content={"등록완료"}
          callbackFn={closeModal}
          close={"확인"}
        />
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

      <div className="flex justify-end">
        <div className="relative mb-4 flex p-4 flex-wrap items-stretch">
          <button class="btn" onClick={handleClickAdd}>
            등록하기
          </button>
        </div>
      </div>
    </div>
  );
};
export default AddComponent;
