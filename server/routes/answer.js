const router = require('express').Router();
const answerController = require('../controllers/answer');
const authentication = require('../middleware/authentication');
const authorization = require('../middleware/authorizationAnswer');

router.use(authentication);

router.get('/:id', answerController.findOne);
router.put('/:id', answerController.updateOne);
router.post('/', answerController.addAnswer);
router.post('/upvote/:id', answerController.upvote);
router.post('/downvote/:id', answerController.downvote);
router.post('/comment', answerController.addAnswerComment);
router.delete('/:id', authorization, answerController.deleteAnswer);

module.exports = router;