const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const commentCtrl = require('../controllers/comment');

// router.get('/post/:id', auth, commentCtrl.getAllCommentsOfAPost);
// router.delete('/post/:id', auth, commentCtrl.removeAllCommentsOfAPost);
router.post('/', auth, multer, commentCtrl.createAComment);
router.put('/', auth, multer, commentCtrl.editComment);
router.delete('/', auth, commentCtrl.deleteComment);

module.exports = router;