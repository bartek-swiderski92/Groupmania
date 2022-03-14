const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const postCtrl = require('../controllers/post');

router.get('/', postCtrl.getAllPosts);
router.get('/unread', auth, postCtrl.showAllUnreadPosts);
router.get('/:id', postCtrl.getOnePost);
router.post('/', auth, multer, postCtrl.createAPost);
router.put('/:id', auth, multer, postCtrl.editPost);
router.delete('/picture/:id', auth, postCtrl.deletePicture);
router.delete('/:id', auth, postCtrl.deletePost);


module.exports = router;