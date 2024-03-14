import { useParams } from "react-router-dom";
import ModifyComponent from "../../components/board/ModifyComponent";

const ModifyPage = () => {
  const { bno } = useParams();

  return (
    <div className="font-bold w-full bg-white mt-6 p-8 rounded-lg shadow-lg">
      <div className="text-3xl mb-4 flex items-center">
        <span className="mr-2">&nbsp;&nbsp;&nbsp;💌</span>&nbsp;&nbsp;공지사항 수정페이지
      </div>
      <ModifyComponent bno={bno}></ModifyComponent>
    </div>
  );
};

export default ModifyPage;
