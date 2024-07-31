const dotenv = require("dotenv");
const Client = require("../models/clientModel");
const Group = require("../models/groupModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// const getAllUsers = async (req, res) => {
//   try {
//     const reqQuery = { ...req.query };
//     const removeFields = ["select", "sort", "limit", "page"];
//     removeFields.forEach((param) => delete reqQuery[param]);

//     let queryStr = JSON.stringify(reqQuery);
//     queryStr = queryStr.replace(
//       /\b(gt|gte|lt|lte|in)\b/g,
//       (match) => `$${match}`
//     );
//     query = Client.find(JSON.parse(queryStr));

//     if (req.query.select) {
//       const fields = req.query.select.split(",").join(" ");
//       query = query.select(fields);
//     }

//     if (req.query.sort) {
//       const sortBy = req.query.sort.split(",").join(" ");
//       query = query.sort(sortBy);
//     }

//     const page = parseInt(req.query.page, 10) || 1;
//     const limit = parseInt(req.query.limit, 10) || 100;
//     const startIndex = (page - 1) * limit;
//     const endIndex = page * limit;
//     const total = await Client.countDocuments(query);

//     query = query.populate("groups", "name");
//     query = query.skip(startIndex).limit(limit);
//     const pagination = {};
//     if (endIndex < total) {
//       pagination.next = {
//         page: page + 1,
//         limit,
//       };
//     }
//     if (startIndex > 0) {
//       pagination.prev = {
//         page: page - 1,
//         limit,
//       };
//     }

//     const client = await query;
//     if (!client) {
//       return res
//         .status(401)
//         .json({ success: false, msg: "There are no Users" });
//     }
//     return res
//       .status(200)
//       .json({ success: true, count: total, pagination, data: client });
//   } catch (error) {
//     console.log(`${error.message} (error)`.red);
//     return res.status(400).json({ success: false, msg: error.message });
//   }
// };

const getAllUsers = async (req, res) => {
  try {
    const reqQuery = { ...req.query };
    const removeFields = ["select", "sort", "limit", "page"];
    removeFields.forEach((param) => delete reqQuery[param]);

    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`
    );

    let query = Client.find(JSON.parse(queryStr)).clone();

    if (req.query.select) {
      const fields = req.query.select.split(",").join(" ");
      query = query.select(fields);
    }

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    }

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 100;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Client.countDocuments(JSON.parse(queryStr));

    query = query.populate("groups", "name");
    query = query.skip(startIndex).limit(limit);

    const pagination = {};
    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }
    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }

    const client = await query.exec();
    if (!client) {
      return res
        .status(401)
        .json({ success: false, msg: "There are no Users" });
    }
    return res
      .status(200)
      .json({ success: true, count: total, pagination, data: client });
  } catch (error) {
    console.log(`${error.message} (error)`.red);
    return res.status(400).json({ success: false, msg: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {

    // email, password, newPassword
    const details = req.body;
    // console.log(details);
    const user = await Client.findOne({ email: details.email });
    if (!user) {
      return res
        .status(200)
        .json({ success: true, msg: "No Such User Exist !" });
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res
        .status(500)
        .json({ success: false, msg: "Wrong Original Password" });
    }
    // Hashing Password
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(details.newPassword, salt);
    user.password = hashPassword;
    await user.save();

    return res.status(200).json({ success: true, msg: "Password Changed" });
  } catch (error) {
    console.error("Error in handling login request:", error);
    return res.status(500).json({ success: false, msg: "Some Error Occurred" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const details = req.body;
    const user = await Client.findOneAndUpdate(
      { email: details.email },
      details
    );

    if (!user) {
      return res
        .status(200)
        .json({ success: true, msg: "No Such User Exist!" });
    }

    // Update user object with fields from details
    for (const key in details) {
      if (details.hasOwnProperty(key) && user.hasOwnProperty(key)) {
        user[key] = details[key];
      }
    }

    await user.save();

    return res.status(200).json({ success: true, msg: "Profile Updated" });
  } catch (error) {
    console.error("Error in handling update profile request:", error);
    return res.status(500).json({ success: false, msg: "Some Error Occurred" });
  }
};

const updateBioData = async (req, res) => {
  try {
    const details = req.body;
    console.log(details);
    return res.status(200).json({ success: true, msg: "Bio-Data Updated" });
  } catch (error) {
    console.error("Error in handling update profile request:", error);
    return res.status(500).json({ success: false, msg: "Some Error Occurred" });
  }
};

module.exports = {
  getAllUsers,
  resetPassword,
  updateProfile,
  updateBioData,
};
