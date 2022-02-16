const express = require('express');
const users = express.Router();
const cors = require('cors');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const db = require("../models/index.js");

users.use(cors());

process.env.SECRET_KEY = 'secret';

exports.register = (req, res, next) => {
  const userObject = req.body;
  db.User.findOne({
    where: {
      email: userObject.email
    }
    // ,
    // attributes: {
    //   exclude: ['postPostId']
    // }
  })
    .then(user => {
      if (!user) {
        bcrypt.hash(userObject.password, 10, (err, hash) => {
          userObject.password = hash
          db.User.create(userObject)
            .then(user => {
              res.status(201).json({
                status: 'User ' + user.email + ' has successfully been registered',
                user
              });
            })
            .catch(err => {
              res.send('ERROR' + err)
            })
        })
      } else {
        res.status(200).json({
          status: "Email already in use, please try again or login."
        })
      }
    })
    .catch(err => {
      res.send('ERROR ' + err)
    })
}

exports.login = (req, res, next) => {
  const userObject = req.body
  db.User.findOne({
    where: {
      email: userObject.email
    },
  })
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(userObject.password, user.password)) {
          const token = jwt.sign({
            id: user.id
          }, 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTYzNDMxMjk0MywiaWF0IjoxNjM0MzEyOTQzfQ.ItNXyQddj_arej08iGQYY6uua2xua9hmNfNGk6bzxX8', {
            expiresIn: '24h'
          });
          res.status(200).json({
            user: user,
            token: token

          });
        } else {
          return res.status(401).json({
            error: 'Incorrect password!'
          })
        }
      } else {
        return res.status(404).json({
          error: 'User does not exist'
        })
      }
    })
    .catch(err => {
      res.status(400).json({
        error: 'Error: ' + err
      })
    })
}

exports.displayProfile = (req, res, next) => {
  db.User.findOne({
    where: {
      id: req.params.id
    },
    attributes: {
      exclude: ['password']
    },
    include: [{ model: db.Post, include: db.ReadPost }, db.Comment, db.Like, db.ReadPost]
  })
    .then((user) => {
      if (user) {
        res.status(200).json(user)
      } else {
        res.status(404).json({
          status: 404,
          message: 'User does not exist'
        });
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}

exports.updateProfile = (req, res, next) => {
  const userObject = req.body
  db.User.findOne({
    where: {
      id: res.locals.userId,
    }
  }).then((user) => {
    if (user) {
      user.update({
        email: userObject.email,
        firstName: userObject.firstName,
        secondName: userObject.secondName,
        profilePicture: userObject.profilePicture,
        gender: userObject.gender,
        DOB: userObject.dob
      }, {
        where: {
          email: userObject.email
        }
      }).then(() => {
        res.status(200).json({
          message: 'User profile updated successfully!',
          user: user
        });
      }).catch(err => {
        res.send(err)
      })
    } else {
      res.send('You cannot access this user.')
    }
  }).catch(err => {
    res.send('error: ' + err)
  })
}

exports.changePassword = (req, res, next) => {
  const userObject = req.body
  db.User.findOne({
    where: {
      id: res.locals.userId,
    }
  }).then(user => {
    if (user) {
      if (bcrypt.compareSync(userObject.password, user.password)) {
        bcrypt.hash(userObject.newPassword, 10, (err, hash) => {
          console.log(hash)
          user.update({
            password: hash
          })
        })
        res.status(200).json({
          status: 'Password has been successfully changed!'
        })
      } else {
        return res.status(401).json({
          error: 'Incorrect password!'
        })
      }
    } else {
      return res.status(404).json({
        error: 'User does not exist'
      })
    }
  })
    .catch(err => {
      res.status(400).json({
        error: "" + err
      })
    })
}

exports.deleteAccount = (req, res, next) => {
  db.User.destroy({
    where: {
      id: res.locals.userId,
    }
  })
    .then((user) => {
      if (user) {
        res.status(200).json({
          success: 'User has been successfully deleted.'
        })
      } else {
        res.status(401).json({
          error: 'You cannot access this request.'
        })
      }
    })
}