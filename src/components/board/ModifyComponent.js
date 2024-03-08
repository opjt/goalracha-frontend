import { useEffect, useState } from "react";
import { deleteOne, getOne, putOne } from "../../api/boardApi";
import { data } from "autoprefixer";
import useCustomMove from "../../hooks/useCustomMove";

const initState = {
  title: "",
  content: "",
  createDate: "",
};

const ModifyComponent = ({ bno, moveList, moveRead }) => {
  const [board, setBoard] = useState({ ...initState });

  const [result, setResult] = useState(null);

  const { moveToList } = useCustomMove()

  useEffect(() => { 
    getOne(bno).then((data) => setBoard(data));
  }, [bno]);

  const hanleClickModify = () => {
    putOne(board).then((data) => {
      console.log("modify result : " + data);
    });
  };

  const handleClickDelete = () => {
    deleteOne(bno).then((data) => {
      console.log("delet result : " + data);
    });
  };

  const handleChangeBoard = (e) => {
    board[e.target.name] = e.target.value;
    setBoard({ ...board });
  };
  const handleChangeBoardComplete = (e) => {
    const value = e.target.value;
    board.complete = value === "Y";
    setBoard({ ...board });
  };
  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      <div className="flex justify-center mt-10">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">BNO</div>
          <div
            className="w-4/5 p-6 rounded-r border border-solid shadow-md bg-gray-100"
          >
            {board.bno}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">제목</div>
          <div
            className="w-4/5 p-6 rounded-r border border-solid shadow-md bg-gray-100"
          >
            {board.title}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">내용</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="title"
            type={"text"}
            value={board.content}
            onChange={handleChangeBoard}
          ></input>
        </div>
        <div className="flex justify-end p-4">
          <button
            type="button"
            className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-red-500"
            onClick={handleClickDelete}
          >
            삭제하기
          </button>
          <button
            type="button"
            className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
            onClick={hanleClickModify}
          >
            수정하기
          </button>
        </div>
      </div>
    </div>
  );
};
export default ModifyComponent;
