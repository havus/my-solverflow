const Answer = require('../models/answer');
const Question = require('../models/question');
const Comment = require('../models/comment');

class AnswerController {
  static addAnswer(req, res, next) {
    const { question_id, text } = req.body;
    Answer.create({ user_id: req.payload._id, text })
      .then(data => {
        return Question.updateOne(
          { _id: question_id }, 
          { $push: {answers: data._id} }
        )
      })
      .then(data => {
        res.status(201).json({ message: 'Answer created!' })
      })
      .catch( next );
  }
  
  static addAnswerComment(req, res, next) {
    const { user_id, answer_id, text } = req.body;
    
    Comment.create({ user_id, text })
      .then(data => {
        return Answer.updateOne(
          { _id: answer_id },
          { $push: { comments: data._id} }
        )
      })
      .then(() => {
        res.status(201).json({ message: 'Comment answer created!' })
      })
      .catch( next );
  }

  static deleteAnswer(req, res, next) {
    Answer.deleteOne({ _id: req.params.id })
      .then(() => {
        res.status(200).json({ message: 'Answer deleted!' })
      })
      .catch( next );
  }

  static upvote(req, res, next) {
    Answer.findOne({ _id: req.params.id })
      .then(one => {
        if (one) {
          if (one.user_id == req.payload._id) {
            return 'VOTE_SELF';
          } else {  
            return Answer.updateOne(
              { _id: req.params.id },
              { $pull: { down_votes: req.payload._id } }
            )
          }
        } else {
          return 'ANSWER_NOT_FOUND';
        }
      })
      .then(message => {
        if (message === 'ANSWER_NOT_FOUND' || message === 'VOTE_SELF') {
          return message;
        } else {
          return Answer.updateOne(
            { _id: req.params.id },
            { $addToSet: { up_votes: req.payload._id } }
          )
        }
      })
      .then(message => {
        if (message === 'ANSWER_NOT_FOUND'|| message === 'VOTE_SELF') {
          next({ message })
        } else {
          res.status(200).json({ message: 'Voted up!' })
        }
      })
      .catch( next )
  }
  
  static downvote(req, res, next) {
    Answer.findOne({ _id: req.params.id })
      .then(one => {
        if (one) {
          if (one.user_id == req.payload._id) {
            return 'VOTE_SELF';
          } else {  
            return Answer.updateOne(
              { _id: req.params.id },
              { $pull: { up_votes: req.payload._id } }
            )
          }
        } else {
          return 'ANSWER_NOT_FOUND';
        }
      })
      .then(message => {
        if (message === 'ANSWER_NOT_FOUND' || message === 'VOTE_SELF') {
          return message;
        } else {
          return Answer.updateOne(
            { _id: req.params.id },
            { $addToSet: { down_votes: req.payload._id } }
          )
        }
      })
      .then(message => {
        if (message === 'ANSWER_NOT_FOUND'|| message === 'VOTE_SELF') {
          next({ message })
        } else {
          res.status(200).json({ message: 'Voted down!' })
        }
      })
      .catch( next )
  }

  static findOne(req, res, next) {
    Answer.findOne({ _id: req.params.id })
      .then( data => {
        res.status(200).json(data);
      })
      .catch( next );
  }

  static updateOne(req, res, next) {
    Answer.updateOne({ _id: req.params.id }, { text: req.body.text })
      .then(_=> {
        res.status(200).json({ message: 'Answer Updated!' });
      })
      .catch( next );
  }
}

module.exports = AnswerController;