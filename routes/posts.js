const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Post = require('../models/post');

router.get('/', (req, res) => Post.findAll()
    .then(posts => {
        console.log(posts)
        res.sendStatus(200)
    })
    .catch(err => console.log(err))
);

module.exports = router;