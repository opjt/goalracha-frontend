import { useEffect, useState } from "react";
import { getOne } from "../../api/boardApi";
import useCustomMove from "../../hooks/useCustomMoveboard";

const initState = {
  title: "", // 제목, 초기값으로 빈 문자열 또는 원하는 값 설정
  content: "", // 내용, 초기값으로 빈 문자열 또는 원하는 값 설정
  createdate : null
};

const ReadComponent = ({ bno }) => {
  const [board, setBoard] = useState(initState); // 아직 board는 사용하지 않음
  const { moveToList, moveToModify } = useCustomMove();

  useEffect(() => {
    getOne(bno).then((data) => {
      console.log(data);
      setBoard(data);
    });
  }, [bno]);

  return (
    <div className="rounded border-2 border-100 mt-10 m-2 p-4 ">
      {makeDiv("제목", board.title)}
      {makeDiv("글 내용", board.content)}

      <div className="flex justify-end p-4">
        <button
          type="button"
          className="rounded p-4 m-2 text-xl w-32 text-white bg-gray-500"
          onClick={() => moveToList()}
        >
          뒤로가기
        </button>
        <button
          type="button"
          className="rounded p-4 m-2 text-xl w-32 text-white bg-gray-500"
          onClick={() => moveToModify(bno)}
        >
          글 수정
        </button>
      </div>
    </div>
  );
};
const makeDiv = (title, value) => (
  <div className="flex justify-center">
    <div className="relative mb-4 flex w-full flex-wrap items-stretch">
      <div className="w-1/5 p-6 text-right font-bold">{title}</div>
      <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
        {value}
      </div>
    </div>
  </div>
);
export default ReadComponent;
