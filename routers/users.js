const express = require('express');
const router = express.Router();
const transactionsController = require('../controllers/transactions');


router.get('/:user/transactions', transactionsController.getByUser);


module.exports = router;