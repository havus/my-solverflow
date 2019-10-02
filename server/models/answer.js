const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'user id is required!']
  },
  text: {
    type: String,
    required: [true, 'Text answer required!'],
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    }
  ],
  up_votes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, 'user id is required!'],
    }
  ],
  down_votes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, 'user id is required!'],
    }
  ],
}, { timestamps: true, versionKey: false });

const Answer = mongoose.model('Answer', AnswerSchema);

module.exports = Answer;