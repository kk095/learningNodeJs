const jwt = require('jsonwebtoken');
const User = require('../../../models/user');
const env = require('../../../config/environment');

module.exports.createToken = async function(req,res){
    try{
        let user = await User.findOne({email:req.body.email});
        if(!user||user.password != req.body.password){
            return res.status(401).json({
                message:"invalid username or password!",
            })
        }
        return res.status(200).json({
            message:"sign in successfully !",
            data:{
                token : jwt.sign(user.toJSON(),env.passport_jwt_key,{expiresIn:100000})
            }
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            message:"internal server error!"
        })
    }
}