const express = require('express');
const users = express.Router();
const cors = require('cors');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

users.use(cors());

process.env.SECRET_KEY = 'secret';

exports.register = (req, res, next) => {
  const userObject = req.body
  const userData = {
    email: userObject.email,
    password: userObject.password,
    firstName: userObject.firstName,
    secondName: userObject.secondName,
  }

  User.findOne({
      where: {
        email: userObject.email
      }
    })
    .then(user => {
      if (!user) {
        bcrypt.hash(userObject.password, 10, (err, hash) => {
          userData.password = hash
          User.create(userData)
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
      where: {
        email: userObject.email
      }
    })
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
            expiresIn: '24h'
          })
          res.send(token)
        }
      } else {
        res.status(400).json({
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

exports.profile = (req, res, next) => {
  let decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

  User.findOne({
      where: {
        id: 1
      }
    })
    .then(user => {
      if (user) {
        res.json(user)
      } else {
        res.send('User does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}