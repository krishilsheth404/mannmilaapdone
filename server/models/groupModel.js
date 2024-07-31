const mongoose = require("mongoose");

const groupMemberSchema = new mongoose.Schema({
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true
  },
  expiry: {
    type: Date,
    required: true
  }
});

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: [true, "Group name should be unique"]
  },
  type: {
    type: String,
    required: false,
    default: "PREMIUM"
  },
  photoURL: {
    type: String,
    required: [false, "Photo URL is required"]
  },
  members: [groupMemberSchema]
});

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
