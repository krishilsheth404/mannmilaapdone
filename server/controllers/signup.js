const dotenv = require("dotenv");
const Client = require("../models/clientModel");
const Group = require("../models/groupModel");
dotenv.config();

const createAccount = async (req, res) => {
  try {
    var data = req.body;
    data.bioData = "/uploads/" + req.headers.mail + ".pdf";
    console.log(data);
    data.isApproved = false;

    const newClientData = new Client(data);
    newClientData.save();

    return res
      .status(200)
      .json({ success: true, msg: "Successfully registered user !" });
  } catch (error) {
    console.error("Error in handling login request:", error);
    return res.status(500).json({ success: false, msg: "Some Error Occurred" });
  }
};

module.exports = {
  createAccount,
};
