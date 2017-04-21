var express = require('express');
var router = express.Router();
var contUser = require('../controllers/user');


router.get('/', contUser.getAll)

router.post('/', contUser.createUser)

router.get('/user/:id', contUser.userFindOne)

router.delete('/:id', contUser.deleteUser)



module.exports = router;
