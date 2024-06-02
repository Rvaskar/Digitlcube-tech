import React from "react";
import UserNavbar from "../../components/user/UserNavbar";
import { Outlet } from "react-router-dom";

const UserHome = () => {
  return (
    <div>
      <UserNavbar />
      <Outlet />
    </div>
  );
};

export default UserHome;
