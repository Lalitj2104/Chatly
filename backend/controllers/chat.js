import express from 'express';
import {Chat} from '../models/chat.js';
import { emitEvent } from '../utils/features.js';
import { ALERT, REFETCH_CHATS } from '../constants/events.js';

export const newGroup = async (req, res, next) => {
    try{
        const{name,members}=req.body
        if(!name || !members){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }


        if(members.length<2){
            return res.status(400).json({
                success:false,
                message:"Group should have atleast 3 members"
            })
        }
        const allMembers = [...members,req.user];
        await Chat.create({
            name,
            groupChat:true,
            creator:req.user,
            members:allMembers,

        })
        emitEvent(req,ALERT,allMembers,`Welcome to ${name} group`);
        emitEvent(req,REFETCH_CHATS,members);

        res.status(201).json({
            success:true,
            message:"Group created successfully"
        })

    }
    catch(error){
        next(error);
        
    }

}