const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const GroupSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String
  },
  title: {
    type: String,
    required: true
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
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  posts: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'posts'
      }
    }
  ]
});

module.exports = mongoose.model('group', GroupSchema);