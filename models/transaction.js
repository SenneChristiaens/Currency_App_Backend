const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transansactionSchema = new Schema({
    sender:  String,
    receiver: String,
    amount: String,
    id: String
});



const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;