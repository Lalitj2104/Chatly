import { useFileHandler, useInputValidation, useStrongPassword } from "6pp";
import { CameraAlt } from "@mui/icons-material";
import {
	Avatar,
	Button,
	Container,
	IconButton,
	Paper,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { HiddenInput } from "../components/styles/styledComponent";
import { server } from "../constants/config";
import { userExists } from "../redux/reducers/auth";
import { UsernameValidator } from "../utils/Validators";



const Login = () => {
	const [isLogin, setIsLogin] = useState(true);
	const ifLogin = () => setIsLogin((prev) => !prev);
	const name = useInputValidation("");
	const username = useInputValidation("", UsernameValidator);
	const password = useStrongPassword();
	const email = useInputValidation("");
	const avatar = useFileHandler("single");
	const dispatch = useDispatch();
	const handleLogin = async (e) => {
		e.preventDefault();

		const config = {
			withCredentials: true,
			headers: {
				"Content-Type": "application/json",
			},
		};
		try {
			const { data } = await axios.post(
				`${server}/api/v1/user/login`,
				{
					username: username.value,
					password: password.value,
				},
				config,
			);
			dispatch(userExists(true));
			toast.success(data.message);
		} catch (error) {
			toast.error( JSON.stringify(error?.response?.data?.message) || "Something Went Wrong");
		}
	};
	const handleSignUp = async(e) => {
		e.preventDefault();

		const formData= new FormData();
		formData.append("name", name.value);
		formData.append("email", email.value);
		formData.append("username", username.value);
		formData.append("password", password.value);
		formData.append("avatar", avatar.file);

		try {
			const { data } = await axios.post(`${server}/api/v1/user/signup`, formData,{
				withCredentials: true
				,headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			dispatch(userExists(true));
			toast.success(data.message);
		} catch (error) {
			toast.error( JSON.stringify(error?.response?.data?.message )|| "Something Went Wrong");
		}
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
				{isLogin ? (
					<>
						<Typography variant="h4">Login</Typography>
						<form onSubmit={handleLogin}>
							<TextField
								required
								fullWidth
								label="Username"
								margin="normal"
								variant="outlined"
								value={username.value}
								onChange={username.changeHandler}
							/>
							<TextField
								required
								fullWidth
								label="Password"
								type="password"
								margin="normal"
								variant="outlined"
								value={password.value} 
  onChange={password.changeHandler} 
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
				) : (
					<>
						<Typography variant="h4">Sign Up</Typography>
						<form onSubmit={handleSignUp}>
							<Stack
								position={"relative"}
								sx={{ justifyContent: "center", alignItems: "center" }}
							>
								<Avatar
									sx={{ width: "10rem", height: "10rem", objectFit: "contain" }}
									src={avatar.preview}
								/>
								{avatar.error && (
									<Typography m={".5rem"} color="error" variant="caption">
										{avatar.error}
									</Typography>
								)}
								<IconButton
									sx={{ position: "absolute", bottom: -1, right: "6rem" }}
									component="label"
								>
									<>
										<CameraAlt />
										<HiddenInput
											type="file"
											accept="image/*"
											onChange={avatar.changeHandler}
										/>
									</>
								</IconButton>
							</Stack>
							<TextField
								required
								fullWidth
								label="Name"
								margin="normal"
								variant="outlined"
								value={name.value}
								onChange={name.changeHandler}
							/>
							<TextField
								required
								fullWidth
								label="Email"
								type="email"
								margin="normal"
								variant="outlined"
								value={email.value}
								onChange={email.changeHandler}
							/>
							<TextField
								required
								fullWidth
								label="Username"
								margin="normal"
								variant="outlined"
								value={username.value}
								onChange={username.changeHandler}
							/>
							{username.error && (
								<Typography color="error" variant="caption">
									{username.error}
								</Typography>
							)}
							<TextField
								required
								fullWidth
								label="Password"
								type="password"
								margin="normal"
								variant="outlined"
								value={password.value}
								onChange={password.changeHandler}
							/>
							{password.error && (
								<Typography color="error" variant="caption">
									{password.error}
								</Typography>
							)}

							<Button
								type="submit"
								variant="contained"
								color="primary"
								fullWidth
								sx={{ marginTop: 2 }}
							>
								Sign Up
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
								Login
							</Button>
						</form>
					</>
				)}
			</Paper>
		</Container>
	);
};

export default Login;
