import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  getCurrentUserDetails,
  logOut,
  updateUserProfile,
} from "../../../utils/userDetails";
import { handleDownload } from "../../../utils/download";
import { url } from "../../../utils/url";

const Profile = () => {
  const [user, setUser] = useState(null); // Start with null instead of false
  const [editIsOn, setEditIsOn] = useState(false);
  const [file, setFile] = useState(null);

  const handleFileChange = async (e) => {
    e.preventDefault();
    console.log("handle change");
    try {
      const formDataBioData = new FormData();
      if (!file) {
        alert("Select a file first");
        return;
      }

      formDataBioData.append("file", file);
      formDataBioData.append("email", user.email);
      const uploadBioData = await axios.post(
        url + "/update-biodata",
        formDataBioData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            mail: user.email,
          },
        }
      );

      alert("Uploaded successfully");
    } catch (error) {
      console.log(error);
      alert("Error Uploading");
    }
  };
  const getDetails = async () => {
    try {
      const response = await getCurrentUserDetails();
      if (!response.data.user) {
        window.location.href = "/login";
      } else {
        setUser(response.data.user); // Set the user state directly
      }
    } catch (error) {
      console.log(error);
      logOut();
      window.location.href = "/login";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleEditClick = () => {
    setEditIsOn(!editIsOn);
  };

  const handleSubmit = async () => {
    // Handle form submission, e.g., send data to server
    console.log("Updated user details:", user);
    await updateUserProfile(user);
    setEditIsOn(false);
  };

  useEffect(() => {
    getDetails();
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-lg overflow-y-scroll h-[90%]">
      <h1 className="text-3xl font-bold mb-6 text-center">User Profile</h1>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name:
          </label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            readOnly={!editIsOn}
            className={`w-full px-3 py-2 border ${
              editIsOn ? "border-blue-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>
        {/* Repeat similar input fields for other user attributes */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Mobile:
          </label>
          <input
            type="text"
            name="candidateMobile"
            value={user.candidateMobile}
            onChange={handleChange}
            readOnly={!editIsOn}
            className={`w-full px-3 py-2 border ${
              editIsOn ? "border-blue-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>
        {/* Continue for other fields */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={user.email}
            readOnly={true}
            className={`w-full px-3 py-2 border ${
              editIsOn ? "border-blue-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>
        {/* Other fields */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Birthdate:
          </label>
          <input
            type="string"
            name="birthdate"
            value={user.birthdate}
            onChange={handleChange}
            readOnly={!editIsOn}
            className={`w-full px-3 py-2 border ${
              editIsOn ? "border-blue-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Gender:
          </label>
          <select
            name="gender"
            value={user.gender}
            onChange={handleChange}
            disabled={!editIsOn}
            className={`w-full px-3 py-2 border ${
              editIsOn ? "border-blue-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        {/* Other fields */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Father's Name:
          </label>
          <input
            type="text"
            name="fatherName"
            value={user.fatherName}
            onChange={handleChange}
            readOnly={!editIsOn}
            className={`w-full px-3 py-2 border ${
              editIsOn ? "border-blue-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Mother's Name:
          </label>
          <input
            type="text"
            name="motherName"
            value={user.motherName}
            onChange={handleChange}
            readOnly={!editIsOn}
            className={`w-full px-3 py-2 border ${
              editIsOn ? "border-blue-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Education:
          </label>
          <input
            type="text"
            name="highestLevelOfEducation"
            value={user.highestLevelOfEducation}
            onChange={handleChange}
            readOnly={!editIsOn}
            className={`w-full px-3 py-2 border ${
              editIsOn ? "border-blue-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Occupation:
          </label>
          <input
            type="text"
            name="occupation"
            value={user.occupation}
            onChange={handleChange}
            readOnly={!editIsOn}
            className={`w-full px-3 py-2 border ${
              editIsOn ? "border-blue-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Religion:
          </label>
          <input
            type="text"
            name="religion"
            value={user.religion}
            onChange={handleChange}
            readOnly={!editIsOn}
            className={`w-full px-3 py-2 border ${
              editIsOn ? "border-blue-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Caste:
          </label>
          <input
            type="text"
            name="caste"
            value={user.caste}
            onChange={handleChange}
            readOnly={!editIsOn}
            className={`w-full px-3 py-2 border ${
              editIsOn ? "border-blue-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Address:
          </label>
          <textarea
            name="address"
            value={user.address}
            onChange={handleChange}
            rows={3}
            cols={5}
            readOnly={!editIsOn}
            className={`w-full px-3 py-2 border ${
              editIsOn ? "border-blue-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>
        {!editIsOn && (
          <div>
            <button
              type="button"
              onClick={() => handleDownload(user.email, user.name)}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 m-4"
            >
              Download BioData
            </button>
            <input
              type="file"
              onChange={(e) => {
                try {
                  setFile(e.target.files[0]);
                } catch (error) {
                  console.log(error);
                }
              }}
            />
            <button
              className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 m-4"
              onClick={(e) => handleFileChange(e)}
            >
              Upload new BioData
            </button>
          </div>
        )}
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={handleEditClick}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            {editIsOn ? "Cancel" : "Edit"}
          </button>
          {editIsOn && (
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Profile;
