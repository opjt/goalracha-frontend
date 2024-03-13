import React, { useEffect, useState } from "react";
import { getList } from "../../api/boardApi";
import useCustomMove from "../../hooks/useCustomMoveboard";
import { useNavigate } from "react-router-dom";

const initState = [];

const ListComponent = () => {
  const navigate = useNavigate();
  const { page, size, refresh } = useCustomMove();
  const [serverData, setServerData] = useState(initState);
  const [expandedBno, setExpandedBno] = useState(null);

  useEffect(() => {
    getList({ page, size }).then((data) => {
      setServerData(data.map((board) => ({ ...board })));
      console.log(serverData)
    });
  }, [page, size, refresh]);

  const handleTitleClick = (bno) => {
    setExpandedBno((prevExpandedBno) => (prevExpandedBno === bno ? null : bno));
  };

  return (
    <div className="rounded border-0 border-100 mt-10 mr-2 ml-2">
      {serverData.map((board) => (
        <div key={board.bno}>
          <div className="collapse bg-base-200 mb-4">
            <input
              type="checkbox"
              id={`board-${board.bno}`}
              className="collapse-toggle"
            />
            <div
              className="collapse-title text-xl font-medium"
              onClick={() => handleTitleClick(board.bno)}
            >
              {board.title}
            </div>
            <div
              className={`collapse-content ${expandedBno === board.bno ? "collapse-content-active" : ""}`}
            >
              <p>{board.content}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListComponent;
