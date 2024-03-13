import React, { useEffect, useState } from "react";
import { getList } from "../../api/boardApi";
import useCustomMove from "../../hooks/useCustomMoveboard";
import { useNavigate } from "react-router-dom";

const initState = [];

const ListComponent = () => {
  const navigate = useNavigate();
  const { page, size, refresh } = useCustomMove();
  const [serverData, setServerData] = useState(initState);

  useEffect(() => {
    getList({ page, size }).then((data) => {
      setServerData(data.map(board => ({ ...board})));
    });
  }, [page, size, refresh]);

  const handleTitleClick = (bno) => {
    navigate(`/board/read/${bno}`);
  };

  const handleClickPlus = () => {
    navigate(`/board/add`);
  };

  return (
    <div className="rounded border-2 border-100 mt-10 mr-2 ml-2">
      
      <div className="flex flex-wrap mx-auto justify-center p-6">
        {serverData.map((board) => (
          <div
            key={board.bno}
            className="w-full min-w-[400px] p-2 m-2 rounded shadow-md"
            onClick={() => handleTitleClick(board.bno)}
          >
            <div className="flex items-center">
              <div className="text-1xl m-1 p-2 w-6/12 font-extrabold ml-10"> {/* ml-2 클래스 추가 */}
                {board.title}
              </div>
            </div>
          </div>
        ))}
      </div>


      <div className="flex justify-end">
        <div className="relative mb-4 flex p-4 flex-wrap items-stretch">
          <button class="btn" onClick={handleClickPlus}>
            작성하기
          </button>
        </div>
      </div>
    </div>
  );  
  
};

export default ListComponent;
