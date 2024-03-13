import { useParams } from "react-router-dom";
import ReadComponent from "../../components/board/ReadComponent";
import React from "react";

const ReadPage = () => {
  const { bno } = useParams();

  return (
    <div className="font-extrabold w-full bg-white mt-6">
      <div className="text-2xl ">공지사항 상세페이지입니다.</div>
      <ReadComponent bno={bno}></ReadComponent>
    </div>
  );
};

export default ReadPage;
