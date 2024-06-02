import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";
import axios from "axios";

const UserLogin = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/login",
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
        localStorage.setItem("token", json.authToken);
        navigate("/user");
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
          <h1>Login</h1>
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
          <Link to={"/user/signup"} style={{ color: "#f7f7f7eb" }}>
            Create a new Account?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
