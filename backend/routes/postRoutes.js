const express = require('express');
const { body } = require('express-validator');

const postController = require('../controllers/postController');
const router = express.Router();
const isAuth = require('../middleware/isAuth');


router.post('/post', [
    body('description')
        .not()
        .isEmpty()
        .withMessage("Make sure you write the description"),
], isAuth, postController.createPost)



router.post('/comment', isAuth, body('content').not().isEmpty().withMessage('Write some content'), postController.createComment)

router.get('/post', postController.getPosts);

router.get('/post/single/:postId', postController.getPost);

router.get('/search', postController.searchPosts);

router.put('/post/:postId', [
    body('description').not().isEmpty().withMessage("Make sure you write the description"),
], isAuth, postController.updatePost);

router.put('/post/reaction/:postId', postController.addReaction)

router.delete('/post/:postId', isAuth, postController.deletePost);

module.exports = router;