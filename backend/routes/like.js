const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = '';

const likeCtrl = require('../controllers/like');

router.get('/', likeCtrl.getAllLikes);
router.post('/', auth, likeCtrl.likeAPost);
router.delete('/:id', auth, likeCtrl.removeLike);


module.exports = router;