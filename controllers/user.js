const express = require('express');
const users = express.Router();
const cors = require('cors');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

users.use(cors());

process.env.SECRET_KEY = 'secret';

exports.register = (req, res, next) => {
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
          User.create(userObject)
            .then(user => {
              res.status(201).json(user);
              res.json({
                status: 'User ' + user.email + ' has successfully been registered'
              })
            })
            .catch(err => {
              res.send('ERROR' + err)
            })
        })
      } else {
        res.json({
          error: "User already exists."
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
      where: {
        email: userObject.email
      }
    })
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(userObject.password, user.password)) {
          // let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
          //   expiresIn: '24h'
          // })
          // res.send(token)
          const token = jwt.sign({
            userId: user._id
          }, process.env.SECRET_KEY, {
            expiresIn: '24h'
          });
          res.status(200).json({
            userId: user._id,
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
        error: err
      })
    })
}

exports.displayProfile = (req, res, next) => {
  // let decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
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
  const userObject = req.body
  User.findOne({
    where: {
      userId: userObject.userId
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
          success: 'User profile updated successfully!'
        });
      }).catch(err => {
        res.send(err)
      })
    } else {
      res.send('User does not exist')
    }
  }).catch(err => {
    res.send('error: ' + err)
  })
}

exports.changePassowrd = (req, res, next) => {}