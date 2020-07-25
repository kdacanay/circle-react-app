const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
require('dotenv').config();
// const url = require('url');

// const config = require('../config/default.json');

aws.config = new aws.Config({
  accessKeyId: process.env.S3_KEY,
  secretAccessKey: process.env.S3_SECRET,
  region: process.env.BUCKET_REGION
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
