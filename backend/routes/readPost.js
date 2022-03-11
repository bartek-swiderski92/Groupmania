const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = '';

const readPost = require('../controllers/readPost');

router.post('/:id', auth, readPost.markAsRead);
router.delete('/:id', auth, readPost.markAsUnread);


module.exports = router;