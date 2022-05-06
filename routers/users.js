const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');


router.post('/', usersController.create);
router.get('/login', usersController.login);

module.exports = router;