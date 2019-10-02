const Question = require('../models/question');

module.exports = (req, res, next) => {
  Question.findOne({ _id: req.params.id })
    .then(one => {
      if (one) {
        if (one.user_id == req.payload._id) {
          next()
        } else {
          next({
            message: 'Unauthorize',
          })
        }
      } else {
        next({
          message: 'Question not found'
        })
      }
    })
    .catch( next );
}