import React from "react";
import { options } from "../options";
import { NavLink } from "react-router-dom";

const HamburgerView = ({ setVisible }) => {
  return (
    <div className="h-[calc(100vh-70px)] w-[100vw] bg-white absolute top-[70px] right-0 p-4 z-10">
      <div className="flex flex-col gap-4 text-xl">
        {options.map((option) => {
          return (
            <NavLink
              className={({ isActive }) =>
                `option ${isActive ? "text-[var(--orange)]" : ""}`
              }
              key={option.title}
              to={option.path}
              onClick={() => setVisible(!visible)}
            >
              {option.title}
            </NavLink>
          );
        })}
        <NavLink className="text-[var(--orange)] font-bold" to={"/login"}>
          Login
        </NavLink>
      </div>
    </div>
  );
};

export default HamburgerView;
