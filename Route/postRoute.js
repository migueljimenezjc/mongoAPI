let router = require('express').Router();

const postController = require('../Controllers/postController');

router.route('/').get(postController.init)


module.exports = router;