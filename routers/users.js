const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');


router.post('/', usersController.create);
router.post('/login', usersController.login);
router.post('/token', usersController.getByToken);

module.exports = router;