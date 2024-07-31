import React, { useState, useEffect } from "react";
import axios from "axios";
import { url } from "../../../utils/url";
import { getCurrentUserToken } from "../../../utils/userDetails";
import { Link } from "react-router-dom";

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(url + "/Change-password");
      const response = await axios.post(url + `/change-password`, {
        email,
        password,
        newPassword,
      });
      console.log(response.data);
      if (response.data.success === true) {
        localStorage.setItem("mannMilaapUserToken", response.data.token);
        window.location.href = "/";
      } else {
        alert(response.data.msg);
        setPassword("");
      }
      // Handle success (e.g., redirect to another page, show a success message, etc.)
    } catch (error) {
      console.error("There was an error logging in!", error);
      localStorage.removeItem("mannMilaapUserToken");
      // Handle error (e.g., show an error message)
    }
  };

  useEffect(() => {
    if (!getCurrentUserToken()) {
      window.location.href = "/";
    }
  }, []);

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 items-center justify-center h-[calc(100vh-70px)]"
      >
        <h1 className="text-4xl font-bold text-center text-[var(--orange)]">
          Change Password
        </h1>
        <input
          className="p-2 border-2 border-solid border-[var(--orange)] rounded-md "
          type="email"
          placeholder="Enter E-mail Address"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          className="p-2 border-2 border-solid border-[var(--orange)] rounded-md "
          type="password"
          placeholder="Enter current password"
          value={password}
          onChange={handlePasswordChange}
        />
        <input
          className="p-2 border-2 border-solid border-[var(--orange)] rounded-md "
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={handleNewPasswordChange}
        />
        <button
          type="submit"
          className="border-solid border-2 border-[var(--orange)] rounded-md hover:bg-[var(--orange)] px-4 py-2 font-bold hover:text-white"
        >
          Change password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
