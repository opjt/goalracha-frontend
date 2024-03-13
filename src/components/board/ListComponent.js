import React, { useEffect, useState } from "react";
import { getList } from "../../api/boardApi";
import useCustomMove from "../../hooks/useCustomMove";


const ListComponent = () => {
  const { page, size, refresh } = useCustomMove();

  const [serverData, setServerData] = useState([]);
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

  

  return (
    <div className="border-2 border-blue-100 mt-10 mr-2 ml-2">
      <div className="flex flex-wrap mx-auto justify-center p-6">
        {serverData.map((item) => (
          <div
            key={item.bno}
            className="w-full min-w-[400px] p-2 m-2 rounded shadow-md"
          >
            <div className="flex">
              <div className="font-extrabold text-2xl p-2 w-1/12">
                {/* 첫 번째 부분의 콘텐츠 */}
              </div>
              <div className="text-xl m-1 p-2 w-8 font-bold">{item.bno}</div>
              <div className="text-1xl m-1 p-2 w-8/12 font-extrabold">
                {item.title}
              </div>
              {item.createDate && ( // createDate가 존재하는 경우에만 렌더링
                <div className="text-1xl m-1 p-2 w-2/10 font-medium">
                  {item.createDate}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListComponent;
