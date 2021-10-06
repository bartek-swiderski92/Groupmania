const express = require('express');
const router = express.Router();

const auth = '';
const multer = '';

const postCtrl = require('../controllers/posts')

router.get('/', postCtrl.getAllPosts);

module.exports = router;