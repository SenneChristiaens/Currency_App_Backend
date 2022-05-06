const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname:  String,
    lastname: String,
    password: String,
    balance: String
});

userSchema.statics.getSize = async function() {
    const res = await this.findAll();
    return Object.keys(res.data.users).length;
};

const User = mongoose.model('User', userSchema);

module.exports = User;