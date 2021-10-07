const express = require('express');
const router = express.Router();

const auth = '';
const multer = '';

const postCtrl = require('../controllers/posts')

router.get('/', postCtrl.getAllPosts);
router.get('/post/:id', postCtrl.getOnePost);
router.post('/post', postCtrl.createAPost);
router.delete('post/:id', postCtrl.deletePost);


module.exports = router;