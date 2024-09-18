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
import { CameraAlt } from "@mui/icons-material";
import { HiddenInput } from "../../components/styles/styledComponent";
import { useFileHandler, useInputValidation, useStrongPassword } from "6pp";
import { UsernameValidator } from "../../utils/Validators";

const AdminLogin = () => {
  const [isLogin, setIsLogin] = useState(true);
  const ifLogin = () => setIsLogin((prev) => !prev);
  const name = useInputValidation("");
  const username = useInputValidation("", UsernameValidator);
  const password = useStrongPassword();
  const email = useInputValidation("");
  const avatar = useFileHandler("single");

  const handleLogin = (e) => {
    e.preventDefault();
  };
  const handleSignUp = (e) => {
    e.preventDefault();
  };

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
      (
        <>
          <Typography variant="h4">Login</Typography>
          <form onSubmit={handleLogin}>
            <TextField
              required
              fullWidth
              label="Username"
              margin="normal"
              variant="outlined"
            />
            <TextField
              required
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              variant="outlined"
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
            <Typography textAlign={"center"} m={"1rem"}>
              OR
            </Typography>
            <Button
              variant="text"
              color="secondary"
              fullWidth
              onClick={ifLogin}
            >
              Create Account
            </Button>
          </form>
        </>
      ) 
    </Paper>
  </Container>;
};

export default AdminLogin;
