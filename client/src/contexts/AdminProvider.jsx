import React, { useEffect, useState } from "react";
import AdminContext from "./AdminContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);

  const [loggedIn, setLoggedIn] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("admin-token")) {
      setLoggedIn(true);
    } else {
      navigate("/admin/login");
    }
  }, [navigate]);

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/allusers",
        {
          headers: {
            "auth-token": localStorage.getItem("admin-token"),
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to fetch user details");
      }
      const usersData = response.data;

      setAllUsers(usersData);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [loggedIn]);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/admin/getadmin",
          {},
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("admin-token"),
            },
          }
        );

        if (response.status !== 200) {
          throw new Error("Failed to fetch user details");
        }

        const adminData = response.data;

        // Format the date and time
        const formattedDate = new Date(adminData.date);
        adminData.date = `${formattedDate.toLocaleDateString()} ${formattedDate.toLocaleTimeString()}`;

        setAdmin(adminData);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchAdmin();
  }, [loggedIn]);

  //!DELETE USER FROM DATABASE
  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/admin/deleteuser/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("admin-token"),
          },
        }
      );

      // Check if the response was successful
      if (response.status === 200) {
        console.log("User deleted successfully:", response.data);
        await fetchUser();
        return response.data.user;
      } else {
        console.error("Failed to delete user:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  };

  return (
    <AdminContext.Provider
      value={{ fetchUser, deleteUser, allUsers, loggedIn, admin }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;
