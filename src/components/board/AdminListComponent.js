import React, { useEffect, useState } from "react";
import { getList } from "../../api/boardApi";
import useCustomMove from "../../hooks/useCustomMoveboard";
import { useNavigate } from "react-router-dom";

const initState = [];

const AdminListComponent = () => {
  const navigate = useNavigate();
  const { page, size, refresh } = useCustomMove();
  const [serverData, setServerData] = useState(initState);

  useEffect(() => {
    getList({ page, size }).then((data) => {
      setServerData(data.map(board => ({ ...board})));
    });
  }, [page, size, refresh]);

  const handleTitleClick = (bno) => {
    navigate(`${bno}`);
  };

  const handleClickPlus = () => {
    navigate(`add`);
  };

  return (
    <div className="rounded border-2 border-100 mt-10 mr-2 ml-2 p-4">
      <div className="overflow-x-auto mb-8 max-w-full">
        
        <table className="mx-auto border-collapse min-w-full">
          <tbody>
            {serverData.map((board) => (
              <tr
                key={board.bno}
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => handleTitleClick(board.bno)}
                style={{ borderBottom: "1px solid #000" }} 
              >
                <td className="p-8 border-none"> {/* 테두리 없음 */}
                  <div className="text-lg font-medium">📌&nbsp;&nbsp;&nbsp;{board.title}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  
      <div className="flex justify-end mt-4">
        <div className="relative flex p-4 flex-wrap items-stretch">
          <button className="btn" onClick={handleClickPlus}>
            작성하기
          </button>
        </div>
      </div>
    </div>
  );
  


};

export default AdminListComponent;
