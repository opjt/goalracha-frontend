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

      <div className="flex justify-center mt-10">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">BNO</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md bg-gray-100">
            {board.bno}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">제목</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
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
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="content"
            type="text"
            defaultValue={board.content}
            onChange={handleChangeBoard}
          />
        </div>
      </div>
      <div className="flex justify-end p-4">
        <button
          type="button"
          className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-gray-500"
          onClick={handleClickDelete}
        >
          삭제하기
        </button>

        



        <button
          type="button"
          className="rounded p-4 m-2 text-xl w-32 text-white bg-gray-500"
          onClick={handleClickModify}
        >
          수정하기
        </button>
      </div>
    </div>
  );
};
export default ModifyComponent;
