import { getGroundList } from "api/groundApi";
import PageComponent from "components/common/PageComponent";
import useCustomMove from "hooks/groundCustomMove";
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

const GroundListPage = ({ groundList }) => {
  const { page, size, moveToPage, moveToRead, moveToRegister } =
    useCustomMove();
  const [serverData, setServerData] = useState(initState);

  // 구장리스트 값 호출
  useEffect(() => {
    // 패이지 네이션
    getGroundList({ page, size }).then((data) => {
      setServerData(data);
    });
  }, [page, size]);

  // 구장 상태 매핑
  const stateMapping = {
    0: "삭제된 구장입니다",
    1: "등록신청",
    2: "오픈",
    3: "준비중",
    4: "폐업",
  };

  // 구장 상태에 따른 텍스트 컬러
  const stateColorMapping = {
    0: "text-red-500",
    1: "text-yellow-500",
    2: "text-green-500",
    3: "text-yellow-500",
    4: "text-red-500",
  };

  return (
    <div className="flex w-full h-full">
      <div className="p-4 w-full">
        <div className="text-3xl font-extrabold font-sans mb-8">구장 목록</div>
        {serverData.dtoList.length === 0 ? (
          <div className="text-xl font-bold text-gray-600 mt-4">
            등록된 구장이 없습니다.
            <div className="float-right right-5 mt-2">
              <button
                className="btn btn-active btn-neutral "
                onClick={moveToRegister}
              >
                등록
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="text-3xl font-extrabold">
              {serverData.dtoList.map((ground) => (
                <div
                  key={ground.gno}
                  className="border-b-[1px] border-gary-200 p-3 flex justify-between cursor-pointer"
                  onClick={() => moveToRead(ground.gno)}
                >
                  <div className="flex flex-col flex-1 min-w-0 whitespace-nowrap ">
                    <div className="text-md text-ellipsis overflow-hidden">
                      {ground.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {ground.addr}
                      </div>
                    <div className="text-sm text-gray-500">
                      {ground.recommdMan}
                    </div>
                  </div>
                  <di className="flex justify-between w-1/5 min-w-36 items-center text-sm">
                    <div className="">{ground.fare}</div>
                    <div className={"text-nowrap " + stateColorMapping[ground.state]}>
                      {stateMapping[ground.state] || "상태 정보 없음"}
                    </div>
                    <div className="">{ground.width}</div>
                  </di>
                </div>
              ))}
            </div>
            <div className="float-right right-5 mt-2">
              <button
                className="btn btn-active btn-neutral "
                onClick={moveToRegister}
              >
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
