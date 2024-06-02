import React, { useContext } from "react";
import AdminContext from "../../contexts/AdminContext";

const AdminProfile = () => {
  let { admin } = useContext(AdminContext);

  if (!admin) {
    return <div>Loading...</div>;
  }
  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      <h2>Name: {admin.name}</h2>
      <h2>Username: {admin.username}</h2>
      <h2>Email: {admin.email}</h2>
      <h2>account created : {admin.date}</h2>
    </div>
  );
};

export default AdminProfile;
