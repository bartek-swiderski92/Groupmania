const express = require('express');
const users = express.Router();
const cors = require('cors');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

users.use(cors());

process.env.SECRET_KEY = 'secret';

exports.register = (req, res, next) => {
  console.log(req.body);
  const userObject = req.body;
  // bcrypt.hash(req.body.password, 10).then((hash) => {
  //   console.log(hash);
  //   
  //   const user = new User({
  //     email: userObject.email,
  //     password: hash,
  //     firstName: userObject.firstName,
  //     secondName: userObject.secondName,
  //     profilePicture: 'url',
  //     isAdmin: false
  //   });
  //   user.save().then(() => {
  //     res.status(201).json({
  //       message: 'User registered successfully!'
  //     });
  //   }).catch((error) => {
  //     res.status(500).json({
  //       error: error
  //     });
  //   });
  // });


  //TODO: where: ?
  User.findOne({
      where: {
        email: userObject.email
      },
      attributes: {
        exclude: ['postPostId']
      }
    })
    .then(user => {
      if (!user) {
        bcrypt.hash(userObject.password, 10, (err, hash) => {
          userObject.password = hash
          // const user = new User({
          //   email: userObject.email,
          //   password: hash,
          //   firstName: userObject.firstName,
          //   secondName: userObject.secondName,
          //   profilePicture: 'url',
          //   isAdmin: false
          // });
          User.create(userObject)
            .then(user => {
              res.json({
                status: user.email + 'REGISTERED'
              })
            })
            .catch(err => {
              res.send('ERROR' + err)
            })
        })
      } else {
        res.json({
          error: "USER ALREADY EXISTS"
        })
      }
    })
    .catch(err => {
      res.send('ERROR ' + err)
    })
}

exports.login = (req, res, next) => {
  const userObject = req.body
  User.findOne({
      // where: 
      email: userObject.email
    })
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
            expiresIn: '24h'
          })
          res.send(token)
        } else {
          return res.status(401).json({
            error: new Error('Incorrect password!')
          })
        }
      } else {
        res.status(401).json({
          error: new Error('User does not exist')
        })
      }
    })
    .catch(err => {
      res.status(400).json({
        error: err
      })
    })
}

exports.profile = (req, res, next) => {
  // let decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
  console.log(req.params.id);
  User.findOne({
      where: {
        userId: req.params.id
      // },
      // attributes: {
      //   exclude: ['postPostId']
      }
    })
    .then((user) => {
      if (user) {
        res.json(
          user
        )
      } else {
        res.send('User does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}

exports.updateProfile = (req, res, next) => {
  User.findOne({
    id: req.params.id
  }).then((user) => {
    const userObject = req.body

    user = {
      email: userObject.email,
      password: hash,
      firstName: userObject.firstName,
      secondName: userObject.secondName,
      profilePicture: userObject.profilePicture,
      gender: userObject.gender,
      DOB: userObject.dob,
    }
  })
}