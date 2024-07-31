const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const controllerLogin = require("../controllers/login");
const controllerSignUp = require("../controllers/signup");
const controllerAssignment = require("../controllers/assignment");
const controllerUser = require("../controllers/users");
const controllerGroup = require("../controllers/groups");
const upload = require("../utils/upload");

// Example route
// router.get("/callback", controllerLogin.callbackCheck);

router.post("/signup", upload.single("file"), controllerSignUp.createAccount);
router.post("/update-biodata", upload.single('file'), controllerUser.updateBioData);

router.post("/approve-client", controllerAssignment.approveUser);
router.post("/assign", controllerAssignment.assignGroup);
router.post("/update-profile", controllerUser.updateProfile);


router.post("/change-password", controllerUser.resetPassword);
router.get("/users/all", controllerUser.getAllUsers);
router.get("/groups/all", controllerGroup.getAllGroups);
router.get(
  "/groups/all/no-members",
  controllerGroup.getAllGroupsWithoutMembers
);

router.post("/login", controllerLogin.login);
router.post("/authorize", controllerLogin.authRoute);

module.exports = router;
