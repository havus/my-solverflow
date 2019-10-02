const Comment = require('../models/comment');

module.exports = (req, res, next) => {
  Comment.findOne({ _id: req.params.id })
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