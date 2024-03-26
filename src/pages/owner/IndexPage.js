import { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import BasicLayout from "layouts/OwnerLayout";
import useCustomLogin from "hooks/useCustomLogin";

const GroundIndexPage = () => {
  useEffect(() => {});

  const { isLogin, isOwnerLogin, moveToOwnerLoginReturn } = useCustomLogin();
  
  if (!isLogin) {
    alert("사업자회원만 사용가능한 페이지입니다.")
    return moveToOwnerLoginReturn();
  }

  if (!isOwnerLogin) {
    alert("사업자회원만 사용가능한 페이지입니다.")
    return <Navigate to="/reserve" replace />;
  }


  return (
    <BasicLayout>
      <Outlet />
    </BasicLayout>
  );
};

export default GroundIndexPage;