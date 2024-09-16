import { styled } from "@mui/material";
import {Link as LinkComponent} from "react-router-dom";

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


export const Link=styled(LinkComponent)`

    text-decoration:none;
    color:black;
    padding:1rem;
    &:hover{
        background-color:rgba(0,0,0,0.1);
    }`;

export const InputBox=styled("input")`
width:100%;
border:none;
height:100%;
outline:none;
padding:0 2rem;
border-radius:1.5rem;
background-color:rgba(0,0,0,0.1);


`