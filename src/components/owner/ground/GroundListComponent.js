import { getGroundList } from "api/groundApi";
import PageComponent from "components/member/common/PageComponent";
import useCustomMove from "hooks/useCustomMoveboard";
import React, { useEffect, useState } from "react";

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

const GroundList = ({ groundList }) => {
  const { page, size, moveToList, moveToRead } = useCustomMove();

  const [serverData, setServerData] = useState(initState);

  useEffect(() => {
    getGroundList({ page, size }).then((data) => {
      console.log(data);
      setServerData(data);
    });
  }, [page, size]);

  return (

  <div>
    <div className="p-4 w-full bg-white">
    <div className="text-3xl font-extrabold font-sans">구장 목록</div>
      <div className="text-3xl font-extrabold">
        {serverData.dtoList.map((ground) => (
          <div
            key={ground.gno}
            className="w-full min-w-[400px] p-2 m-2 rounded shadow-md"
          >
            <div className="flex ">
              <div className="text-base p-2 w-2/12 font-sans">
                {ground.name}
              </div>
              <div className="text-base m-1 p-2 w-8/12 font-sans">
                {ground.addr}
              </div>
              <div className="text-base m-1 p-2 w-2/10 font-sans">
                {ground.fare}
              </div>
              <div className="text-base m-1 p-2 w-2/10 font-sans">
                {ground.state}
              </div>
              <div className="text-base m-1 p-2 w-2/10 font-sans">
                {ground.recommdMan}
              </div>
              <div className="text-base m-1 p-2 w-2/10 font-sans">
                {ground.width}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="float-right right-5 mt-2">
          <button className="btn btnn-active btn-primary">
            등록
          </button>
        </div>
      <div>
        <PageComponent
          serverData={serverData}
          movePage={moveToList}
        ></PageComponent>
      </div>
    </div>
    </div>
  );
};

export default GroundList;
