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
  const [expandedBno, setExpandedBno] = useState(null);

  useEffect(() => {
    getList({ page, size }).then((data) => {
      console.log(data);
      // 시분초를 제외하고 년-월-일 형식으로 변환
      const modifiedData = data.map((item) => ({
        ...item,
        createDate: item.createDate.split("T")[0], // "YYYY-MM-DD" 형식으로 변환
      }));
      setServerData(modifiedData);
    });
  }, [page, size, refresh]);

  const handleTitleClick = (bno) => {
    setExpandedBno((prevExpandedBno) => (prevExpandedBno === bno ? null : bno));
  };

  return (
    <div className="rounded border-2 border-100 mt-10 mr-2 ml-2">
      {serverData.map((board) => (
        <div key={board.bno} className="collapse border border-base-300 bg-base-200">
          <div className="collapse-title text-xl font-medium" onClick={() => handleTitleClick(board.bno)}>
            {board.title}
          </div>
          {expandedBno === board.bno && (
            <div className="collapse-content" style={{ display: "block" }}>
              <h3 className="text-xl font-bold">{board.title}</h3>
              <p>{board.content}</p>
            </div>
          )}
        </div>
      ))}
    </div>

  );
};

export default ListComponent;