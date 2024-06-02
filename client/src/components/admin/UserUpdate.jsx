import React, { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminContext from "../../contexts/AdminContext";
import axios from "axios";

const UserUpdate = () => {
  let [user, setUser] = useState();
  let { id } = useParams();
  let { allUsers, fetchUser } = useContext(AdminContext);

  let navigate = useNavigate();

  const matchedUser = useMemo(
    () => allUsers.find((user) => user._id === id),
    [allUsers, id]
  );

  useEffect(() => {
    if (matchedUser) {
      setUser(matchedUser);
    }
  }, [matchedUser]);

  if (!user) {
    return <h1>Loading</h1>;
  }

  let handleChange = (e) => {
    let { value, name } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/admin/edituser/${id}`,
        {
          name: user.name,
          username: user.username,
          email: user.email,
        },
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

      await fetchUser();
      navigate("/admin/manage-user");
    } catch (error) {
      console.error("Error Updating user details:", error);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup">
        <form onSubmit={handleSubmit}>
          <h1>Update User</h1>
          <div className="d1">
            <label htmlFor="name">Name : </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter name"
              value={user.name}
              onChange={handleChange}
            />
          </div>
          <p id="nameError"></p>
          <div className="username">
            <label htmlFor="name">Username : </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter username"
              value={user.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email : </label>
            <input
              type="email"
              name="email"
              id="email"
              value={user.email}
              placeholder="Enter Email Address"
              onChange={handleChange}
            />
          </div>

          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UserUpdate;
