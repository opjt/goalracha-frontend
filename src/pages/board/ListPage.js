// 페이지네이션

import ListComponent from "../../components/board/ListComponent1";
const ListPage = () => {
  return (
    <div className="font-extrabold w-full bg-white mt-6 p-8 rounded-lg shadow-lg">
    <div className="text-3xl mb-4 flex items-center">
      <span className="mr-2">&nbsp;&nbsp;&nbsp;📢</span>&nbsp;&nbsp;골라차의 관리자 공지페이지입니다
    </div>
    <ListComponent />
  </div>
  );
};
export default ListPage;
