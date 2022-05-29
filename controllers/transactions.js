const Transaction = require("../models/transaction");
const jwt = require("jsonwebtoken");
const Users = require("./users");
const User = require("../models/user");

const secret = `DKjYb*_hszHTC=jQ>-#@Q%-^wldJ'a`;

//GET
const get = async (req, res) => {
  let response;
  let decoded;
  try {
    decoded = jwt.verify(req.body.token, secret);
  } catch (e) {
    console.log(e);
  }
  if (decoded != undefined) {
    response = {
      status: "success",
      message: "GETTING transactions",
      data: {
        transactions: await Transaction.find({
          $or: [{ sender: decoded.email }, { receiver: decoded.email }],
        }),
      },
    };
    if (response.data.transactions.length) {
      res.json(response);
    } else {
      res.send({
        status: "error",
        error: "No transactions found",
      });
    }
  } else if (req.body.user == undefined) {
    res.send({
      status: "error",
      message: "No Authentication",
    });
  }
};


const getById = async (req, res) => {
  let response;
  if (req.body.user != undefined) {
    response = {
      status: "success",
      message: "GETTING transaction",
      data: {
        transactions: await Transaction.find({
          $and: [
            { $or: [{ sender: req.body.user }, { receiver: req.body.user }] },
            { _id: req.params.id },
          ],
        }),
      },
    };
    if (response.data.transactions.length) {
      res.json(response);
    } else {
      res.send({
        status: "error",
        error: "No transaction found",
      });
    }
  } else if (req.body.user == undefined) {
    res.send({
      status: "error",
      message: "No Authentication",
    });
  }
};

const getByUser = async (req, res) => {
  const response = {
    status: "success",
    message: "GETTING transactions from username ",
    data: {
      transactions: await Transaction.find({
        $or: [{ sender: username }, { receiver: username }],
      }),
    },
  };
  // check if transaction exists
  if (response.data.transactions.length) {
    res.json(response);
  } else {
    res.send({
      status: "error",
      error: "no transactions found with id " + req.params.id,
    });
  }
};

//POST
const create = async (req, res) => {
  let sender = req.body.sender;
  let receiver = req.body.receiver;
  let amount = req.body.amount;
  let t = new Transaction();
  t.sender = sender;
  t.receiver = receiver._value;
  t.amount = amount._value;

  let user = await User.find({ email: sender });
  user = user[0];
  console.log(user);
  let jwtoken = jwt.sign(
    {
      email: user.email,
      id: user._id,
      balance: parseInt(user.balance) - parseInt(t.amount),
      firstname: user.firstname,
      lastname: user.lastname,
    },
    secret
  );

  // check if transaction is empty
  if (t.sender != "" && t.receiver != "" && t.amount != "" && (parseInt(user.balance) >= parseInt(t.amount))) {
    Users.updateBalance(t.sender, t.amount*-1);
    Users.updateBalance(t.receiver, t.amount*1);
    await t.save();

    res.send({
      status: "success",
      message: "Posting API transaction",
      data: jwtoken
    });
  } else if (t.sender == "") {
    res.send({
      status: "error",
      error: "please provide a sender",
    });
  } else if (t.receiver == "") {
    res.send({
      status: "error",
      error: "please provide a receiver",
    });
  } else {
    res.send({
      status: "error",
      error: "please provide an amount",
    });
  }
};

module.exports.get = get;
module.exports.getById = getById;
module.exports.getByUser = getByUser;
module.exports.create = create;
