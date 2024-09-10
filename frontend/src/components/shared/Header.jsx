import {
  AppBar,
  Backdrop,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { Suspense, useState,lazy } from "react";
import {
  Add as AIcon,
  Menu as MIcon,
  Search as SIcon,
  Group as GIcon,
  Logout as LIcon,
  Notifications as NIcon,
  TipsAndUpdates as AIIcon
} from "@mui/icons-material";
import { orange } from "../../constants/color";
import { Navigate } from "react-router-dom";
import IconButtonComp from "../layout/HeaderComp";
const Search = lazy(()=>import("../specific/Search"))
const Notifications=lazy(()=>import("../specific/Notifications"))
const NewGroup=lazy(()=>import("../specific/NewGroup"))

const Header = () => {
  const [isMobile,setIsMobile]=useState(false);
  const [isSearch,setIsSearch]=useState(false);
  const [isNewGroup,setIsNewGroup]=useState(false);
  const [isNotification,setIsNotification]=useState(false);

  const AiHandler = () => {
    console.log("ur chatting with AI");
  };
  const mobileHandler = () => {
    setIsMobile(prev=>!prev);
  };

  const oneSearchHandler = () => {
    setIsSearch(prev=>!prev);
  };

  const openNewGroup = () => {
    setIsNewGroup(prev=>!prev);
  };
  const openGroups=()=>{
    Navigate("/groups")
  }
  const LogoutHandler=()=>{
    console.log("logout");
  }
  const openNotification=()=>{
    setIsNotification(prev=>!prev)
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }} />
      <AppBar
        position="static"
        sx={{
          bgcolor: orange,
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Chatly
          </Typography>

          <Box sx={{ display: { xs: "block", sm: "none" } }}>
            <IconButton color="inherit" onClick={mobileHandler}>
              <MIcon />
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box>
            <IconButtonComp title={"chat wit AI"} icon={<AIIcon/>} onClick={AiHandler}/>
            <IconButtonComp title={"Search"} icon={<SIcon/>} onClick={oneSearchHandler}/>
            <IconButtonComp title={"New Group"} icon={<AIcon/>} onClick={openNewGroup}/>
            <IconButtonComp title={"Groups"} icon={<GIcon/>} onClick={openGroups}/>
            <IconButtonComp title={"Notifications"} icon={<NIcon/>} onClick={openNotification}/>
            <IconButtonComp title={"LogOut"} icon={<LIcon/>} onClick={LogoutHandler}/>
          </Box>
        </Toolbar>
      </AppBar>
{
  isSearch &&(<Suspense fallback={<Backdrop open />}>
    <Search/>
  </Suspense>
)}

{
  isNotification &&(<Suspense fallback={<Backdrop open />}>
    <Notifications/>
  </Suspense>
)}
{
  isNewGroup &&(<Suspense fallback={<Backdrop open />}>
    <NewGroup/>
  </Suspense>
)}

    </>
  );
};

export default Header;
