const Answer = require('../models/answer');

module.exports = (req, res, next) => {
  Answer.findOne({ _id: req.params.id })
    .then(one => {
      if (one.user_id == req.payload._id) {
        next()
      } else {
        next({
          code: 401,
          message: 'Unauthorize',
        })
      }
    })
    .catch( next );
}