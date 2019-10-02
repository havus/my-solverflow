const Comment = require('../models/comment');
const Question = require('../models/question');

class CommentController {
  static addComment(req, res, next) {
    const { user_id, question_id, text } = req.body;
    Comment.create({ user_id, text })
      .then(data => {
        return Question.update(
          { _id: question_id }, 
          { $push: {comments: data._id} }
        )
      })
      .then(data => {
        res.status(201).json({ message: 'Comment created!' })
      })
      .catch( next );
  }

  static deleteComment(req, res, next) {
    Comment.deleteOne({ _id: req.params.id })
      .then(() => {
        res.status(200).json({ message: 'Comment deleted!' })
      })
      .catch( next );
  }
}

module.exports = CommentController;