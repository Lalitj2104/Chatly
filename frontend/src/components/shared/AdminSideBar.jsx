import { Stack, Typography } from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Dashboard } from "@mui/icons-material";

const  adminTabs=[{
  name: "Dashboard",
  path:"/admin/dashboard",
  icon:<Dashboard/>
}]
const AdminSideBar = ({ w = "100%" }) => {
  const location = useLocation();
  return (
    <Stack width={w} direction={"column"} p={"3rem"} spacing={"3rem"}>
      <Typography variant="h5" color="primary">
        Chatly
      </Typography>
      <Stack spacing={"1rem"}>
        {adminTabs.map((tab) => (
          <Link key={tab.path} to={tab.path}>
            <Stack direction={"row"} spacing={"1rem"}>
              {tab.icon}
              <Typography>
                {tab.name}
              </Typography>
            </Stack>
          </Link>
        ))}
      </Stack>
    </Stack>
  );
};

export default AdminSideBar;
