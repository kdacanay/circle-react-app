const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
// const url = require('url');

// const config = require('../config/default.json');

aws.config.update({
  secretAccessKey: "zgtxI4bT+9awWXPELRQx1jrEG4Lhz+vx6mqBM9wn",
  accessKeyId: "AKIAJKKYEB5WUUKS6MZQ",
  region: 'us-east-2'
});

const s3 = new aws.S3();

const profileImgUpload = multer({
  storage: multerS3({
    s3,
    bucket: 'circlereactapp',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: 'TESTING_META_DATA' });
    },
    key: function (req, file, cb) {
      cb(null, path.basename(file.originalname, path.extname(file.originalname)) + '-' + Date.now().toString() + path.extname(file.originalname));
    }
  }),
  limits: { fileSize: 5000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single('profileImage');

// check file type

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif|heic/;
  //check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // check mime
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}


module.exports = profileImgUpload;
