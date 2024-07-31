import React, { useEffect, useState } from "react";
import TableContent from "../table/Table";
import { useParams } from "react-router-dom";
import { getGroupMembersByID } from "../../../utils/groups";
import { getAllUsersApproved } from "../../../utils/userDetails";

const CustomerTable = () => {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const { groupID } = useParams();

  const getGroupMembers = async () => {
    setTimeout(async () => {
      try {
        if (groupID === "all") {
          const membersResponse = await getAllUsersApproved(groupID);
          setGroupName("All");
          setMembers(membersResponse.data.data);
        } else {
          const membersResponse = await getGroupMembersByID(groupID);
          setGroupName(membersResponse.data.data[0].name);
          setMembers(membersResponse.data.data[0].members);
        }
      } catch (error) {
        console.log(error);
      }
    }, 1000);
  };

  useEffect(() => {
    getGroupMembers();
  }, [groupID]);

  useEffect(() => {
    // Filter members based on search input
    if (searchInput && members.length > 0) {
      console.log(members)
      console.log(searchInput)
      // Check if members has data
      setFilteredMembers(
        members.filter((member) =>
          groupID === 'all' ?member.name.toLowerCase().includes(searchInput.toLowerCase()) :member.member.name.toLowerCase().includes(searchInput.toLowerCase())
        )
      );
    } else {
      setFilteredMembers(members);
    }
  }, [searchInput, members]);

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="flex-1 p-4 relative">
      <div className="text-4xl font-bold text-center">{groupName}</div>
      <div className="search-bar w-full my-4 text-right">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchInput}
          onChange={handleSearchChange}
          className="p-2 text-xl border-2 border-solid border-[var(--brown)] rounded-xl"
        />
      </div>
      {filteredMembers.length > 0 ? (
        <TableContent members={filteredMembers} groupID={groupID} />
      ) : (
        <p className="text-center text-xl">No members found.</p>
      )}
    </div>
  );
};

export default CustomerTable;
