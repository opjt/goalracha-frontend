// 공지사항 작성페이지

import AddComponent from "../../components/board/AddComponent";

const AddPage = () => {
  return (
    <div className="font-extrabold w-full bg-white mt-6 p-8 rounded-lg shadow-lg">
      <div className="text-3xl mb-4 flex items-center">
        <span className="mr-2">&nbsp;&nbsp;&nbsp;📝</span>&nbsp;&nbsp;공지사항을 작성해주세요
      </div>
      <AddComponent />
    </div>
  );
};
export default AddPage;
