// 페이지네이션

import ListComponent from "../../components/board/ListComponent";
const ListPage = () => {
  return (
    <div className="p-4 w-full bg-white">
      <div className="text-3xl font-extrabold">골라차의<br />공지사항 관리페이지입니다.</div>
      <ListComponent />
    </div>
  );
};
export default ListPage;
