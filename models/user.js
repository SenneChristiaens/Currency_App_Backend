const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:  String,
    password: String,
    balance: String,
    id: String
});

userSchema.statics.getSize = async function() {
    const res = await this.findAll();
    return Object.keys(res.data.users).length;
};

const User = mongoose.model('User', userSchema);

module.exports = User;