const express = require('express');
const router = express.Router();
const cors = require('cors');

const userCtrl = require('../controllers/user');

router.use(cors());

process.env.SECRET_KEY = 'secret';

router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);
router.get('/profile/:id', userCtrl.profile);
router.put('/update/:id', userCtrl.updateProfile);

module.exports = router