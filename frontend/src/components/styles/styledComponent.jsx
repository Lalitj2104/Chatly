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
`;



export const SearchField=styled("input")`
padding:1rem 2rem;
width:35vmax;
border:none;
border-radius:1.5rem;
outline:none;
background-color:rgba(0,0,0,0.1);
font-size:1.1rem;
`;


export const CurveButton=styled("button")`
border-radius:1.5rem;
padding:0.5rem 2rem;
border:none;
outline:none;
background-color:black;
font-size:1.1rem;
cursor:pointer;
color:white;
`;


