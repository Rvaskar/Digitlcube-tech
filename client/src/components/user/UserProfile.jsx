import React, { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";

const UserProfile = () => {
  let { user } = useContext(AuthContext);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      <h2>Name: {user.name}</h2>
      <h2>Username: {user.username}</h2>
      <h2>Email: {user.email}</h2>
      <h2>account created : {user.date}</h2>
    </div>
  );
};

export default UserProfile;
