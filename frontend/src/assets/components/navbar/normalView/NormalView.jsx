import React, { useEffect, useState } from "react";
import { options } from "../options";
import { NavLink } from "react-router-dom";
import { logOut } from "../../../../utils/userDetails";

const NormalView = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const handleLogOut = async () => {
    await logOut();
    setUserLoggedIn(false);
    window.location.href = "/";
  };

  useEffect(() => {
    if (localStorage.getItem("mannMilaapUserToken")) {
      setUserLoggedIn(true);
    } else setUserLoggedIn(false);
  }, []);

  return (
    <div className="flex gap-3 items-center max-sm:hidden">
      {options.map((option) => {
        return (
          <NavLink
            className={({ isActive }) =>
              `option ${isActive ? "text-[var(--orange)]" : ""}`
            }
            key={option.title}
            to={option.path}
          >
            {option.title}
          </NavLink>
        );
      })}
      {!userLoggedIn ? (
        <NavLink className="bg-[var(--orange)] p-2 rounded-md" to={"/login"}>
          Login
        </NavLink>
      ) : (
        <button
          className="bg-[var(--orange)] p-2 rounded-md"
          onClick={handleLogOut}
        >
          Log Out
        </button>
      )}
    </div>
  );
};

export default NormalView;
