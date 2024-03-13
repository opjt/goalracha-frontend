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
    <div className="p-4 w-full bg-white">
        <div className="text-3xl font-extrabold">
          {serverData.dtoList.map((ground) => (
            <div
              key={ground.gno}
              className="w-full min-w-[400px] p-2 m-2 rounded shadow-md"
            >
              <div className="flex ">
                <div className="font-extrabold text-2xl p-2 w-1/12">
                  {ground.name}
                </div>
                <div className="text-1xl m-1 p-2 w-8/12 font-extrabold">
                  {ground.addr}
                </div>
                <div className="text-1xl m-1 p-2 w-2/10 font-medium">
                  {ground.width}
                </div>
                <div className="text-1xl m-1 p-2 w-2/10 font-medium">
                  {ground.recommdMan}
                </div>
                <div className="text-1xl m-1 p-2 w-2/10 font-medium">
                  {ground.state}
                </div>
              </div>
            </div>
          ))}
        </div>
        <PageComponent serverData={serverData} movePage={moveToList}></PageComponent>
    </div>
  );
};

export default GroundList;
