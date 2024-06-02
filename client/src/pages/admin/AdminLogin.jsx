import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/login",
        {
          email: credentials.email,
          password: credentials.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const json = response.data;
      console.log(json);

      if (json.success) {
        localStorage.setItem("admin-token", json.authToken);
        navigate("/admin");
      } else {
        alert("Invalid Credentials");
      }
    } catch (error) {
      console.error("There was an error logging :", error);
      alert("Invalid Credentials");
    }
  };
  return (
    <div className="container-login">
      <div className="signup">
        <form onSubmit={handleSubmit}>
          <h1>Admin</h1>
          <div>
            <label htmlFor="email">Email : </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
              placeholder="Enter Email"
            />
          </div>
          <div>
            <label htmlFor="password">Password : </label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
              placeholder="Enter Password"
            />
          </div>

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
