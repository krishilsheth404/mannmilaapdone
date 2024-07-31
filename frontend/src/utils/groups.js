import axios from "axios";
import { url } from "./url";

export const getAllGroups = async () => {
  try {
    const groups = await axios.get(url + "/groups/all/no-members");
    console.log(groups);
    if (groups) return groups;
    else return false;
  } catch (error) {
    return false;
  }
};

export const getGroupMembersByID = async (groupID) => {
  try {
    const groups = await axios.get(url + `/groups/all?_id=${groupID}`);
    console.log(groups);
    if (groups) return groups;
    else return false;
  } catch (error) {
    return false;
  }
};

export const updateGroup = async (groupName, id) => {
  try {
    const added = await axios.post(url + `/assign`, {
      groupName,
      id,
    });
    if (added) {
      console.log("success");
    } else {
      console.log("fail");
    }
  } catch (error) {
    console.log(error);
  }
};
