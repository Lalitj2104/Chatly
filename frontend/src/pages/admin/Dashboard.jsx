import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import { AdminPanelSettings, Group, Message, Person } from "@mui/icons-material";
import moment from "moment";
import {
  SearchField,
  CurveButton,
} from "../../components/styles/styledComponent";

const Dashboard = () => {
  const Appbar = (
    <>
      <Paper
        elevation={3}
        sx={{ padding: "2rem", margin: "2rem 0", borderRadius: "1rem" }}
      >
        <Stack direction="row" alignItems={"center"} spacing={"1rem"}>
          <AdminPanelSettings sx={{ fontSize: "3rem" }} />
          <SearchField placeholder="Search" />
          <CurveButton>Search</CurveButton>

          <Box flexGrow={1} />

          <Typography display={{ xs: "none", lg: "block" }}>
            {moment().format("dddd, MMMM Do YYYY, h:mm a")}
          </Typography>
        </Stack>
      </Paper>
    </>
  );

  const Widgets = <><Stack direction={{xs:"column" ,sm:"row"}}
  spacing={"2rem"}
  alignItems={"center"}
  margin={"2rem 0"}
  justifyContent={"space-between"}>
  <Widget title={"Users"} value={10} Icon={<Person/>}/>
  <Widget title={"Chats"} value={20} Icon={<Group/>}/>

  <Widget title={"Messages"} value={30} Icon={<Message/>}/>

  </Stack></>;

  return (
    <AdminLayout>
      <Container component={"main"}>
        {Appbar}

        <Stack direction={"row"} spacing={"2rem"} flexWrap={"wrap"}>
          <Paper
            elevation={3}
            sx={{
              padding: "2rem 3.5rem",
              borderRadius: "1rem",
              width: "100%",
              maxWidth: "45rem",
              height: "25rem",
            }}
          >
            <Typography variant={"h4"} margin={"2rem 0"}>Last Messages</Typography>
            {"Chat"}
          </Paper>
          <Paper 
          elevation={3}
          sx={{
            padding:"1rem",
            borderRadius:"1rem",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            width:{xs:"100%",sm:"50%"},
            position:"relative",
            width:"100%",
            maxWidth:"25rem",
            height:"25rem"
          }}>
            {"Dougnut Chart"}

<Stack position={"absolute"}
direction={"row"}
justifyContent={"center"} 
alignItems={"center"}
spacing={"0.5rem"}
width={"100%"}
height={"100%"}
>
<Group/> <Typography>VS</Typography>
<Person/>
</Stack>

          </Paper>

        </Stack>
        {Widgets}
      </Container>
    </AdminLayout>
  );
};

const Widget=({title,value,Icon})=><Paper 
elevation={3}
sx={{
  borderRadius:"2rem",
  padding:"1rem",
  margin:"2rem 0",
  width:"20rem",
}}>
<Stack alignItems={"center"} spacing={"1rem"}>
<Typography
  sx={{
    color:"rgba(0,0,0,0.7)",
    borderRadius:"30%",
    border:`5px solid rgba(0,0,0,0.9)`,
    width:"5rem",
    height:"5rem",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
  }}

>
{value}
</Typography>
<Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
{Icon}
<Typography>{title}</Typography>
</Stack>

</Stack>
</Paper>


export default Dashboard;
