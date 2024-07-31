import React, { useEffect, useState } from "react";
import Select from "react-select";
import { groupOptions } from "./groupOptions";
import { getOneUserDetails } from "../../../utils/userDetails";
import { useParams } from "react-router-dom";
import { updateGroup } from "../../../utils/groups";
import { pdfURL, url } from "../../../utils/url";

// pdf
import axios from "axios";
import { saveAs } from "file-saver";
import { handleDownload } from "../../../utils/download";

export const UserDetails = () => {
  const { userID } = useParams();
  const [editIsOn, setEditIsOn] = useState(false);
  const [user, setUser] = useState(false); // Initialize with null instead of false
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedGroups, setSelectedGroups] = useState();
  const [password, setPassword] = useState("");

  const fetchUserData = async () => {
    try {
      const response = await getOneUserDetails(userID); // Replace with your actual data fetching function
      console.log(response.data.data);
      setUser(response.data.data[0]);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    // Fetch user data based on userID

    if (!user) {
      fetchUserData();
    }
  }, []);

  const handleAddToGroup = () => {
    setShowDropdown(!showDropdown);
  };

  const handleGroupChange = (selectedOptions) => {
    setSelectedGroups(selectedOptions);
  };

  const handleSaveGroups = () => {
    // Logic to save selected groups for the user
    console.log("Selected groups:", selectedGroups);
    updateGroup(selectedGroups.value, user._id);
    // Close dropdown after saving
    setShowDropdown(false);
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      // Handle the enter key press event here
      try {
        const sendPasswordResponse = await axios.post(url + "/approve-client", {
          email: user.email,
          password,
        });
        if (!sendPasswordResponse) {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      }

      // You can add your desired functionality here
    }
  };

  return (
    <div className="flex flex-col gap-4 p-10 w-full min-w-[420px] overflow-y-auto">
      {user.isApproved === false && (
        <input
          type="text"
          name=""
          placeholder="Set password"
          id=""
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="text-xl font-bold"
          onKeyDown={(e) => handleKeyDown(e)}
        />
      )}
      <input
        disabled={!editIsOn}
        type="text"
        name=""
        id=""
        value={user.name}
        className="text-xl font-bold"
      />
      <div className="contact flex flex-row">
        <label className="font-bold mr-1" htmlFor="cmobile">
          Contact Mobile:{" "}
        </label>
        <input
          disabled={!editIsOn}
          type="text"
          value={user.candidateMobile}
          id="cmobile"
        />
        <label className="font-bold mr-1" htmlFor="wmobile">
          Whatsapp Mobile:{" "}
        </label>
        <input
          disabled={!editIsOn}
          type="text"
          value={user.whatsappNumber}
          id="wmobile"
        />
        <input disabled={!editIsOn} type="text" value={user.email} id="email" />
      </div>
      <div className="birthdate flex gap-2">
        <label htmlFor="birthdate" className="font-bold">
          Birthdate
        </label>
        <input
          disabled={!editIsOn}
          type="text"
          value={user.birthdate.slice(0, 10)}
          id="birthdate"
        />
      </div>
      <input disabled={!editIsOn} type="text" value={user.gender} />
      <div className="parents flex flex-row">
        <label className="font-bold mr-1" htmlFor="mother">
          Mother:{" "}
        </label>
        <input
          disabled={!editIsOn}
          type="text"
          value={user.motherName}
          id="mother"
        />
        <label className="font-bold mr-1" htmlFor="father">
          Father:{" "}
        </label>
        <input
          disabled={!editIsOn}
          type="text"
          value={user.fatherName}
          id="father"
        />
      </div>
      <div className="left-right flex w-full gap-2">
        <div className="left flex flex-1 gap-2 flex-col">
          <input
            disabled={!editIsOn}
            type="text"
            value={user.highestLevelOfEducation}
          />
          <input disabled={!editIsOn} type="text" value={user.occupation} />
          <input disabled={!editIsOn} type="text" value={user.religion} />
          <input disabled={!editIsOn} type="text" value={user.caste} />
        </div>
        <div className="right flex-1">
          <textarea
            type="text"
            value={user.address}
            cols={5}
            rows={3}
            className="w-full"
            readOnly={!editIsOn}
          />
        </div>
      </div>

      <div className="groups">
        <h1 className="text-xl font-bold">List of Groups</h1>
        <ul>
          {user.groupsExpiry.map((grp, index) => {
            return (
              <li key={index} className="flex gap-4">
                <div className="name ">{grp.name}</div>
                <div className="expiry text-red-500">
                  {grp.expiry.slice(0, 10)}
                </div>
              </li>
            );
          })}
        </ul>
        <h1 className=" font-bold">Requested Groups</h1>
        <ul>
          {user.groupRequest.map((grp, index) => {
            return (
              <li key={index} className="flex gap-4">
                <div className="name">{grp}</div>
              </li>
            );
          })}
        </ul>
        <button
          onClick={handleAddToGroup}
          className="p-2 rounded-xl bg-[var(--orange)] m-4"
        >
          Add to group
        </button>
        {showDropdown && (
          <div className="my-4">
            <Select
              options={groupOptions}
              onChange={handleGroupChange}
              className="w-full"
            />
            <button
              onClick={handleSaveGroups}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Save Groups
            </button>
          </div>
        )}
      </div>
      <button
        className="bg-green-300 w-fit p-4 mx-auto rounded-xl"
        onClick={() => handleDownload(user.email, user.name)}
      >
        Download BioData
      </button>
    </div>
  );
};

export default UserDetails;
