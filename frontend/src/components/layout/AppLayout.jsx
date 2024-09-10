import React from "react";
import Header from "../shared/Header";
import Title from "../shared/Title";
import { Grid } from "@mui/material";
import ChatList from "../specific/ChatList";

export const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    return (
      <>
        <Title title={"Chatly"} />
        <Header />

        <Grid container height={"calc(100vh - 4rem)"} justifyContent="space-between">
          <Grid
            item
            sm={4}
            md={3}
            sx={{ display: { xs: "none", sm: "block" } }}
            height={"100%"}
          >
            <ChatList chats={[1,2,3,4,5,6]}/>
          </Grid>
          <Grid item  xs ={12} sm={8} lg={8} height={"100%"}>
            <WrappedComponent {...props} />
          </Grid>
          <Grid item md={3} lg={4} sx={{ display: { xs: "none", md: "block" },
          padding:"2rem",
          bgcolor:"primary.main", }} //will change
          height={"100%"}>right</Grid>
        </Grid>
      </>
    );
  };
};
