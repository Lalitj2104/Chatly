import React, { memo } from "react";
import { Link } from "../styles/styledComponent";
import { Box, Stack, Typography } from "@mui/material";
import AvatarCard from "./AvatarCard";
const ChatItem = ({
  avatar = [],
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline ,
  newMessageAlert,
  index = 0,
  handleDeleteChat,
}) => {
  return (
    <Link sx={{
      padding:"0",
    }} to={`/chat/${_id}`} onContextMenu={(e)=>handleDeleteChat(e,_id,groupChat)}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgrounColor: sameSender? "black" : "unset",
          padding: "0.5rem",
          position:"relative",
            color:sameSender?"black":"unset",
        }}
      >
        <AvatarCard avatar={avatar}/>
        <Stack>
            <Typography>{name}</Typography>
            {
                newMessageAlert &&(
                  <Typography>{newMessageAlert.count}New Message</Typography>
                )
            }
        </Stack>

        {
          isOnline&& (
            <Box
              sx={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                bgcolor: "green",
                position: "absolute",
                right: "5px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            />
          )
        }
      </div>
    </Link>
  );
};

export default memo(ChatItem);
