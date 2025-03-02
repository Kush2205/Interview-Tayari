import express from 'express';
import { Request, Response } from 'express';
import prisma from '../utils/prisma';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
export const authRouter = express.Router();


authRouter.post("/signup", async (req : Request, res : Response) => {
   
    try{
        const {name , email , password} = req.body;
        if(name && email  && password){
             
            try{
                const user = await prisma.user.findUnique({
                    where : {
                        email
                    }   
                })

                if(user){
                    res.status(400).json({message : "User already exists"});
                }

            }
            catch(err){
                res.status(500).json({message : "Internal server error"});
            }
            
            
            try{
                const user = await prisma.user.create({
                    data : {
                        name,
                        email,
                        password : bcrypt.hashSync(password, 10)
                    }
                });
                if(user){
                    const token = jwt.sign({id : user.id}, process.env.JWT_SECRET as string);
                    res.status(200).json({message : "User created" , "token" : token});
                }
            
            }catch(err){
                res.status(500).json({message : "Internal server error"});
             }
        }

        else{
            res.status(400).json({message : "Missing required fields"});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({message : "Internal server error"});
    }


});

authRouter.post("/login", async (req, res) => {
    try{
        const {email , password} = req.body;
        if(email && password){
            try{
                const user = await prisma.user.findUnique({
                    where : {
                        email,
                        
                    }
                });
                if(user){
                    if(bcrypt.compareSync(password, user.password)){
                        const token = jwt.sign({id : user.id}, process.env.JWT_SECRET as string);
                        res.status(200).json({message : "User logged in" , "token" : token});
                    }
                    else{
                        res.status(400).json({message : "Wrong password"});
                    }
                }
                else{
                    res.status(400).json({message : "Invalid credentials"});
                }
            }
            catch(err){
                res.status(500).json({message : "Internal server error"});
            }
        }
        else{
            res.status(400).json({message : "Missing required fields"});
        }
    }
    catch{
        res.status(500).json({message : "Internal server error"});
    }
    
});