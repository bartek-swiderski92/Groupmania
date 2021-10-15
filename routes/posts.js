const express = require('express');
const router = express.Router();

const auth = '';
const multer = '';

const postCtrl = require('../controllers/posts');

router.get('/', postCtrl.getAllPosts);
router.get('/:id', postCtrl.getOnePost);
router.post('/', postCtrl.createAPost);
router.put('/', postCtrl.editPost);
router.delete('/:id', postCtrl.deletePost);

module.exports = router;