import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLoggedIn(true);
    } else {
      if (window.location.pathname.includes("/user/login")) {
        navigate("/user/login");
      } else {
        navigate("/user/signup");
      }
    }
  }, [navigate]);

  //! Getting User Data

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/user/getuser",
          {},
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("token"),
            },
          }
        );

        if (response.status !== 200) {
          throw new Error("Failed to fetch user details");
        }

        const userData = response.data;

        // Format the date and time
        const formattedDate = new Date(userData.date);
        userData.date = `${formattedDate.toLocaleDateString()} ${formattedDate.toLocaleTimeString()}`;

        setUser(userData);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUser();
  }, [loggedIn]);

  return (
    <AuthContext.Provider value={{ user, loggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
