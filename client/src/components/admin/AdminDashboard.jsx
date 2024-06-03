import React, { useContext } from "react";
import "./css/AdminDashboard.css";
import AdminContext from "../../contexts/AdminContext";

const AdminDashboard = () => {
  const { allUsers } = useContext(AdminContext);

  if (!allUsers) {
    return <h1>Loading...</h1>;
  }

  // const date = allUsers[allUsers.length - 1].date;
  // const formattedDate = new Date(date);
  // const recentActivityDate = `${formattedDate.toLocaleDateString()} ${formattedDate.toLocaleTimeString()}`;

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div>
        <h3>Summary Statistics</h3>
        <ul>
          <li>Total Users: {allUsers.length}</li>
        </ul>
      </div>
{/*       <div>
        <h3>Recent Activity</h3>
        <p>New user registered: {recentActivityDate}</p>
      </div> */}
    </div>
  );
};

export default AdminDashboard;
