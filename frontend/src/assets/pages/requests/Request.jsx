import React, { useEffect, useState } from "react";
import { getAllUsersUnapproved } from "../../../utils/userDetails";
import TableContent from "../../components/table/Table";

const Request = () => {
  const [members, setMembers] = useState(false);
  const password = "password";
  const [enterPassword, setEnterPassword] = useState(false);

  const getUnapprovedUser = async () => {
    const userData = await getAllUsersUnapproved();
    console.log(userData.data.data);
    setMembers(userData.data.data);
  };

  useEffect(() => {
    getUnapprovedUser();
  }, []);

  if (sessionStorage.getItem("adminPassword") === password) {
    return <TableContent members={members} groupID="Requests" />;
  } else {
    return (
      <input
        placeholder="Enter password"
        onChange={(e) => setEnterPassword(e.target.value)}
      />
    );
  }
};

export default Request;
