function errorHandler(err, req, res, next) {
  if (err.name === 'ValidationError') {
    let validation = [];
    for (const key in err.errors) {
      validation.push(err.errors[key].message);
    }
    res.status(400).json({
      code: 400,
      message: validation
    })
  } else if (err.message === 'Wrong username / password' || err.message === 'Question not found') {
    res.status(404).json({
      code: 404,
      message: err.message
    })
  } else if (err.message === `invalid token`) {
    res.status(401).json({
      code: 401,
      message: err.message
    })
  } else if (err.message === `QUESTION_NOT_FOUND` || err.message === 'VOTE_SELF') {
    res.status(400).json({
      code: 400,
      message: err.message
    })
  } else if (err.code === 11000) {
    if (err.errmsg === 'E11000 duplicate key error collection: hacktiv-overflow.users index: username_1 dup key: { : \"\" }') {
      res.status(400).json({
        code: 400,
        message: "Username sudah terdaftar!"
      })
    }
  } else {
    if (err.message === 'Unauthorize' || err.message === 'jwt must be provided' || err.message === 'jwt malformed' || err.message === 'invalid signature') {
      res.status(401).json({
        code: 401,
        message: err.message
      })
    } else {
      res.status(500).json({
        code: 500,
        message: 'internal server error',
      })
    }
  }
  console.log(JSON.stringify(err, null, 2));
}

module.exports = errorHandler;