const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const GroupSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  title: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  members: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  posts: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'posts'
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      }
    }
  ]
});

module.export = mongoose.model('group', GroupSchema);