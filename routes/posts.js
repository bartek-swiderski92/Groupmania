const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = '';

const postCtrl = require('../controllers/posts');

router.get('/', auth, postCtrl.getAllPosts);
router.get('/:id', auth, postCtrl.getOnePost);
router.post('/', auth, postCtrl.createAPost);
router.put('/', auth, postCtrl.editPost);
router.delete('/:id', auth, postCtrl.deletePost);

module.exports = router;