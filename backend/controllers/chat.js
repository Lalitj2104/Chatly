import express from "express";
import { Chat } from "../models/chat.js";
import { emitEvent } from "../utils/features.js";
import { ALERT, REFETCH_CHATS } from "../constants/events.js";
import { getOtherMember } from "../lib/helper.js";

export const newGroup = async (req, res, next) => {
  try {
    const { name, members } = req.body;
    if (!name || !members) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (members.length < 2) {
      return res.status(400).json({
        success: false,
        message: "Group should have atleast 3 members",
      });
    }
    const allMembers = [...members, req.user];
    await Chat.create({
      name,
      groupChat: true,
      creator: req.user,
      members: allMembers,
    });
    emitEvent(req, ALERT, allMembers, `Welcome to ${name} group`);
    emitEvent(req, REFETCH_CHATS, members);

    res.status(201).json({
      success: true,
      message: "Group created successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const myChats = async (req, res, next) => {
  try {
    const chats = await Chat.find({ members: req.user }).populate(
      "members",
      "name  avatar"
    );

    if (!chats) {
      return res.status(400).json({
        success: false,
        message: "No chats found",
      });
    }
    const transformChat = chats.map((chat) => {
      return {
        _id: chat._id,
        groupChat: chat.groupChat,
        name: groupChat
          ? chat.name
          : getOtherMember(chat.members, req.user).name,
        avatar: groupChat
          ? members.slice(0, 3).map(({ avatar }) => avatar.url)
          : [getOtherMember(chat.members, req.user).avatar.url],
        members: chat.members.reduce((prev, curr) => {
          if (curr.chat._id.toString() !== req.user.toString()) {
            prev.push(curr.chat._id);
          }
          return prev;
        }, []),
      };
    });

    return res.status(200).json({
      success: true,
      chats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyGroups = async (req, res, next) => {
  try {
    const chats = await Chat.find({
      members: req.user,
      groupChat: true,
      creator: req.user,
    }).populate("members", "name avatar");

    if (!chats) {
      return res.status(400).json({
        success: false,
        message: "No groups found",
      });
    }

    const groups=chats.map(({members,_id,groupChat,name})=>
         ({
            _id,
            groupChat,
            name,
            avatar: members.slice(0,3).map(({avatar})=>avatar.url),
            
        })
    )
    return res.status(200).json({
      success: true,
      groups,
    });

  } catch (error) {
    next(error);
  }
};


export const addMembers=async(req,res,next)=>{
    try{
        const {chatId,members}=req.body;
        if(!chatId || !members){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        const chat=await Chat.findById(chatId);
        if(!chat){
            return res.status(404).json({
                success:false,
                message:"Chat not found"
            })
        }
        if(!chat.groupChat){
            return res.status(400).json({
                success:false,
                message:"This is not a group chat"
            })
        }
        if(chat.creator.toString()!==req.user.toString()){
            return res.status(403).json({
                success:false,
                message:"You are not authorized to add members"
            })
        }
        const allNewMembersPromise=members.map((i)=>UserActivation.findById(i,"name"));
        const allNewMembers=await Promise.all(allNewMembersPromise);
        chat.members.push(...allNewMembers.map((i)=>i._id));
        if(chat.members.length>80){
            return res.status(400).json({
                success:false,
                message:"Members limit exceeded"
            })
        }

        await chat.save();

        const allUserName=allNewMembers.map((i)=>i.name).join(",");
        emitEvent(req,ALERT,chat.members,`${allUserName} added to ${chat.name} group`);

        res.status(200).json({
            success:true,
            message:"Members added successfully"
        })





    }catch(error){
    next(error);
}

}
