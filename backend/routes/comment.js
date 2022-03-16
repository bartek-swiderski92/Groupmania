const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const commentCtrl = require('../controllers/comment');

router.get('/post/:id', auth, commentCtrl.getAllCommentsOfAPost);
router.post('/', auth, multer, commentCtrl.createAComment);
router.put('/:id', auth, multer, commentCtrl.editComment);
router.delete('/picture/:id', auth, commentCtrl.deletePicture);
router.delete('/:id', auth, commentCtrl.deleteComment);

module.exports = router;