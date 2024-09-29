import express from 'express';
import {User} from '../models/user.js';

const newUser=async(req,res)=>{
   try {
    const {name,username,password,avatar}=req.body;
    
    if(!name || !username || !password || !avatar){
        return res.status(400).json({
            success:false,
            message:'All fields are required'
        })
    }

    const user=await User.create({
        name,
        username,
        password,
        avatar
    });


    res.status(201).json({
        success:true,
        user
    })

    
   } catch (error) {
    res.status(500).json({
        success:false,
        message:error.message
    })
    
   }
}


const login=(req,res)=>{
    res.send('login user');
}


export {newUser,login};
