const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

// const config = require('../config/default.json');

aws.config.update({
  secretAccessKey: "USszmyfiO7DrtoxkhAsDTJQVMLBe19xEgaEUnrEu",
  accessKeyId: "AKIAJRO2MRSWKHW36RIQ",
  region: 'us-east-2'
});

const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Invalid Mime Type, only JPEG and PNG'), false);
  }
};

const upload = multer({
  fileFilter,
  storage: multerS3({
    s3,
    bucket: 'circlereactapp',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: 'TESTING_META_DATA' });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    }
  })
});


module.exports = upload;
