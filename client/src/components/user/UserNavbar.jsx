import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./UserNav.css";
import AuthContext from "../../contexts/AuthContext";

const UserNavbar = () => {
  let navigate = useNavigate();
  let { loggedIn } = useContext(AuthContext);

  let handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/user/login");
  };

  return (
    <nav>
      <div className="nav-logo">Navbar Logo</div>
      <div className="nav-route">
        <ul>
          <NavLink to={"/user/user-dashboard"}>Home</NavLink>
          <NavLink to={"/user/product"}>Product</NavLink>
          <NavLink to={"/user/About"}>About</NavLink>
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
          <>
            <Link to={"/user/login"}>Login</Link>
            <Link to={"/user/signup"}>Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default UserNavbar;
