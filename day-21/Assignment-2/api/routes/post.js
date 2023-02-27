const express = require('express');
const router = express.Router();

//add controller
const postController = require('../controller/post');

//add middleware for authontication
const checkAuth = require('../middleware/check-auth');

//get requerst for all
router.post('/' , postController.post_create);
// router.get('/' , );
// router.get('/:' , );
// router.patch('/:' , );
// router.delete('/:' , );

module.exports = router;