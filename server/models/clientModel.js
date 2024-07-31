const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  candidateMobile: {
    type: String,
    required: [true, "Mobile number is required"],
    unique: [true, "Mobile number should be unique"],
  },
  whatsappNumber: {
    type: String,
    required: [true, "Whatsapp number is required"],
  },
  password: {
    type: String,
    required: [false, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  birthdate: {
    type: String,
    required: [true, "Birthdate is required"],
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: [true, "Gender is required"],
  },
  referencePersonName: {
    type: String,
    required: false,
  },
  referencePersonContact: {
    type: String,
    required: false,
  },
  groups: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
    },
  ],
  groupRequest: [{ type: String }],
  fatherName: {
    type: String,
  },
  motherName: {
    type: String,
  },
  highestLevelOfEducation: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  religion: {
    type: String,
    required: [true, "Religion is required"],
  },
  caste: {
    type: String,
    required: [true, "Caste is required"],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
  groupsExpiry: [
    {
      name: String,
      expiry: Date,
    },
  ],
  bioData: {
    type: String,
    required: false,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
});

clientSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "5d",
  });
  return token;
};

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;
