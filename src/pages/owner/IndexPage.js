import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import BasicLayout from "layouts/OwnerLayout";
const GroundIndexPage = () => {
  useEffect(() => {});
  return (
      <BasicLayout>
        <Outlet />
      </BasicLayout>
  );
};
export default GroundIndexPage;
