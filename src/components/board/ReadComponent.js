import { useEffect, useState } from "react";
import { getOne } from "../../api/boardApi";
import useCustomMove from "../../hooks/useCustomMoveboard";

const initState = {
  title: "",
  content: "",
  createdate: null,
};

const ReadComponent = ({ bno }) => {
  const [board, setBoard] = useState(initState);
  const { moveToList, moveToModify } = useCustomMove();

  useEffect(() => {
    getOne(bno).then((data) => {
      console.log(data);
      setBoard(data);
    });
  }, [bno]);

  return (
    <div className="rounded border-2 border-100 mt-10 m-2 p-4" style={{ padding: '30px' }}>
      <h1 className="text-2xl font-bold">📌&nbsp;&nbsp;{board.title}</h1>

      <hr className="my-6 border-2 border-solid border-gray" />

      <div className="flex flex-col">
        <div className="flex justify-between">
          <span className="text-lg font-normal" style={{ whiteSpace: 'pre-wrap', paddingLeft: '20px' }}>{board.content}</span>
        </div>
      </div>

      <div className="flex justify-end p-4">
        <div className="relative mb-4 flex p-4 flex-wrap items-stretch">
          <button className="btn mr-2" onClick={() => moveToList()}>
            뒤로가기
          </button>
          <button className="btn" onClick={() => moveToModify(bno)}>
            수정하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReadComponent;
