const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// const Post = require('../../models/Post');
const User = require('../../models/User');
const Group = require('../../models/Group');
const checkObjectId = require('../../middleware/checkObjectId');
const { check, validationResult } = require('express-validator');
const Post = require('../../models/Post');



//POST api/groups
//Create a group w/users and posts
//Private

router.post(
  '/',
  [
    auth,
    [
      check('title', 'Group Title is required').not().isEmpty()
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
        title: req.body.title,
        user: req.user.id,
        name: user.name
      });

      const group = await newGroup.save();

      res.json(group);

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }

  }
);

//GET api/groups
//Get all groups
//Private

router.get('/', auth, async (req, res) => {
  try {
    const groups = await Group.find().sort({ date: -1 });
    res.json(groups);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//GET api/groups/:id
//Get group by id
//Private

router.get('/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);

    if (!group) {
      return res.status(404).json({ msg: 'Group not found' });
    }

    res.json(group);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});


//DELETE api/groups/:id
//Delete a group
//Private

router.delete('/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);

    if (!group) {
      return res.status(404).json({ msg: 'group not found' });
    }

    // Check user
    if (group.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await group.remove();

    res.json({ msg: 'group removed' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

//POST api/groups/user/:id
//Add user to group
//Pivate

router.post(
  '/user/:id',
  [
    auth,
    checkObjectId('id'),
    [check('name', 'name is required').not().isEmpty()]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    try {

      const user = await User.findById(req.user.id).select('-password');
      const group = await Group.findById(req.params.id);

      const groupUser = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      };

      group.members.unshift(groupUser);

      await group.save();

      res.json(group.members);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//PUT api/groups/user/:id/post:id
//add a post to user in group
//Private


module.exports = router;