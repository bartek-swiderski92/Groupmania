const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = '';

const readPost = require('../controllers/readPost');

//TODO: Add Auth
// router.get('/', auth, readPost.showAllUnreadPosts);
router.post('/:id', auth, readPost.markAsRead);
router.delete('/:id', auth, readPost.markAsUnread);


module.exports = router;