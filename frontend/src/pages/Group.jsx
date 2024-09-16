import { ArrowBack } from "@mui/icons-material";
import { Box, Grid, IconButton, Menu, Tooltip } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Group = () => {
  const navigate=useNavigate();
  const navigateBack = () => {
    navigate("/")
  }

  const IconBtn = (<>

    <IconButton>
      <Menu/>
    </IconButton>


    <Tooltip title="Back">
      <IconButton sx={{
        position: "absolute",
        top: "2rem",
        left: "2rem",
      }}
      onClick={navigateBack}>
        <ArrowBack />
      </IconButton>
    </Tooltip>
  </>);


  return (
    <Grid container height={"100vh"}>
      <Grid
        item
        sm={4}
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },
          bgcolor: "lavender",
        }}
      >
        Group List
      </Grid>
      <Grid
        item
        sm={8}
        xs={12}
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          position: "relative",
          padding: "1rem 3rem",
        }}
      >
        {IconBtn}
        Group Chat
      </Grid>
    </Grid>
  );
};

export default Group;
