import React from "react";
import Header from "../shared/Header";
import Title from "../shared/Title";
import { Grid2 } from "@mui/material";
import ChatList from "../specific/ChatList";

export const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    return (
      <>
        <Title title={"Chatly"} />
        <Header />

        <Grid2 container height={"calc(100vh - 4rem)"} justifyContent="space-between">
          <Grid2
            item
            sm={4}
            md={3}
            sx={{ display: { xs: "none", sm: "block" } }}
            height={"100%"}
          >
            <ChatList chats={[1,2,3,4,5,6]}/>
          </Grid2>
          <Grid2 item  xs ={12} sm={8} lg={8} height={"100%"}>
            <WrappedComponent {...props} />
          </Grid2>
          <Grid2 item md={3} lg={4} sx={{ display: { xs: "none", md: "block" },
          padding:"2rem",
          bgcolor:"primary.main", }} //will change
          height={"100%"}>right</Grid2>
        </Grid2>
      </>
    );
  };
};
