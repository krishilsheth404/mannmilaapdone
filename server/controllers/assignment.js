const dotenv = require("dotenv");
const Client = require("../models/clientModel");
const Group = require("../models/groupModel");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");

const approveUser = async (req, res) => {
  try {
    const details = req.body;
    // console.log(details);
    const user = await Client.findOne({ email: details.email });
    if (!user) {
      return res
        .status(200)
        .json({ success: true, msg: "No Such User Exist !" });
    }
    // Hashing Password
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(details.password, salt);
    user.password = hashPassword;
    user.isApproved = true;
    await user.save();

    return res.status(200).json({ success: true, msg: "Client Approved" });
  } catch (error) {
    console.error("Error in handling login request:", error);
    return res.status(500).json({ success: false, msg: "Some Error Occurred" });
  }
};

const assignGroup = async (req, res) => {
  try {
    console.log(req.body);

    var groupName = req.body.groupName;
    var userid = req.body.id;
    var user = await Client.findById(userid).exec();

    if (!user) {
      return res
        .status(200)
        .json({ success: true, msg: "No Such User Exist !" });
    }

    // const wasPresent = user.groupRequest.includes(groupName);
    // if (!wasPresent) {
    //     return res.status(200).json({success: true, msg: "User does not want to be a part of this group"});
    // }

    const group = await Group.findOne({ name: groupName }).exec();

    if (!group) {
      return res
        .status(200)
        .json({ success: true, msg: "No such Group in Existance !" });
    }

    user.groupRequest = user.groupRequest.filter(
      (field) => field !== groupName
    );

    const isPresent = user.groups.includes(group._id);
    if (!isPresent) {
      user.groups.push(group._id);
    }
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 90);
    const obj = user.groupsExpiry.find(el => el.name === groupName);

    if (obj) {
      let curr_expiry = obj.expiry
      let curr_date = new Date();
      let diff = (Math.abs(curr_expiry - curr_date))/(24*60*60*1000);
      const newExpiryDate = new Date(expiryDate);
      newExpiryDate.setDate(newExpiryDate.getDate()+Number(diff));

      const group_member = group.members.find(el => el.member.toString() === userid);
      obj.expiry = newExpiryDate;
      group_member.expiry = newExpiryDate;

    } else {
      user.groupsExpiry.push({
        name: group.name,
        expiry: expiryDate,
      });
      group.members.push({
        member: user._id,
        expiry: expiryDate,
      });
    }

    user.save();
    group.save();
    // const new_id = new mongoose.Types.ObjectId("66728fdf1a340c9e2530bbb2");
    return res
      .status(200)
      .json({
        success: true,
        msg: `Successfully assigned ${group.name} to ${user.name} !`,
      });
  } catch (error) {
    console.error("Error in handling login request:", error);
    return res.status(500).json({ success: false, msg: "Some Error Occurred" });
  }
};

module.exports = {
  assignGroup,
  approveUser,
};
