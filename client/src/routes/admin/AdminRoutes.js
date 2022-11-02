import React from "react";
import { Outlet} from "react-router-dom";
import AdminSideBar from "../AdminSideBar";

const AdminRoutes = () => {
  return (
    <>
      <div className="d-flex">
        <div className="vh-100">
          <AdminSideBar />
        </div>
        <div className="vw-100">
          <Outlet/>
        </div>
      </div>
    </>
  );
};

export default AdminRoutes;
