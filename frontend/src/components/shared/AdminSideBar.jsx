import { Stack, styled, Typography } from "@mui/material";
import React from "react";
import { Link as lc, useLocation } from "react-router-dom";
import { Dashboard, ExitToApp, Groups, ManageAccounts, Message } from "@mui/icons-material";


const Link=styled(lc)`

text-decoration:none;
color:black;
`;
const  adminTabs=[{
  name: "Dashboard",
  path:"/admin/dashboard",
  icon:<Dashboard/>
},
{
  name: "Users",
  path:"/admin/users",
  icon:<ManageAccounts/>
},
{
  name: "Chats",
  path:"/admin/chats",
  icon:<Groups/>
},
{
  name: "Messages",
  path:"/admin/messages",
  icon:<Message/>
}]
const AdminSideBar = ({ w = "100%" }) => {
  const location = useLocation();
  const LogoutHandler = () => {
    console.log("Logout");
  }
  return (
    <Stack width={w} direction={"column"} p={"3rem"} spacing={"3rem"}>
      <Typography variant="h5" color="primary">
        Chatly
      </Typography>
      <Stack spacing={"1rem"}>
        {adminTabs.map((tab) => (
          <Link key={tab.path} to={tab.path}
          sx={
            location.pathname===tab.path&&{
            
            bgcolor:"rgba(0,0,0,0.2)",
            borderRadius:"10px",
            padding:"0.2rem"
            }
          }
          >
            <Stack direction={"row"} spacing={"1rem"}>
              {tab.icon}
              <Typography>
                {tab.name}
              </Typography>
            </Stack>
          </Link>
        ))}
        <Link onClick={LogoutHandler} 
          >
            <Stack direction={"row"} spacing={"1rem"}>
              <ExitToApp/>
              <Typography>
                Logout
              </Typography>
            </Stack>
          </Link>
      </Stack>
    </Stack>
  );
};

export default AdminSideBar;
