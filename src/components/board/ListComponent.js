import React, { useEffect, useState } from "react";
import { getList } from "../../api/boardApi";
import useCustomMove from "../../hooks/useCustomMoveboard";
import { useNavigate } from "react-router-dom";

const initState = [
];

const ListComponent = () => {
  const navigate = useNavigate();
  const { page, size, refresh } = useCustomMove();
  const [serverData, setServerData] = useState(initState);
  const [expandedItems, setExpandedItems] = useState({}); // 상태 관리 추가

  useEffect(() => {
    getList({ page, size }).then((data) => {
      setServerData(data.map(board => ({ ...board })));
    });
  }, [page, size, refresh]);

  const handleTitleClick = (bno) => {
    setExpandedItems(prevExpanded => ({ 
      ...prevExpanded, 
      [bno]: !prevExpanded[bno] // 현재 상태를 토글
    }));
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
              <div className="text-1xl m-1 p-2 w-6/12 font-extrabold">{board.title}</div>
            </div>
            {expandedItems[board.bno] && ( // 조건부 렌더링
                <div className="p-2"> 
                  {board.content} 
                </div>
            )} 
          </div>
        ))}
      </div>
      {/* ... 생략 */}
    </div>
  );
};

export default ListComponent;
