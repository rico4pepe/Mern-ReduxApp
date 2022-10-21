import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

import userModel from '../models/user.js'

const secret = "test"

export const signup = async(req, res)=>{
    const {email, firstName, lastName, password} = req.body;
    try {
        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.status(400).json({message: "User already exist"})
        }

        const hashpassword = await bcrypt.hash(password, 12)
        const result = await userModel.create({
            email,
            password: hashpassword,
            name: `${firstName} ${lastName}`
        }) ;

        const token = jwt.sign({email: result.email, id : result._id}, secret, {expiresIn: "1h"})
        res.status(201).json({result, token});
    } catch (error) {
        res.status(500).json({message: "Develope should pls check code"});
        console.log(error)
    }
}