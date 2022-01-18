const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const commentCtrl = require('../controllers/comment');

// router.get('/post/:id', auth, commentCtrl.getAllCommentsOfAPost);
// router.delete('/post/:id', auth, commentCtrl.removeAllCommentsOfAPost);
router.post('/', commentCtrl.createAComment);
router.put('/', auth, commentCtrl.editComment);
router.delete('/:id', auth, commentCtrl.deleteComment);

module.exports = router;