import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignUp.css";

const UserSignup = () => {
  let [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    username: "",
  });

  let navigate = useNavigate();

  let handleChange = (e) => {
    let { value, name } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, username } = credentials;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/createuser",
        {
          name,
          email,
          password,
          username,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const json = response.data;

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
    <div className="signup-container">
      <div className="signup">
        <form onSubmit={handleSubmit}>
          <h1>Create Account</h1>
          <div className="d1">
            <label htmlFor="name">Name : </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter name"
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
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email : </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter Email Address"
              onChange={handleChange}
            />
          </div>
          <p id="emailError"></p>

          <div>
            <label htmlFor="password">Password : </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter Password"
              onChange={handleChange}
            />
          </div>
          <p id="passError"></p>

          <button type="submit">Create Account</button>
          <Link to={"/user/login"} style={{ color: "#f7f7f7eb" }}>
            Already Have a Account?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default UserSignup;
