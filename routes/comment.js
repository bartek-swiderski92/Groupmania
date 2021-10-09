const express = require('express');
const router = express.Router();

const auth = '';
const multer = '';

const commentCtrl = require('../controllers/comment');

// router.get('/', commentCtrl.getAllPosts);
// router.get('/:id', commentCtrl.getOnePost);
router.post('/', commentCtrl.createAComment);
// router.put('/:id', commentCtrl.editPost);
// router.delete('/:id', commentCtrl.deletePost);

module.exports = router;