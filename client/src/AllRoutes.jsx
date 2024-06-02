import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import UserLogin from "./pages/user/UserLogin";
import UserNotFound from "./pages/user/UserNotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminNotFound from "./pages/admin/AdminNotFound";
import AdminHome from "./pages/admin/AdminHome";
import UserHome from "./pages/user/UserHome";
import UserProfile from "./components/user/UserProfile";
import UserDashboard from "./components/user/UserDashboard";
import AdminDashboard from "./components/admin/AdminDashboard";
import UserManagement from "./components/admin/UserManagement";
import UserSignup from "./pages/user/UserSignup";
import AuthProvider from "./contexts/AuthProvider";
import AdminProvider from "./contexts/AdminProvider";
import UserUpdate from "./components/admin/UserUpdate";
import AdminProfile from "./components/admin/AdminProfile";

const AllRoutes = () => {
  return (
    <Routes>
      {/* User Routes */}
      <Route
        path="/user/*"
        element={
          <AuthProvider>
            <Routes>
              <Route path="/" element={<UserHome />}>
                <Route index element={<UserDashboard />} />
                <Route path="user-dashboard" element={<UserDashboard />} />
                <Route path="user-profile" element={<UserProfile />} />
                <Route path="*" element={<UserNotFound />} />
              </Route>
              <Route path="login" element={<UserLogin />} />
              <Route path="signup" element={<UserSignup />} />
            </Routes>
          </AuthProvider>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin/*"
        element={
          <AdminProvider>
            <Routes>
              <Route path="/" element={<AdminHome />}>
                <Route index element={<AdminDashboard />} />
                <Route path="admin-dashboard" element={<AdminDashboard />} />
                <Route path="manage-user" element={<UserManagement />} />
                <Route path="*" element={<AdminNotFound />} />
                <Route path="user-profile" element={<AdminProfile />} />
                <Route path="user-update/:id" element={<UserUpdate />} />
              </Route>
              <Route path="login" element={<AdminLogin />} />
            </Routes>
          </AdminProvider>
        }
      />

      {/* Default Route */}
      <Route path="/" element={<Navigate to="/user" />} />
    </Routes>
  );
};

export default AllRoutes;
