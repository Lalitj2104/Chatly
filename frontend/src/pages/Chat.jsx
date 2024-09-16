import React, { useRef } from "react";
import { AppLayout } from "../components/layout/AppLayout";
import { IconButton, Stack } from "@mui/material";
import { gray } from "../constants/color";
import { AttachFile, Send } from "@mui/icons-material";
import { InputBox } from "../components/styles/styledComponent";
import FileMenu from "../components/dialogs/FileMenu";
import MessageComponent from "../components/shared/MessageComponent";
import { sampleMessages } from "../constants/sampleData";

const user = {
  _id: "asdfghjkl",
  name: "John Doe",
};

const Chat = () => {
  const containRef = useRef(null);
  return (
    <>
      <Stack
        ref={containRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        bgcolor={gray}
        height={"90%"}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        {sampleMessages.map((i) => (
          <MessageComponent key={i._id} message={i} user={user} />
        ))}
      </Stack>

      {/* <FileMenu open/> */}
      <form
        style={{
          height: "10%",
        }}
      >
        <Stack direction={"row"} height={"100%"} padding={"1rem"}>
          <IconButton>
            <AttachFile />
          </IconButton>

          <InputBox placeholder="Click here to chat" />
          <IconButton type="submit">
            <Send />
          </IconButton>
        </Stack>
      </form>
    </>
  );
};

export default AppLayout()(Chat);
