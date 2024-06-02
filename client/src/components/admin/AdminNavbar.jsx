import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import AdminContext from "../../contexts/AdminContext";

const AdminNavbar = () => {
  let { loggedIn } = useContext(AdminContext);
  let navigate = useNavigate();

  let handleLogout = () => {
    localStorage.removeItem("admin-token");
    navigate("/admin/login");
  };

  return (
    <nav>
      <div className="nav-logo">Navbar logo</div>
      <div className="nav-route">
        <ul>
          <NavLink to={"/admin/admin-dashboard"}>Home</NavLink>
          <NavLink to={"/admin/manage-user"}>Users</NavLink>
          <NavLink to={"/admin/report-page"}>Report</NavLink>
        </ul>
      </div>
      <div className="nav-auth">
        {loggedIn ? (
          <>
            <NavLink to={"user-profile"}>Profile</NavLink>
            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link to={"/admin/login"}>Login</Link>
        )}
      </div>
    </nav>
  );
};

export default AdminNavbar;
