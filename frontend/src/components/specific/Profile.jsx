import { Avatar, Icon, Stack, Typography } from "@mui/material";
import React from "react";
import { Face ,AlternateEmail as AEIcon,CalendarMonth as CMIcon} from "@mui/icons-material";
import moment from "moment";
//icons not working

const Profile = () => {
  return (
    <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
      <Avatar
        sx={{ width: 200, height: 200 ,
          objectFit:"contain",
        marginBottom:"1rem",
        border:"4px solid white"
        
        }}
        
      />

      <ProfileCard heading={"Bio"} text={"ghcvdsvdskcusgd sdjvkdbsic"} />
      <ProfileCard heading={"Username"} text={"lalitk_jindall"} Icon={<AEIcon/>}/>
      <ProfileCard heading={"Name"} text={"Lalit Jindal"} Icon={<Face/>}/>
      <ProfileCard heading={"Joined"} text={moment('2024-07-11T00:00:00.000Z').fromNow()} Icon={<CMIcon/>}/>

    
    </Stack>
  );
};

const ProfileCard = ({ text, icon, heading }) => {
  return (
    <Stack spacing={"1rem"} direction={"row"} alignItems={"center"}>
      {icon}
      <Stack>
        <Typography variant={"body1"} textAlign={"center"}>{text}</Typography>
        <Typography color={"grey"} variant={"caption"} textAlign={"center"}>{heading}</Typography>
      </Stack>
    </Stack>
  );
};

export default Profile;
