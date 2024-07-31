import axios from "axios";
import { url } from "./url";

export const getOneUserDetails = async (userEmail) => {
  try {
    const user = await axios.get(url + `/users/all?email=${userEmail}`);
    return user;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const getAllUsers = async () => {
  try {
    const user = await axios.get(url + `/users/all`);
    return user;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const getAllUsersApproved = async () => {
  try {
    const user = await axios.get(url + `/users/all?isApproved=true`);
    return user;
  } catch (error) {
    console.log(error);
    return;
  }
};
export const getAllUsersUnapproved = async () => {
  try {
    const user = await axios.get(url + `/users/all?isApproved=false`);
    return user;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const getCurrentUserToken = async () => {
  if (localStorage.getItem("mannMilaapUserToken")) {
    const returnedToken = localStorage.getItem("mannMilaapUserToken");
    return returnedToken;
  } else return false;
};

export const getCurrentUserDetails = async () => {
  try {
    const userToken = await getCurrentUserToken();
    if (userToken) {
      const user = await axios.post(url + `/authorize`, {
        token: userToken,
      });
      // console.log(user);
      return user;
    } else return false;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const logOut = async () => {
  localStorage.removeItem("mannMilaapUserToken");
};

export const updateUserProfile = async (data) => {
  try {
    console.log(data);
    const updateResponse = await axios.post(url + "/update-profile", data);
    if (updateResponse) {
      console.log(updateResponse);
    }
  } catch (error) {
    console.log(error);
  }
};

// export const updateBioData = async () => {
//   try {
//     console.log();
//     const updateResponse = await axios.post(url + "/update-biodata");
//     if (updateResponse) {
//       console.log(updateResponse);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };
