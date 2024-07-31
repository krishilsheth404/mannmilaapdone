import React, { useState } from "react";
import { options } from "./options";
import { NavLink } from "react-router-dom";
import { HamburgerIcon } from "@chakra-ui/icons";
import NormalView from "./normalView/NormalView";
import HamburgerView from "./hamburgerView/HamburgerView";

const Navbar = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex items-center justify-between h-[70px] p-4 relative">
      <div className="font-bold text-3xl text-[var(--orange)]">MannMilaap</div>
      <NormalView />
      <button
        className="hamberuger-menu sm:hidden"
        onClick={() => setVisible(!visible)}
      >
        <HamburgerIcon />
      </button>
      {visible && <HamburgerView setVisible={setVisible} />}
    </div>
  );
};

export default Navbar;
