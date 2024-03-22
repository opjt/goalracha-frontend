import { getGroundList } from "api/groundApi";
import PageComponent from "components/common/PageComponent";
import useCustomMove from "hooks/groundCustomMove";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const initState = {
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totoalCount: 0,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0,
};

const GroundListPage = ({ groundList }) => {
  const navigate = useNavigate();

  const { page, size, moveToPage, moveToRead, moveToRegister } = useCustomMove();

  const [serverData, setServerData] = useState(initState);

  useEffect(() => {
    getGroundList({ page, size }).then((data) => {
      console.log(data);
      setServerData(data);
    });
  }, [page, size]);

  return (
    <div>
      <div className="p-4 w-full h-80">
        <div className="text-3xl font-extrabold font-sans">구장 목록</div>
        {serverData.dtoList.length === 0 ? (
          <div className="text-xl font-bold text-gray-600 mt-4">등록된 구장이 없습니다.
          <div className="float-right right-5 mt-2">
              <button className="btn btn-active btn-neutral " onClick={moveToRegister}>
                등록
              </button>
            </div></div>
          
        ) : (
          <>
            <div className="text-3xl font-extrabold">
              {serverData.dtoList.map((ground) => (
                <div
                  key={ground.gno}
                  className="w-full min-w-[400px] p-2 m-2 rounded shadow-md"
                  onClick={() => moveToRead(ground.gno)}
                >
                  <div className="flex ">
                    <div className="flex-nowrap text-base m-1 min-w-28 w-2/12 font-sans">
                      {ground.name}
                    </div>
                    <div className="text-base m-1 min-w-80 w-2/12 font-sans">
                      {ground.addr}
                    </div>
                    <div className="text-base m-1 min-w-14 w-2/12 font-sans">
                      {ground.fare}
                    </div>
                    <div className="text-base m-1 min-w-2 w-2/12 font-sans">
                      {ground.state}
                    </div>
                    <div className="text-base m-1 min-w-10 w-2/12 font-sans">
                      {ground.recommdMan}
                    </div>
                    <div className="text-base m-1 min-w-12 font-sans">
                      {ground.width}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="float-right right-5 mt-2">
              <button className="btn btn-active btn-neutral " onClick={moveToRegister}>
                등록
              </button>
            </div>
            <div>
              <PageComponent
                serverData={serverData}
                movePage={moveToPage}
              ></PageComponent>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GroundListPage;
