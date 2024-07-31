const dotenv = require("dotenv");
const Client = require("../models/clientModel");
const Group = require("../models/groupModel");
dotenv.config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const demoRoute = async (req, res) => {
  try {
    // Perform Action
    return res.status(200).json({ success: true, msg: "Success" });
  } catch (error) {
    console.error("Error in handling login request:", error);
    return res.status(500).json({ success: false, msg: "Some Error Occurred" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Client.findOne({ email: email });
    if (!user) {
      return res
        .status(500)
        .json({ success: false, msg: "User doesn't Exist" });
    }
    if (!user.isApproved) {
      return res.status(200).json({ success: false, msg: "User not Approved" });
    }

    // console.log(password);
    // console.log(user.password);
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
      const token = user.generateAuthToken();
      return res
        .status(200)
        .json({ success: true, token: token, msg: `Logged in as ${email}` });
    } else {
      return res.status(500).json({ success: false, msg: "Wrong Password !" });
    }
  } catch (error) {
    console.error("Error in handling login request:", error);
    return res.status(500).json({ success: false, msg: "Some Error Occurred" });
  }
};

const authRoute = async (req, res) => {
  try {
    const { token } = req.body;
    var decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await Client.findOne({ _id: decoded._id }).populate(
      "groups",
      "name"
    );

    if (!user || !user.isApproved) {
      return res
        .status(500)
        .json({ success: false, msg: "User doesn't Exist or Not Approved" });
    } else {
      var details = user;
      details["password"] = null;

      return res
        .status(200)
        .json({ success: true, user: details, msg: `User Details` });
    }
  } catch (error) {
    console.error("Error in handling login request:", error);
    return res
      .status(500)
      .json({
        success: false,
        msg: "You are not Authorized to perform Action",
      });
  }
};

module.exports = {
  demoRoute,
  login,
  authRoute,
};
