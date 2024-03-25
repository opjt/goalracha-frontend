import BasicLayout from "../../layouts/BasicLayout";
import UserListComponent from "../../components/board/UserListComponent";
const UserListPage = () => {
  return (
    <>
      <div className="font-extrabold w-full bg-white mt-6 p-8 rounded-lg shadow-lg mb-2">
        <div className="text-3xl mb-4 flex items-center">
          <span className="mr-2">&nbsp;&nbsp;&nbsp;⚽️</span>&nbsp;&nbsp;골라차의 공지사항을 안내해드려요
        </div>
        <UserListComponent />
      </div>
    </>
  );
};
export default UserListPage;
