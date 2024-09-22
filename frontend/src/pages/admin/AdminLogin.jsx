import React, { useState } from "react";
import {
  Avatar,
  Button,
  Container,
  IconButton,
  Paper,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Navigate } from "react-router-dom";
import { useInputValidation } from "6pp";


const isAdmin=true;
const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const secret = useInputValidation("");

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  if(isAdmin){return <Navigate to="/admin/dashboard"  />}
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const submithandler = (e) => {
    e.preventDefault();
  };
  return (
    <Container
      component={"main"}
      maxWidth="xs"
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <>
          <Typography variant="h4">Admin Login</Typography>
          <form onSubmit={submithandler}>
            <TextField
              required
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              margin="normal"
              variant="outlined"
              value={secret.value}
              onChange={secret.changeHandler}
              InputProps={{
                endAdornment: (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Login
            </Button>
          </form>
        </>
      </Paper>
    </Container>
  );
};

export default AdminLogin;
