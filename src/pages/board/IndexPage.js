// 상단 바

import { Outlet, useNavigate } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";
import { useCallback } from "react";

const IndexPage = () => {
  const navigate = useNavigate();
  const handleClickList = useCallback(() => {
    navigate({ pathname: "list" });
  });
  const handleClickAdd = useCallback(() => {
    navigate({ pathname: "add" });
  });
  return (
    <BasicLayout>
      <div className="w-full flex m-2 p-2 ">
        <div
          className="text-xl m-1 p-2 w-20 font-extrabold text-center"
          onClick={handleClickList}
        >
          공지리스트
        </div>
        <div
          className="text-xl m-1 p-2 w-20 font-extrabold text-center"
          onClick={handleClickAdd}
        >
          공지작성
        </div>
      </div>
      <div className="flex flex-wrap w-full">
        <Outlet />
      </div>
    </BasicLayout>
  )
}
export default IndexPage;
