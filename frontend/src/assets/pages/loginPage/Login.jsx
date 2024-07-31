import React, { useState, useEffect } from "react";
import axios from "axios";
import { url } from "../../../utils/url";
import { getCurrentUserToken } from "../../../utils/userDetails";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(url + "/login");
      const response = await axios.post(url + `/login`, {
        email: email,
        password: password,
      });
      console.log(response.data);
      if (response.data.success === true) {
        localStorage.setItem("mannMilaapUserToken", response.data.token);
        window.location.href = "/";
      } else {
        alert(response.data.msg);
        setPassword("");
      }
    } catch (error) {
      console.error("There was an error logging in!", error);
      alert("Wrong Credentials")
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
          Login Page
        </h1>
        <input
          className="p-2 border-2 border-solid border-[var(--orange)] rounded-md "
          type="text"
          placeholder="Enter your Email Id"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          className="p-2 border-2 border-solid border-[var(--orange)] rounded-md "
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={handlePasswordChange}
        />
        <Link to={"/change-password"} className="text-[var(--orange)]">Change password</Link>
        <button
          type="submit"
          className="border-solid border-2 border-[var(--orange)] rounded-md hover:bg-[var(--orange)] px-4 py-2 font-bold hover:text-white"
        >
          Log in
        </button>
        <h1>
          New user? <Link to="/register" className="underline text-[var(--orange)] font-bold">Register</Link>
        </h1>
      </form>
    </div>
  );
};

export default Login;