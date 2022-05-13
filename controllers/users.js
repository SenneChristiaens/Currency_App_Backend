const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
    let user = await User.find({ email: req.body.email._value });
    user = user[0];
    if(bcrypt.compareSync(req.body.password._value, user.password)) {
        const secret = `DKjYb*_hszHTC=jQ>-#@Q%-^wldJ'a`;
        let jwtoken = jwt.sign({ email: user.email, id: user._id }, secret);
        response = {
            status: "success",
            message: "Logging in",
            data: {
                token: jwtoken
            }
        }
        // let decoded = jwt.verify(jwtoken, secret);
        // console.log(decoded);
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