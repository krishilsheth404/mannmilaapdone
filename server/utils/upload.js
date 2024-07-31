const multer = require('multer');
const path = require("path");
const slugify = require('slugify');
const fs = require("fs");

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    console.log("Mail = ", req.headers.mail)
    // cb(null, Date.now() + '-' + slugify(req.headers.mail + '.pdf'));
    cb(null, slugify(req.headers.mail + '.pdf'));
  }
});

// Create the multer instance
const upload = multer({ storage: storage });

module.exports = upload;