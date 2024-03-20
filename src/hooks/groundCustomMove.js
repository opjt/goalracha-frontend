import { useState } from "react";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom"

const getNum = (param, defaultValue) => {
  if (!param) {
    return defaultValue;
  }

  return parseInt(param);
};

const useCustomMove = () => {

  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);

  const [queryParams] = useSearchParams();

  const page = getNum(queryParams.get("page"), 1);
  const size = getNum(queryParams.get("size"), 10);
  
  const queryDefault = createSearchParams({ page, size }).toString();

  const moveToList = (pageParam) => {
    let queryStr = "";
    if (pageParam) {
      const pageNum = getNum(pageParam.page, page);
      const sizeNum = getNum(pageParam.size, size);
      queryStr = createSearchParams({
        page: pageNum,
        size: sizeNum,
      }).toString();
    } else {
      queryStr = queryDefault;
    }
    navigate({
      pathname: `../../ground/`,
      search: queryStr,
    });
    setRefresh(!refresh); //추가
    
  };

  const moveToPage = (pageParam) => {
    let queryStr = "";
    if (pageParam) {
      const pageNum = getNum(pageParam.page, page);
      const sizeNum = getNum(pageParam.size, size);
      queryStr = createSearchParams({
        page: pageNum,
        size: sizeNum,
      }).toString();
    } else {
      queryStr = queryDefault;
    }
    navigate({
      pathname: `../ground/`,
      search: queryStr,
    });
    setRefresh(!refresh); //추가
  };

  const moveToGroundList = (pageParam) => {
    let queryStr = "";
    if (pageParam) {
      const pageNum = getNum(pageParam.page, page);
      const sizeNum = getNum(pageParam.size, size);
      queryStr = createSearchParams({
        page: pageNum,
        size: sizeNum,
      }).toString();
    } else {
      queryStr = queryDefault;
    }
    navigate({
      pathname: `../`,
      search: queryStr,
    });
    setRefresh(!refresh); //추가
  };


  
  const moveToModify = (gno) => {
    console.log(queryDefault);
    navigate({
      pathname: `../modify/${gno}`,
      search: queryDefault, //수정시에 기존의 쿼리 스트링 유지를 위해
    });
  };

  
  const moveToRead = (num) => {
    console.log(queryDefault);
    navigate({
      pathname : `../ground/read/${num}`,
      search : queryDefault
    })
  };

  const moveToModifyRead = (num) => {
    console.log(queryDefault);
    navigate({
      pathname : `../../ground/read/${num}`,
      search : queryDefault
    })
  };

  const moveToRegister = () => {
    console.log(queryDefault);
    navigate({
      pathname : `../ground/register/`,
      search : queryDefault
    })
  };

  return { moveToList, moveToModify, moveToRead, moveToGroundList, moveToRegister, moveToModifyRead, moveToPage, page, size, refresh }; //refresh 추가
};
export default useCustomMove;
