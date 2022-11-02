import React from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBSidebarFooter,
  CDBAnimation,
} from "cdbreact";
import { NavLink } from "react-router-dom";
const StudentSideBar = () => {
  return (
    <CDBSidebar>
      <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
        MenuBar
      </CDBSidebarHeader>
      <CDBSidebarContent>
        <CDBSidebarMenu>
          <NavLink to="/studentRoutes/">
            <CDBSidebarMenuItem icon="th-large">Profile</CDBSidebarMenuItem>
          </NavLink>

          <NavLink to="/studentRoutes/markAttendence">
            <CDBSidebarMenuItem icon="sticky-note">
              Mark Attendence
            </CDBSidebarMenuItem>
          </NavLink>

          <NavLink to="/studentRoutes/viewAttendence">
            <CDBSidebarMenuItem icon="credit-card" iconType="solid">
              ViewAttendance
            </CDBSidebarMenuItem>
          </NavLink>
          <NavLink to="/studentRoutes/leaveRequest">
            <CDBSidebarMenuItem icon="credit-card" iconType="solid">
              Leave Request
            </CDBSidebarMenuItem>
          </NavLink>
          <NavLink to="/studentLogout">
            <CDBSidebarMenuItem icon="credit-card" iconType="solid">
              Logout
            </CDBSidebarMenuItem>
          </NavLink>
        </CDBSidebarMenu>
      </CDBSidebarContent>

      <CDBSidebarFooter style={{ textAlign: "center" }}>
        <CDBAnimation type="flash" infinite>
          <div
            className="sidebar-btn-wrapper fs-3"
            style={{ padding: "20px 5px" }}
          >
            Attendence Managment System
          </div>
        </CDBAnimation>
      </CDBSidebarFooter>
    </CDBSidebar>
  );
};

export default StudentSideBar;
