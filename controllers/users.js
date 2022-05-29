const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secret = `DKjYb*_hszHTC=jQ>-#@Q%-^wldJ'a`;

const getByToken = async (req, res) => {
  let decoded;
  try {
    decoded = jwt.verify(req.body.token, secret);

    res.send({
      status: "success",
      data: decoded,
    });
  } catch (e) {
    res.send({
      status: "error",
      message: "Incorrect token",
    });
  }
};

const getNameByEmail = async (req, res) => {
  try {
    jwt.verify(req.body.token, secret);

    let searchUser = await User.find({ email: req.body.email });
    searchUser = searchUser[0];
    res.send({
      status: "success",
      message: "GETTING name from email " + req.body.email,
      data: {
        firstname: searchUser.firstname,
        lastname: searchUser.lastname,
      },
    });
  } catch (e) {
    res.send({
      status: "error",
      message: "Incorrect token",
    });
  }
};

const updateBalance = async function (e, b)  {
  let user = await User.find({ email: e });
  user = user[0];
  let bal = user.balance;
  let newBal = parseInt(bal) + parseInt(b);
  let u = await User.findOneAndUpdate({ email: e }, { balance: newBal }, { new: true });
};

//login
const login = async (req, res) => {
  let response;
  let user = await User.find({ email: req.body.email._value });
  user = user[0];
  if (
    user != undefined &&
    bcrypt.compareSync(req.body.password._value, user.password)
  ) {
    let jwtoken = jwt.sign(
      {
        email: user.email,
        id: user._id,
        balance: user.balance,
        firstname: user.firstname,
        lastname: user.lastname,
      },
      secret
    );
    response = {
      status: "success",
      message: "Logging in",
      data: {
        token: jwtoken,
      },
    };
    // let decoded = jwt.verify(jwtoken, secret);
    // console.log(decoded);
    res.json(response);
  } else {
    res.send({
      status: "error",
      message: "Incorrect password",
    });
  }
};

//POST
const create = async (req, res) => {
  let firstname = req.body.firstname._value;
  let lastname = req.body.lastname._value;
  let email = req.body.email._value;
  let password = bcrypt.hashSync(req.body.password._value, 10);
  let u = new User();
  u.firstname = firstname;
  u.lastname = lastname;
  u.email = email;
  u.password = password;
  u.balance = 100;
  let checkUser = await User.find({ email: req.body.email._value });
  checkUser = checkUser[0];

  // check if something is missing
  if (
    checkUser == undefined &&
    (u.firstname != "" || u.lastname != "" || u.email != "" || u.password != "")
  ) {
    await u.save();
    res.send({
      status: "success",
      message: "Posting API user",
    });
  } else if (u.firstname == "") {
    res.send({
      status: "error",
      error: "please provide a first name",
    });
  } else if (u.lastname == "") {
    res.send({
      status: "error",
      error: "please provide a last name",
    });
  } else if (u.email == "") {
    res.send({
      status: "error",
      error: "please provide an email",
    });
  } else if (u.password == "") {
    res.send({
      status: "error",
      error: "please provide a password",
    });
  } else if (checkUser != undefined) {
    res.send({
      status: "error",
      error: "email is already in use",
    });
  } else {
    res.send({
      status: "error",
      error: "Something went wrong",
    });
  }
};

// module.exports.getById = getById;
module.exports.create = create;
module.exports.login = login;
module.exports.getByToken = getByToken;
module.exports.getNameByEmail = getNameByEmail;
module.exports.updateBalance = updateBalance;
