import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from 'react'
import { sampleNotification } from "../../constants/sampleData";
import  NotificationItem  from "../shared/NotificationItem";

const Notifications = () => {

  const friendRequestHandler = ({_id,accept}) => {
    console.log(_id,accept)
  }

  return (
   <Dialog open >
    <Stack p={{xs:"1rem", sm:"2rem"}} maxWidth={"25rem"}>
      <DialogTitle textAlign={"center"}>Notifications</DialogTitle>
      
      {
        sampleNotification.length>0?(
            sampleNotification.map((i) => (
              <NotificationItem sender={i.sender}  _id={i._id} handler={friendRequestHandler} key={i._id}/>
            )
        )
        ):<Typography textAlign={"center"}>No Notifications</Typography>
      }
    </Stack>
   </Dialog>
  )
}

export default Notifications