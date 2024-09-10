import {
    IconButton,
    Tooltip,
  } from "@mui/material";
import React from "react";
const IconButtonComp=({title,icon,onClick})=>{
    return(
        <Tooltip title={title}>
          <IconButton
                color="inherit"
                size="large"
                onClick={onClick}
              >
                {icon}
              </IconButton>
              </Tooltip>
    )
}

export default IconButtonComp;