import { getOwnerGroundList, getOwnerGroundListSearch } from "api/groundApi";
import PageComponent from "components/common/pagination";
import useCustomMove from "hooks/groundCustomMove";
import React, { useEffect, useState } from "react";
import useCustomLogin from "hooks/useCustomLogin";

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
  searchName: "",
};

const GroundListPage = ({ groundList }) => {
  const { page, size, moveToPage, moveToRead, moveToRegister } =
    useCustomMove();
  const [serverData, setServerData] = useState(initState);
  const { loginState } = useCustomLogin();
  const [searchName, setSearchName] = useState("");

  // // 구장리스트 값 호출
  // useEffect(() => {
  //   getGroundList({ page, size }).then((data) => {
  //     if(searchName) {
  //       getOwnerGroundListSearch({ page, size }, loginState.uNo, searchName).then((date) => {
  //         setServerData(data);
  //       })
  //     }
  //   getOwnerGroundList({ page, size },loginState.uNo).then((data) => {
  //       setServerData(data);
  //       })
  //   });
  // }, [page, size]);

  // 구장리스트 호출 로그인 스테이트의 유저값을 받아옴
  useEffect(() => {
    if (searchName) { // 검색어가 있을 때
      getOwnerGroundListSearch({ page, size }, loginState.uNo, searchName).then(
        (data) => {
          setServerData(data);
        }
      );
    } else {  // 없을 때 전체 리스트
      getOwnerGroundList({ page, size }, loginState.uNo).then((data) => {
        setServerData(data);
      });
    }
  }, [page, size, searchName, loginState.uNo]);

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

  const formatRevenue = (value) => {
    return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(value);
};

  return (
    <div className="flex w-full h-full">
      <div className="w-full">
        <div className="flex items-center">
          <label className="input input-bordered flex items-center gap-2 w-full h-10 flex-grow">
            <input
              type="text"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              placeholder="구장명 입력"
              className="grow"
            />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
          </label>
        </div>
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
            <div className="">
              <div className="flex-grow"></div>
              {serverData.dtoList.map((ground) => (
                <div
                  key={ground.gno}
                  className="border-b-[1px] border-gary-200 p-3 flex justify-between cursor-pointer"
                  onClick={() => moveToRead(ground.gno)}
                >
                  <div className="flex flex-col flex-1 min-w-0 whitespace-nowrap ">
                    <div className="text-base font-semibold text-ellipsis overflow-hidden">
                      {ground.name}
                    </div>
                    <div className="text-sm text-gray-500">{ground.addr}</div>
                    <div className="text-sm text-gray-500">
                      {ground.recommdMan}
                    </div>
                  </div>
                  <di className="flex justify-between w-1/5 min-w-36 items-center text-sm">
                    <div className="">{formatRevenue(ground.fare)}</div>
                    <div
                      className={
                        "text-nowrap " + stateColorMapping[ground.state]
                      }
                    >
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
