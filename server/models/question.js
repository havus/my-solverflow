const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, 'user id is required!'],
  },
  title: {
    type: String,
    required: [true, 'Title required for question!'],
  },
  text: {
    type: String,
    required: [true, 'Text required for question!'],
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    }
  ],
  answers: [
    {
      type: Schema.Types.ObjectId,
      ref: "Answer",
    }
  ],
  tags: {
    type: Array,
  },
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

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;