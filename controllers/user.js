const db = require('../models/user')
const jwt = require('jsonwebtoken');
const pwh = require('password-hash');
require('dotenv').config()

let createUser = function(req, res) {
  let newUser = new db({
    name     : req.body.name,
    username : req.body.username,
    email    : req.body.email,
    password : pwh.generate(req.body.password),
    article  : []
  })

  newUser.save(function(err, data) {
    if (!err) {
      let newToken = jwt.sign({username: data.username}, process.env.SECRET_WORD)
      res.send({success: true, msg:'User success created', token: newToken, id: data._id, username: data.username})
    } else {
      res.send({success: false, msg: err})
    }
  })
}

let getAll = function(req, res) {
  db.find({})
    .populate({path: "article", select: ['title']})
    .exec(function(err, data) {
      if (err) {
        res.send({msg: err.message})
      } else {
        res.send(data)
      }
    })
}

let userFindOne = function(req, res) {
  db.findOne({_id: req.params.id})
    .populate({path: 'article'})
    .exec(function(err, result) {
      if (!err) {
        res.send({success: true, msg: "Success", data: result})
      } else{
        res.send({success: false, msg: "Gagal get data",  data:null})
      }
    })
}

let deleteUser = function(req, res) {
  db.findByIdAndRemove(req.params.id,
    function(err, data) {
      if (err) {
        res.send(err.message)
      } else {
        res.send("User success deleted !")
      }
    })
}

let loginUser = function(req, res) {
  db.findOne({'username' : req.body.username}, function(err, user) {
    if (err || user == null) {
      res.send({success: false, msg: 'username not found !'})
    } else {
      if (pwh.verify(req.body.password,user.password)) {
        let newToken = jwt.sign({username: user.username}, process.env.SECRET_WORD)
        res.send({success: true, msg: 'Your Login success !', token: newToken, id: user._id, username: user.username})
      } else {
        res.send({success: false, msg: 'Username or Password is wrong'})
      }
    }
  })
}

module.exports = {
  createUser,
  getAll,
  userFindOne,
  deleteUser,
  loginUser
}
