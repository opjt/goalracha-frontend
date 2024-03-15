import { useParams } from "react-router-dom";
import ReadComponent from "../../components/board/ReadComponent";
import React from "react";

const ReadPage = () => {
  const { bno } = useParams();

  return (
    <div className="font-extrabold w-full bg-white mt-6 p-8 rounded-lg shadow-lg">
      <div className="text-3xl mb-4 flex items-center">
        <span className="mr-2">&nbsp;&nbsp;&nbsp;📖</span>&nbsp;&nbsp;공지사항 상세페이지
      </div>
      <ReadComponent bno={bno}></ReadComponent>
    </div>
  );
};

export default ReadPage;
