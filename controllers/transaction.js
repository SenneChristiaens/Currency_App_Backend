const Transaction = require('../models/transaction');

//GET
const get = async (req, res) => {
    let response;
    if(req.query.user != undefined) {
    response = {
                status: "success",
                message: "GETTING transactions from username " + userName,
                data: {
                    transactions: await this.find({ username: sender || receiver })
                }
    }
    } 
    else {
    response = {
                status: "success",
                message: "GETTING transactions",
                data: {
                    transactions: await this.find({})
                }
            }
    };


    if (response.data.transactions.length){
    res.json(response);
    } else {
    res.send({
        status: "error",
        error: "No transactions found"

    });
    }
}

const getById = async (req, res) => {
    const response = {
                    status: "success",
                    message: "GETTING transaction " + searchId,
                    data: {
                        transactions: await this.find({ id: searchId })
                    }
                };
    // check if transaction exists
    if (response.data.transactions.length){
    res.json(response);
    } else {
    res.send({
        status: "error",
        error: "no transaction found with id " + req.params.id

    });
    }
}

const getByUser = async (req, res) => {
    const response = {
                    status: "success",
                    message: "GETTING transactions from username " + userName,
                    data: {
                        transactions: await this.find({ username: sender || receiver })
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
    t.id =  await Transaction.getSize();

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

// //UPDATE
// const update = async (req, res) => {
//     const response = await Message.getById(req.params.id);  
//     // check if message exists
//     if(response.data.messages.length) {
//     // check if message is empty
//     if (req.body.message != ""){
//         let m = response.data.messages[0];
//         m.message = req.body.message;
//         await m.save();
//         res.send({
//         status: "success",
//         message: "UPDATING a message with id " + req.params.id

//         });
//     } else {
//         res.send({
//         status: "error",
//         error: "please provide a message"

//         });
//     }
//     } else {
//     res.send({
//         status: "error",
//         error: "no message found with id " + req.params.id

//     });
//     }
// }

// //DELETE
// const remove = async (req, res) => {
//     const m = await Message.getById(req.params.id);
//     // check if message exists
//     if (m.data.messages.length){
//     await Message.deleteOne({ id: req.params.id});
//     res.send({
//         status: "success",
//         message: "DELETING message with id " + req.params.id

//     });
//     } else {
//     res.send({
//         status: "error",
//         error: "no message found with id " + req.params.id

//     });
//     }
// }


module.exports.get = get;
module.exports.getById = getById;
module.exports.create = create;
// module.exports.update = update;
// module.exports.remove = remove;
