const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user')

const users = express.Router();
const cors = require('cors');

users.use(cors());

process.env.SECRET_KEY = 'secret';

router.post('/register', userCtrl.register)
router.post('/login', userCtrl.login)
router.get('/profile', userCtrl.profile)

module.exports = router

//TODO: check the comments VV

// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');

// const User = require('../models/user');

// users.post('/register', (req, res) => {
//   const userObject = req.body
//   const userData = {
//     email: userObject.email,
//     password: userObject.password,
//     firstName: userObject.firstName,
//     secondName: userObject.secondName,
//   }

//   User.findOne({
//       where: {
//         email: userObject.email
//       }
//     })
//     .then(user => {
//       if (!user) {
//         bcrypt.hash(userObject.password, 10, (err, hash) => {
//           userData.password = hash
//           User.create(userData)
//             .then(user => {
//               res.json({
//                 status: user.email + 'REGISTERED'
//               })
//             })
//             .catch(err => {
//               res.send('ERROR' + err)
//             })
//         })
//       } else {
//         res.json({
//           error: "USER ALREADY EXISTS"
//         })
//       }
//     })
//     .catch(err => {
//       res.send('ERROR ' + err)
//     })
// })

// users.post('/login', (req, res) => {
//   User.findOne({
//       where: {
//         email: userObject.email
//       }
//     })
//     .then(user => {
//       if (user) {
//         //TODO: bcrypt? secret key? expiresIn?
//         if (bcrypt.compareSync(req.body.password, user.password)) {
//           let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
//             expiresIn: 1440
//           })
//           res.send(token)
//         }
//       } else {
//         res.status(400).json({
//           error: 'User does not exist'
//         })
//       }
//     })
//     .catch(err => {
//       res.status(400).json({
//         error: err
//       })
//     })
// })

// users.get('/profile', (req, res) => {
//   let decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

//   User.findOne({
//     where: {
//       id: decoded.id
//     }
//   })
//   .then(user => {
//     if (user) {
//       res.json(user) 
//     } else {
//       res.send('User does not exist')
//     }
//   })
//   .catch(err =>{
//     res.send('error: ' + err)
//   })
// })

