const express = require('express');
const router = express.Router();

const auth = '';
const multer = '';

const postCtrl = require('../controllers/posts');
const likeCtrl = require('../controllers/like');

router.get('/', postCtrl.getAllPosts);
router.get('/:id', postCtrl.getOnePost);
router.post('/', postCtrl.createAPost);
router.delete('/:id', postCtrl.deletePost);
router.post('/like/:id', postCtrl.likeAPost);

module.exports = router;