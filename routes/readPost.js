const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = '';

const readPost = require('../controllers/readPost');

//TODO: Add Auth
router.post('/markAsRead', readPost.markAsRead);
// router.delete('/:markAsUnread', auth, readPost.removeLike);


module.exports = router;