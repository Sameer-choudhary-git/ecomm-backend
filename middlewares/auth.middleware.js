const user_model = require('../models/user.model');
const jwt = require('jsonwebtoken');
const auth_config =require('../configs/auth.config');

const verifySignup = async (req, res, next)=>{
    try{

        //Check for the name
        if(!req.body.name){
            return res.status(400).send({
                message : "Failed ! Name was not provied in request body"
            })
        }

        //check for the email
        if(!req.body.email){
            return res.status(400).send({
                message : "Failed ! Email was not provied in request body"
            })
        }
        //check for the userId
        if(!req.body.userId){
            return res.status(400).send({
                message : "Failed ! userId was not provied in request body"
            })
        }

        //Check if the user with the same userId is already present
        const user = await user_model.findOne({userId : req.body.userId})

        if(user){
            return res.status(400).send({
                message : "Failed ! user with same userId is already present"
            })
        }

        next()

    }catch(err){
        console.log("Error while validating the request object", err)
        res.status(500).send({
            message :"Error while validating the request body"
        })
    }
}

const verifySignin = async (req, res, next)=>{
    try{
        //Check for the userId
        if(!req.body.userId){
            return res.status(400).send({
                message : "Failed ! userId was not provied in request body"
            })
        }
        //Check for the password
        if(!req.body.password){
            return res.status(400).send({
                message : "Failed ! password was not provied in request body"
            })
        }
        next()

    }catch(err){
        console.log("Error while validating the request object", err)
        res.status(500).send({
            message :"Error while validating the request body"
        })
    }
}

const verifyToken = async (req, res, next)=>{
    const token = req.headers['x-access-token'];
    try{
       if(!token){
           return res.status(403).send({
               message : "Failed ! No token found"
           })
       }
    }catch(err){
        console.log("Error while validating the request object", err)
        res.status(500).send({
            message :"Error while validating the request header"
        })
    }
    
    jwt.verify(token,auth_config.secret, async (err,decoded)=>{
        if (err) {
            return res.status(401).send({
            message : "Failed ! Unauthorized"
            })
        }
        const user= await user_model.findOne({userId:decoded.id});
        if(!user){
            return res.status(404).send({
                message : "Failed ! User for this token does not exist"
            })
        }
        req.user=user;
        next();
    })
    
}

const isAdmin = async (req, res, next)=>{
    const user= req.user;
    if (user.userType == "ADMIN") {
        next();
    } else {
        return res.status(403).send({
            message : "Failed ! only admin user are allowed to perform this operation"
        })
    }
    next();
}

module.exports = {
    verifyToken : verifyToken,
    verifySignup : verifySignup,
    verifySignin : verifySignin,
    isAdmin : isAdmin
}