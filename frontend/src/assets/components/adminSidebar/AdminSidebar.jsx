import React, { useEffect, useState } from "react";
// import { groups } from "./groups";
import { NavLink } from "react-router-dom";
import { getAllGroups } from "../../../utils/groups";

const AdminSidebar = () => {
  const [groups, setGroups] = useState(false);
  const getGroups = async () => {
    const groups = await getAllGroups();
    console.log(groups);
    setGroups(groups.data.data);
  };
  useEffect(() => {
    getGroups();
  }, []);

  // const [visible, setVisible] = useState(false);
  return (
    <div className="p-4 border-solid border-[var(--yellow)] border-r-2 min-w-[350px] overflow-y-scroll">
      <div className="heading text-4xl font-bold text-center mb-3">Sidebar</div>
      <div
        onClick={() => (window.location.href = `/admin/all`)}
        className={`option text-xl mb-4 cursor-pointer flex justify-between`}
      >
        All
      </div>
      <div
        onClick={() => (window.location.href = `/requests`)}
        className={`option text-xl mb-4 cursor-pointer flex justify-between`}
      >
        Requests
      </div>
      {groups &&
        groups.map((grp) => {
          return (
            <div
              className={`option  text-xl mb-4 cursor-pointer flex justify-between`}
              key={grp.name}
              to={grp._id}
              onClick={() => (window.location.href = `/admin/${grp._id}`)}
            >
              <div className="name">{grp.name}</div>
              <div className="count text-[var(--green)]">
                {grp.members.length}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default AdminSidebar;
