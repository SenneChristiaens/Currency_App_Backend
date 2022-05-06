const User = require('../models/user');
const bcrypt = require('bcryptjs');

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

//login
const login = async (req, res) => {
    let response;
    let user = await User.find({ email: req.body.email });
    user = user[0];
    if(bcrypt.compareSync(req.body.password, user.password)) {
        response = {
            status: "success",
            message: "Logging in"
        }
    res.json(response);
    } 
    else {
    res.send({
                status: "error",
                message: "Incorrect password"
            })
    };
}

//POST
const create = async (req, res) => {
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let email = req.body.email;
    let password = bcrypt.hashSync(req.body.password, 10);
    let u = new User();
    u.firstname = firstname;
    u.lastname = lastname;
    u.email = email;
    u.password = password;
    u.balance = 100;

    // check if something is missing
    if ( u.firstname != "" || u.lastname != "" || u.email != "" || u.password != ""){
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
    else if (u.email == ""){
    res.send({
        status: "error",
        error: "please provide an email"
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
module.exports.login = login;