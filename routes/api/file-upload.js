// const express = require('express');
// const router = express.Router();

// const profileImgUpload = require('../../services/file-upload');

// // const singleUpload = upload.single('image');
// //profile
// router.post('/profile-img-upload', function (req, res) {

//   profileImgUpload(req, res, function (err) {


//     if (err) {
//       return res.status(422).send({ errors: [{ title: 'File Upload Error', detail: err.message }] });
//     }

//     const imageName = req.file.key;
//     const imageLocation = req.file.location;

//     return res.json({
//       image: imageName,
//       location: imageLocation
//     });

//   });

// });

// module.exports = router;