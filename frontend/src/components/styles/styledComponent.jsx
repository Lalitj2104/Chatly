import { styled } from "@mui/material";

 export const HiddenInput = styled("input")({
    border:0,
    padding:0,
    height:1,
    margin:-1,
    widht:1,
    clip:"rect(0 0 0 0)",
    overflow:"hidden",
    position:"absolute",
    whiteSpace:"nowrap",
});



