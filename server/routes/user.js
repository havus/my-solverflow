const router = require('express').Router();
const userController = require('../controllers/user');
const authentication = require('../middleware/authentication');

router.get('/', authentication, userController.decode);
router.post('/signup', userController.signUp);
router.post('/signin', userController.signIn);

module.exports = router;