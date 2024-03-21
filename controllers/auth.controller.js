// write controller or login to create a user
const bcrypt = require('bcrypt');
const user_model = require('../models/user.model');
const jwt = require('jsonwebtoken');
const auth_config = require('../configs/auth.config');


exports.signup = async (req,res)=>{
    //read req.
    const request_body = req.body
    //insert data into mongodb
    const userObj ={
        name:request_body.name,
        userId:request_body.userId,
        email:request_body.email,
        password:bcrypt.hashSync(request_body.password,8),
        userType:request_body.userType
    }

    try {
        const user_created = await user_model.create(userObj);
        res.status(201).send(user_created); // succesfully user created
    } catch (err) {
        console.log('error while register user: ',err);
        res.status(500).send({
            message:"some error while creating user!"
        });
    }

    //send res, that we are done
    try {
        console.log(user_created);
    } catch (err) {
        console.log(err)
    }

}

exports.signin= async (req,res)=>{
    const request_body = req.body
    //find user from mongodb
    const login_user= await user_model.findOne({userId:request_body.userId})
    if(!login_user){
        res.status(404).send({
            message:"User not found!"
        });
        return;
    }
    //check user exists or not
    const checkPassword = await bcrypt.compare(request_body.password,login_user.password);
    if(!checkPassword){
        res.status(401).send({
            message:"Invalid password!"
        });
        return;
    }

    //generate token
    const token = jwt.sign({id:login_user.userId},auth_config.secret,{expiresIn:1200});

    res.status(200).send({ 
        message:"login success!",
        token:token,
        userType:login_user.userType,
        userId:login_user.userId,
        name:login_user.name,
        email:login_user.email
     });
    }



