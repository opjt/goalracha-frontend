import { useParams } from "react-router-dom";
import ModifyComponent from "../../components/board/ModifyComponent";

const ModifyPage = () => {
  const { bno } = useParams();

  return (
    <div className="p-4 w-full bg-white">
      <div className="text-3xl font-extrabold">공지사항을 수정해주세요.</div>
      <ModifyComponent bno={bno} />
    </div>
  );
};
export default ModifyPage;
