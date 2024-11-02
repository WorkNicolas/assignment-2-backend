var express = require('express');
var router = express.Router();

let userController = require('../controllers/user');

// Routes for user controller
router.get('/', userController.list);
router.post('/', userController.create);
router.get('/:userID', userController.userGet, userController.userByID);
router.put('/:userID', userController.update);
router.delete('/:userID', userController.delete);

module.exports = router;
