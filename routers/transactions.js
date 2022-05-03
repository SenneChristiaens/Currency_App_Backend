const express = require('express');
const router = express.Router();
const transactionsController = require('../controllers/transactions');


router.get('/', transactionsController.get);
router.post('/', transactionsController.create);
router.get('/:id', transactionsController.getById);


module.exports = router;