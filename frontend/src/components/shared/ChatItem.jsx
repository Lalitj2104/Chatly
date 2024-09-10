import React from "react";
import { Link } from "../styles/styledComponent";
import { Stack, Typography } from "@mui/material";
const ChatItem = ({
  avatar = [],
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessage,
  index = 0,
  handleDeleteChatOpen,
}) => {
  return (
    <Link to={`/chat/${_id}`}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgrounColor: sameSender? "#f0f0f0" : "unset",
          padding: "1rem",
          position:"relative",
            color:sameSender?"white":"unset",
        }}
      >
        {/* Avatar card */}
        <Stack>
            <Typography>{name}</Typography>
            {
                newMessageAlert
            }
        </Stack>
      </div>
    </Link>
  );
};

export default ChatItem;
