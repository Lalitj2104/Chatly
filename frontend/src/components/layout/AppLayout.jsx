import React from "react";
import Header from "../shared/Header";
import Title from "../shared/Title";
import { Grid } from "@mui/material";
import ChatList from "../specific/ChatList";
import { sampleChats } from "../../constants/sampleData";
import { useParams } from "react-router-dom";
import Profile from "../specific/Profile";

export const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const parms = useParams();
    const chatId = parms.id;

    const handleDeleteChat = (e, _id, groupChat) => {
      e.preventDefault();
      console.log("Delete chat", _id, groupChat);
    };
    return (
      <>
        <Title title={"Chatly"} />
        <Header />

        <Grid
          container
          height={"calc(100vh - 4rem)"}
          justifyContent="space-between"
          spacing={0}
        >
          <Grid
            item
            sm={4}
            md={3}
            sx={{
              display: { xs: "none", sm: "block" },
              padding: "1rem",
              bgcolor: "primary.main",
            }}
            height={"100%"}
          >
            <ChatList
              chats={sampleChats}
              chatId={chatId}
              handleDeleteChat={handleDeleteChat}
            />
          </Grid>
          <Grid item xs={12} sm={5} lg={4} height={"100%"}>
            <WrappedComponent {...props} />
          </Grid>
          <Grid
            item
            sm={3}
            md={3}
            lg={4}
            sx={{
              display: { xs: "none", md: "block" ,lg:"block"},
              padding: "2rem",
              bgcolor: "secondary.main",
            }}
            height={"100%"}
          >
            <Profile />
          </Grid>
        </Grid>
      </>
    );
  };
};
