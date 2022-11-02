import React from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBSidebarFooter,
} from "cdbreact";
import { NavLink } from "react-router-dom";
const AdminSideBar = () => {
  return (
    <CDBSidebar>
      <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
        MenuBar
      </CDBSidebarHeader>
      <CDBSidebarContent>
        <CDBSidebarMenu>
          <NavLink to="/adminRoutes/">
            <CDBSidebarMenuItem icon="th-large">Dashboard</CDBSidebarMenuItem>
          </NavLink>
          <NavLink to="/adminRoutes/reportAll">
            <CDBSidebarMenuItem icon="sticky-note">
              Attendence Report
            </CDBSidebarMenuItem>
          </NavLink>
          <NavLink to="/adminRoutes/leaveApproval">
            <CDBSidebarMenuItem icon="sticky-note">
              leave Approval
            </CDBSidebarMenuItem>
          </NavLink>
          <NavLink to="/adminRoutes/grades">
            <CDBSidebarMenuItem icon="credit-card" iconType="solid">
              Grades
            </CDBSidebarMenuItem>
          </NavLink>
          <NavLink to="/adminLogout">
            <CDBSidebarMenuItem icon="sticky-note" iconType="solid">
              Logout
            </CDBSidebarMenuItem>
          </NavLink>
        </CDBSidebarMenu>
      </CDBSidebarContent>

      <CDBSidebarFooter style={{ textAlign: "center" }}>
        <div
          className="sidebar-btn-wrapper fs-3"
          style={{ padding: "20px 5px" }}
        >
          Attendence Managment System
        </div>
      </CDBSidebarFooter>
    </CDBSidebar>
  );
};

export default AdminSideBar;
