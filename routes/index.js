var express = require('express');
var router = express.Router();

// router.post('/login', contUser.loginUser)
router.post('/', function(req, res) {
  res.send("aLIVE")
})


module.exports = router;
