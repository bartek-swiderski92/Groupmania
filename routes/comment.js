const express = require('express');
const router = express.Router();

const auth = '';
const multer = '';

const commentCtrl = require('../controllers/comment');

router.get('/post/:id', commentCtrl.getAllCommentsOfAPost);
router.delete('/post/:id', commentCtrl.removeAllCommentsOfAPost);
router.post('/', commentCtrl.createAComment);
router.put('/', commentCtrl.editComment);
router.delete('/:id', commentCtrl.deleteComment);

module.exports = router;