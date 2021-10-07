const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user')

//TODO: does it make sense? VV
const users = express.Router();
const cors = require('cors');

//TODO: does it make sense? VV
users.use(cors());

process.env.SECRET_KEY = 'secret';

router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);
router.get('/profile/:id', userCtrl.profile);
router.put('/update-profile/:id', userCtrl.updateProfile);

module.exports = router