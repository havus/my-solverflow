const router = require('express').Router();
const CommentController = require('../controllers/comment');
const authentication = require('../middleware/authentication');
const authorization = require('../middleware/authorizationComment');

router.use(authentication);

router.post('/', CommentController.addComment);
router.delete('/:id', authorization, CommentController.deleteComment);

module.exports = router;