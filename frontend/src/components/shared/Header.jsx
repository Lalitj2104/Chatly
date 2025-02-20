import {
	Add as AIcon,
	TipsAndUpdates as AIIcon,
	Group as GIcon,
	Logout as LIcon,
	Menu as MIcon,
	Notifications as NIcon,
	Search as SIcon,
} from "@mui/icons-material";
import {
	AppBar,
	Backdrop,
	Box,
	IconButton,
	Toolbar,
	Typography
} from "@mui/material";
import axios from "axios";
import React, { lazy, Suspense, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { orange } from "../../constants/color";
import { server } from "../../constants/config";
import { userNotExists } from "../../redux/reducers/auth";
import { setIsMobileMenuFriend } from "../../redux/reducers/misc";
import IconButtonComp from "../layout/HeaderComp";
const Search = lazy(() => import("../specific/Search"));
const Notifications = lazy(() => import("../specific/Notifications"));
const NewGroup = lazy(() => import("../specific/NewGroup"));

const Header = () => {
	
	const [isSearch, setIsSearch] = useState(false);
	const [isNewGroup, setIsNewGroup] = useState(false);
	const [isNotification, setIsNotification] = useState(false);
  const dispatch=useDispatch();
	const navigate = useNavigate();
	const AiHandler = () => {
		console.log("ur chatting with AI");
	};
	const mobileHandler = () => {
		dispatch(setIsMobileMenuFriend(true));
	};

	const oneSearchHandler = () => {
		setIsSearch((prev) => !prev);
	};

	const openNewGroup = () => {
		setIsNewGroup((prev) => !prev);
	};
	const openGroups = () => {
		navigate("/groups");
	};
	const LogoutHandler = async () => {
		try {
			const { data } = await axios.get(`${server}/api/v1/user/logout`, {
				withCredentials: true,
			});
      dispatch(userNotExists())
			toast.success(data.message);
      
		} catch (error) {
			toast.error(error?.response?.data?.message || "Something went wrong");
		}
	};
	const openNotification = () => {
		setIsNotification((prev) => !prev);
	};

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
						<IconButton color="black" onClick={mobileHandler}>
							<MIcon />
						</IconButton>
					</Box>
					<Box sx={{ flexGrow: 3 }} />
					<Box>
						<IconButtonComp
							title={"chat wit AI"}
							icon={<AIIcon />}
							onClick={AiHandler}
						/>
						<IconButtonComp
							title={"Search"}
							icon={<SIcon />}
							onClick={oneSearchHandler}
						/>
						<IconButtonComp
							title={"New Group"}
							icon={<AIcon />}
							onClick={openNewGroup}
						/>
						<IconButtonComp
							title={"Groups"}
							icon={<GIcon />}
							onClick={openGroups}
						/>
						<IconButtonComp
							title={"Notifications"}
							icon={<NIcon />}
							onClick={openNotification}
						/>
						<IconButtonComp
							title={"LogOut"}
							icon={<LIcon />}
							onClick={LogoutHandler}
						/>
					</Box>
				</Toolbar>
			</AppBar>
			{isSearch && (
				<Suspense fallback={<Backdrop open />}>
					<Search />
				</Suspense>
			)}

			{isNotification && (
				<Suspense fallback={<Backdrop open />}>
					<Notifications />
				</Suspense>
			)}
			{isNewGroup && (
				<Suspense fallback={<Backdrop open />}>
					<NewGroup />
				</Suspense>
			)}
		</>
	);
};

export default Header;
