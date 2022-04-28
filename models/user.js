const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:  String,
    password: String,
    balance: String,
    id: String
});

userSchema.statics.findAll = async function() {
return {
        status: "success",
        message: "GETTING users",
        data: {
            users: await this.find({})
        }
    }
};

userSchema.statics.getById = async function(searchId) {
    return {
        status: "success",
        message: "GETTING user " + searchId,
        data: {
            users: await this.find({ id: searchId })
        }
    }
  };

userSchema.statics.getByUser = async function(userName) {
    return {
        status: "success",
        message: "GETTING user with username " + userName,
        data: {
            users: await this.find({ username: userName })
        }
    }
  };

userSchema.statics.getSize = async function() {
    const res = await this.findAll();
    return Object.keys(res.data.users).length;
};

const User = mongoose.model('User', userSchema);

module.exports = User;