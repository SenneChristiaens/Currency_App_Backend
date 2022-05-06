const User = require('../models/user');

//GET
// const getById = async (req, res) => {
//     let response;
//     if(req.body.user != undefined) {
//     response = {
//                 status: "success",
//                 message: "GETTING transaction",
//                 data: {
//                     transactions: await User.find( $and[ {$or: [{ sender: req.body.user }, { receiver: req.query.user }]}, {_id: req.query.id} ])
//                 }
//     }
//     if (response.data.transactions.length){
//         res.json(response);
//         } else {
//         res.send({
//             status: "error",
//             error: "No transaction found"
    
//         });
//         }
//     } 
//     else if(req.body.user == undefined) {
//     res.send({
//                 status: "error",
//                 message: "No Authentication"
//             })
//     };
// }


//POST
const create = async (req, res) => {
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let password = req.body.password;
    let u = new User();
    u.firstname = firstname;
    u.lastname = lastname;
    u.password = password;
    u.balance = 100;

    // check if something is missing
    if ( u.firstname != "" || u.lastname != "" || u.password != ""){
    await u.save();
    res.send({
        status: "success",
        message: "Posting API user"

    });
    } 
    else if (u.firstname == ""){
    res.send({
        status: "error",
        error: "please provide a first name"
    });
    }
    else if (u.lastname == ""){
    res.send({
        status: "error",
        error: "please provide a last name"
    });
    }
    else {
    res.send({
        status: "error",
        error: "please provide a password"
    });
    }
}

// module.exports.getById = getById;
module.exports.create = create;