import { Avatar, IconButton, ListItem, Stack, Typography } from "@mui/material";
import { memo } from "react"
import { sampleNotification } from "../../constants/sampleData";

const NotificationItem = ({sender,_id,handler}) => {
const {name,avatar} = sender;

    return (
        <ListItem>
        <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
      >
        <Avatar src={avatar}/>
        <Typography
        variant="body1"
        sx={{
            flexGlow:1,
            WebkitLineClamp:1,
            WebkitBoxOrientation:"vertical",
          overflow: "hidden",
          textOverflow: "circle",
          width: "100%",
        }}
        >{`${name} sent you a friend request`}</Typography>
      <Stack direction={"row"} spacing={"1rem"}>
        <IconButton 
        size="small"
        sx={{
            bgcolor: "success.main",
            color: "white",
            "&:hover": { bgcolor: "success.dark" },
        }}
        onClick={() => handler({accept:true,_id})}>Accept
        </IconButton>
        <IconButton
        size="small"
        sx={{
            bgcolor: "error.main",
            color: "white",
            "&:hover": { bgcolor: "error.dark" },
        }}
        onClick={() => handler({accept:false,_id})}>
          <IconButton />
          Reject
        </IconButton>  
      </Stack>
      </Stack>
    </ListItem>
    
)

}

export default memo(NotificationItem);