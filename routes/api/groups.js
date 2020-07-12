const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// const Post = require('../../models/Post');
const User = require('../../models/User');
const Group = require('../../models/Group');
// const checkObjectId = require('../../middleware/checkObjectId');
const { check, validationResult } = require('express-validator');



// @route     POST api/groups
// @desc      Create a group w/users and posts
// @access    Private

router.post(
  '/',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newGroup = new Group({
        title: req.body.text,
        user: req.user.id,
        // name: user.body.name,
        avatar: user.avatar
      });

      const group = await newGroup.save();

      res.json(group);

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }

  }
);

module.exports = router;