const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url');
// const checkObjectId = require('../../middleware/checkObjectId');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');
const profileImgUpload = require('../../services/file-upload');
const generateGetUrl = require('../../services/file-upload');
const { data } = require('jquery');



//GET api/profile/me
//Get current user's profile
//Private

router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    })
      .populate('user', ['name', 'avatar']);

    if (!profile) {
      return res
        .status(400)
        .json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .send('Server Error');
  }
});

//POST api/profile
//Create or update user's profile
//Private

router.post(
  '/',
  [
    auth,
    [
      check('status', 'Status is required').not().isEmpty(),
      check('skills', 'Skills is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      company,
      location,
      website,
      bio,
      skills,
      status,
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook,
      image,
      imageLocation
    } = req.body;

    // build profile object
    const profileFields = {
      user: req.user.id,
      company,
      location,
      website: website && website !== '' ? normalize(website, { forceHttps: true }) : '',
      bio,
      skills: Array.isArray(skills)
        ? skills
        : skills.split(',').map((skill) => ' ' + skill.trim()),
      status,
      image,
      imageLocation
    };

    // Build social object and add to profileFields
    const socialfields = { youtube, twitter, instagram, linkedin, facebook };

    for (const [key, value] of Object.entries(socialfields)) {
      if (value && value.length > 0)
        socialfields[key] = normalize(value, { forceHttps: true });
    }
    profileFields.social = socialfields;

    try {
      // Using upsert option (creates new doc if no match is found):
      let profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true }
      );
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);


//GET api/profile;
//Get all profiles
//public

router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//GET api/profile / user /: user_id;
//Get profile by user Id
//public

router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);

    if (!profile)
      return res.status(400).json({ msg: "Profile not found" });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.status(500).send('Server Error');
  }
});

//DELETE api/profile;
//delete profile, user and posts
//private

router.delete('/', auth, async (req, res) => {
  try {
    // @todo --- remove users posts
    await Post.deleteMany({ user: req.user.id });
    // remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User Removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//PUT api/profile / experience;
//add profile experience
//private

router.put('/experience', [auth, [
  // check('title', 'Title is required')
  //   .not()
  //   .isEmpty(),
  // check('company', 'Company is required')
  //   .not()
  //   .isEmpty(),
  // check('from', 'From date is required')
  //   .not()
  //   .isEmpty(),
]
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //destructuring
  const {
    title,
    company,
    location,
    from,
    to,
    current,
    description
    //pull out from: 
  } = req.body;

  const newExp = {
    title,
    company,
    location,
    from,
    to,
    current,
    description
  };

  try {
    const profile = await Profile.findOne({ user: req.user.id });

    profile.experience.unshift(newExp);

    await profile.save();

    res.json(profile);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}
);

//DELETE api/profile / experience /: exp_id;
//delete profile experience
//private

router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    //get remove index
    const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);

    profile.experience.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }

});

//PUT api/profile / education;
//add profile education
//private

router.put('/education', [auth, [
  // check('school', 'School is required')
  //   .not()
  //   .isEmpty(),
  // check('degree', 'Degree is required')
  //   .not()
  //   .isEmpty(),
  // check('fieldofstudy', 'Field of Study is required')
  //   .not()
  //   .isEmpty(),
  // check('from', 'From date is required')
  //   .not()
  //   .isEmpty(),
]
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //destructuring
  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
    //pull out from: 
  } = req.body;

  const newEdu = {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  };

  try {
    const profile = await Profile.findOne({ user: req.user.id });

    profile.education.unshift(newEdu);

    await profile.save();

    res.json(profile);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}
);

//DELETE api/profile / education /: edu_id;
//delete profile education
//private

router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    //get remove index
    const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);

    profile.education.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }

});

router.post('/profile-img-upload', auth, (req, res) => {
  profileImgUpload(req, res, async (error) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      // console.log( 'requestOkokok', req.file );
      // console.log( 'error', error );
      if (error) {
        console.log('errors', error);
        res.json({ error: error });
      } else {
        // If File not found
        if (req.file === undefined) {
          console.log('Error: No File Selected!');
          res.json('Error: No File Selected');
        } else {

          await profile.save();
          // If Success
          const imageName = req.file.key;
          const imageLocation = req.file.location;
          // Save the file name into database into profile model

          // res.json(profile);
          res.json({
            image: imageName,
            location: imageLocation
          });
        }
      }
    } catch (err) {
      console.error(err.message);
    }
  });
});

router.get('/generate-image', (req, res) => {

  const { Key } = req.query;

  generateGetUrl(Key)
    .then(getUrl => {
      res.send(getUrl);
    }).catch(err => {
      res.send(err);
    });
});



module.exports = router;
