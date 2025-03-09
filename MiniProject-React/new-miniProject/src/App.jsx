import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/login";
import Dashboard from "./components/dashbord";
import UserManagement from "./components/UserManagement";
import Blog from "./components/Blog";
import CompanyManagement from "./components/CompanyManagement";
import Comments from "./components/Comments";
import RolesManagement from "./components/RolesManagement";
import CrudForm from "./components/CrudForm";
import { ToastContainer } from "react-toastify";
import CrudList from "./components/CrudList";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/user-management" element={<UserManagement />} />
      <Route path="/company-management" element={<CompanyManagement />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/comments-management" element={<Comments />} />
      <Route path="/role-management" element={<RolesManagement />} />
      <Route path="/crud-form" element={<CrudForm />} />
      <Route path="/CrudList" element={<CrudList />} />
    </Routes>
  );
}

export default App;
