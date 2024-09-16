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
          
        >
          <Grid
            item
            sm={4}
            md={3}
            sx={{
              display: { xs: "none", sm: "block" },
              padding: "1rem",
              bgcolor: "primary.main",
              // spacing:0
            }}
            height={"100%"}
          >
            <ChatList
              chats={sampleChats}
              chatId={chatId}
              handleDeleteChat={handleDeleteChat}
            />
          </Grid>
          <Grid item xs={12} sm={8} lg={5} height={"100%"} sx={{padding:0,spacing:0}}>
            <WrappedComponent {...props} />
          </Grid>
          <Grid
            item
            md={3}
            lg={4}
            sx={{
              display: { xs: "none", md: "block" ,lg:"block"},
              padding: "2rem",
              bgcolor: "secondary.main",
              // spacing:0
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
