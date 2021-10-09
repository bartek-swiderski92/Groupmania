const express = require('express');
const router = express.Router();

const auth = '';
const multer = '';

const commentCtrl = require('../controllers/comment');

router.get('/post/:id', commentCtrl.getAllCommentsOfAPost);
// router.get('/:id', commentCtrl.getOnePost);
router.post('/', commentCtrl.createAComment);
router.put('/:id', commentCtrl.editComment);
router.delete('/:id', commentCtrl.deleteComment);

module.exports = router;