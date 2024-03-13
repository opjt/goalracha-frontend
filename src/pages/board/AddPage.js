// 공지사항 작성페이지

import AddComponent from "../../components/board/AddComponent";

const AddPage = () => {
  return (
    <div className="p-4 w-full bg-white">
      <div className="text-3xl font-extrabold">공지사항을 작성해주세요.</div>
      <AddComponent />
    </div>
  );
};
export default AddPage;
