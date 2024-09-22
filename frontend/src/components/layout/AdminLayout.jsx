import { Box, Drawer, Grid, IconButton } from "@mui/material";
import React, { useState } from "react";
import AdminSideBar from "../shared/AdminSideBar";
import { Close, Menu } from "@mui/icons-material";

const AdminLayout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);

  const handleMobile = () => {
    setIsMobile(!isMobile);
  };
  const handleClose = () => {
    setIsMobile(false);
  }

  return (
    <>
      <Grid container minHeight={"100vh"}>
        <Box
          sx={{
            display: { xs: "block", md: "none" },
            position: "fixed",
            right: "1rem",
            top: "1rem",
          }}
        >
          <IconButton onClick={handleMobile}>
          {  isMobile? <Close /> : <Menu />}
          </IconButton>
        </Box>
        <Grid item md={4} lg={3} sx={{ display: { xs: "none", md: "block" } }}>
          <AdminSideBar />
        </Grid>
        <Grid item xs={12} md={8} lg={9} sx={{ bgcolor: "#f5f5f5" }}>
          {children}
        </Grid>

<Drawer open={isMobile} onClose={handleClose}>
    <AdminSideBar w="50vw"/>
</Drawer>

      </Grid>
    </>
  );
};

export default AdminLayout;
