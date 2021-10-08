const express = require('express');
const router = express.Router();

const auth = '';
const multer = '';

const likeCtrl = require('../controllers/like');

router.post('/', likeCtrl.likeAPost);
router.delete('/:id', likeCtrl.removeLike);


module.exports = router;