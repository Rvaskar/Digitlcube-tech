import React, { useContext } from "react";
import AdminContext from "../../contexts/AdminContext";
import { Link } from "react-router-dom";
import "./css/UserManagement.css";

const UserManagement = () => {
  let { allUsers, deleteUser } = useContext(AdminContext);
  if (!allUsers) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="container">
      <h1>All Users</h1>
      <table>
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Account Created</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((v, i) => {
            let { _id, name, username, email, date } = v;
            const formattedDate = new Date(date);
            date = `${formattedDate.toLocaleDateString()}`;
            return (
              <tr key={i + 1}>
                <td>{i + 1}</td>
                <td>{name}</td>
                <td>{username}</td>
                <td>{email}</td>
                <td>{date}</td>
                <td className="btn">
                  <Link to={`/admin/user-update/${_id}`}>Update</Link>
                  <Link
                    onClick={() => {
                      deleteUser(_id);
                    }}
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
