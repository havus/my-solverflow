const router = require('express').Router();
const questionContoller = require('../controllers/question');
const authentication = require('../middleware/authentication');
const authorization = require('../middleware/authorizationQuestion');

router.use(authentication);

router.post('/', questionContoller.create);

router.put('/:id', authorization, questionContoller.editQuestion);

router.get('/', questionContoller.findAll);

router.get('/:id', questionContoller.findOne);

router.post('/upvote/:id', questionContoller.upvote);

router.post('/downvote/:id', questionContoller.downvote);

router.post('/tags/:id', authorization, questionContoller.addTags);

router.get('/tags/:tag', questionContoller.getTags);

router.get('/tag/:tag', questionContoller.getAllInclude);



let popularTag = '';

const CronJob = require('cron').CronJob;
new CronJob('* 3 * * * *', function() {
  questionContoller.popular()
  .then(data => {
    let highest = 0;
    for (const key in data) {
      if (data[key] > highest) {
        highest = data[key];
        popularTag = key;
      }
    }
    console.log(popularTag);
  })
}, null, true, 'Asia/Jakarta');

// CRON <<<<<<<<<<<<<<<<<<<<
router.get('/popular/tag', (req, res, next) => {
  questionContoller.getPopularTag(popularTag)
    .then(filter => {
      res.status(200).json({ filter });
    })
    .catch( next )
});

router.delete('/:id', authorization, questionContoller.deleteQuestion);

module.exports = router;