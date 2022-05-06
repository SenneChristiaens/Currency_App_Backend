const Transaction = require('../models/transaction');

//GET
const get = async (req, res) => {
    let response;
    if(req.body.user != undefined) {
    response = {
                status: "success",
                message: "GETTING transactions",
                data: {
                    transactions: await Transaction.find({ $or: [{ sender: req.body.user }, { receiver: req.body.user }] })
                }
    }
    if (response.data.transactions.length){
        res.json(response);
        } else {
        res.send({
            status: "error",
            error: "No transactions found"
    
        });
        }
    } 
    else if(req.body.user == undefined) {
    res.send({
                status: "error",
                message: "No Authentication"
            })
    };
}

const getById = async (req, res) => {
    let response;
    console.log(req.params.id);
    if(req.body.user != undefined) {
    response = {
                status: "success",
                message: "GETTING transaction",
                data: {
                    transactions: await Transaction.find({$and: [ 
                                                            {$or: [
                                                                { sender: req.body.user }, 
                                                                { receiver: req.body.user }
                                                            ]} , 
                                                            { _id: req.params.id } 
                                                        ]})
                }
    }
    if (response.data.transactions.length){
        res.json(response);
        } else {
        res.send({
            status: "error",
            error: "No transaction found"
    
        });
        }
    } 
    else if(req.body.user == undefined) {
    res.send({
                status: "error",
                message: "No Authentication"
            })
    };
}

const getByUser = async (req, res) => {
    const response = {
                    status: "success",
                    message: "GETTING transactions from username ",
                    data: {
                        transactions: await Transaction.find({ $or: [{ sender: username }, { receiver: username }] })
                    }
                };
    // check if transaction exists
    if (response.data.transactions.length){
    res.json(response);
    } else {
    res.send({
        status: "error",
        error: "no transactions found with id " + req.params.id

    });
    }
}

//POST
const create = async (req, res) => {
    let sender = req.body.sender;
    let receiver = req.body.receiver;
    let amount = req.body.amount;
    let t = new Transaction();
    t.sender = sender;
    t.receiver = receiver;
    t.amount = amount;
    // t.id =  await this.get.data.transactions.size();

    // check if transaction is empty
    if (t.sender != "" || t.receiver != "" || t.amount != ""){
    await t.save();
    res.send({
        status: "success",
        message: "Posting API transaction"

    });
    } 
    else if (t.sender == ""){
    res.send({
        status: "error",
        error: "please provide a sender"
    });
    }
    else if (t.receiver == ""){
    res.send({
        status: "error",
        error: "please provide a receiver"
    });
    }
    else {
    res.send({
        status: "error",
        error: "please provide an amount"
    });
    }
}

module.exports.get = get;
module.exports.getById = getById;
module.exports.getByUser = getByUser;
module.exports.create = create;