import { useState } from "react";
import { postAdd } from "../../api/boardApi";
import ResultModal from "../common/Result2Modal";
import useCustomMove from "../../hooks/useCustomMove";

const initState = {
  title: "",
  content: "",
  createDate: "",
};

const AddComponent = () => {
  const [board, setBoard] = useState({ ...initState });

  const [result, setResult] = useState(null);

  const { moveToList } = useCustomMove()

  // `setErrors` 함수를 여기서 정의
  const setErrors = (errors) => {
    // 오류 상태를 설정하는 구현
  };

  const handleChangeBoard = (e) => {
    board[e.target.name] = e.target.value; 
    setBoard({ ...board}); // Updated spread syntax
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
    moveToList()
  };

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      {result ? 
        <ResultModal
          title={"Add Result"}
          content={`New ${result} Added`}
          callbackFn={closeModal}
        /> : <></>}

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">제목</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-
  neutral-500 shadow-md"
            name="title"
            type={"text"}
            value={board.title}
            onChange={handleChangeBoard}
          ></input>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">내용</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-
  neutral-500 shadow-md"
            name="content"
            type={"text"}
            value={board.content}
            onChange={handleChangeBoard}
          ></input>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">작성일시</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-
  neutral-500 shadow-md"
            name="createDate"
            type={"date"}
            value={board.createDate}
            onChange={handleChangeBoard}
          ></input>
        </div>
      </div>

      <div className="flex justify-end">
        <div className="relative mb-4 flex p-4 flex-wrap items-stretch">
          <button
            type="button"
            className="rounded p-4 w-36 bg-blue-500 text-xl text-white "
            onClick={handleClickAdd}
          >
            등록하기
          </button>
        </div>
      </div>
    </div>
  );
};
export default AddComponent;
