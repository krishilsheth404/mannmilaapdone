import React, { useState } from "react";
import AdminSidebar from "../../components/adminSidebar/AdminSidebar";
// import CustomerTable from "../../components/customerTable/CustomerTable";
import { Outlet } from "react-router-dom";

const Admin = () => {
  const password = "password";
  const [enterPassword, setEnterPassword] = useState(false);

  const handleAdminPassword = () => {
    console.log(enterPassword);
    if (enterPassword === password) {
      sessionStorage.setItem("adminPassword", enterPassword);
      window.location.reload();
    }
  };

  if (sessionStorage.getItem("adminPassword") === password) {
    return (
      <div className="flex gap-3 p-2 h-[calc(100vh-70px)] overflow-y-hidden overflow-x-auto">
        <AdminSidebar />
        <Outlet />
      </div>
    );
  } else {
    return (
      <div>
        <input
          placeholder="Enter password"
          onChange={(e) => setEnterPassword(e.target.value)}
        />
        <button onClick={handleAdminPassword}>Submit</button>
      </div>
    );
  }
};
export default Admin;
