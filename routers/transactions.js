const express = require('express');
const router = express.Router();
const transactionsController = require('../controllers/transactions');


router.post('/', transactionsController.get);
router.post('/create', transactionsController.create);
router.get('/:id', transactionsController.getById);


module.exports = router;