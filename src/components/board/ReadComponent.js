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

  return (
    <div className="rounded border-2 border-100 mt-10 m-2 p-4 ">
      {makeDiv("", board.title)}
      {makeDiv("", board.content)}







      <div className="flex justify-end p-4">
        <div className="relative mb-4 flex p-4 flex-wrap items-stretch">
          <button className="btn mr-2" onClick={() => moveToList()}>
            {" "}
            뒤로가기
            
          </button>
          <button className="btn" onClick={() => moveToModify(bno)}>
            {" "}
            {/* 수정하기 버튼 */}
            수정하기
          </button>
        </div>
      </div>
    </div>



      
  );
};


export default ReadComponent;
