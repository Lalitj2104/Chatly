import React, { useState } from 'react'
import { Avatar, Button, Container, IconButton, Paper, TextField, Typography,Stack } from '@mui/material';
import {CameraAlt} from "@mui/icons-material"
import {HiddenInput} from '../components/styles/styledComponent';
import { useFileHandler, useInputValidation,useStrongPassword } from '6pp';
import { UsernameValidator } from '../utils/Validators';
const Login = () => {

  const [isLogin, setIsLogin] = useState(true);
  const ifLogin=()=> setIsLogin((prev)=>!prev);
  const name =useInputValidation("");
  const username =useInputValidation("",UsernameValidator);
  const password =useStrongPassword();
  const email =useInputValidation("");
  const avatar=useFileHandler("single")

  const handleLogin=(e)=>{e.preventDefault()}
  const handleSignUp=(e)=>{e.preventDefault()}

  return (<Container component={"main"}  maxWidth="xs" sx={{height:"100vh",display:"flex" ,justifyContent:"center",alignItems:"center"}}>

    <Paper elevation={3} sx={{ padding: 4, display: "flex", flexDirection: "column", alignItems: "center",}}>

      {
        isLogin ? (
          <>
            <Typography variant="h4" >Login</Typography>
            <form onSubmit={handleLogin}>
              <TextField required fullWidth label="Username" margin="normal" variant='outlined' />
              <TextField required fullWidth label="Password" type="password" margin="normal" variant='outlined' />

              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>Login</Button>
              <Typography textAlign={'center'} m={"1rem"}>OR</Typography>
              <Button variant="text" color="secondary" fullWidth onClick={ifLogin}>Create Account</Button>
            </form>
          </>
        ) :
        <>
            <Typography variant="h4" >Sign Up</Typography>
            <form  onSubmit={handleSignUp}>
            
            <Stack position={"relative"} sx={{ justifyContent: "center", alignItems: "center" }}>
              <Avatar sx={{ width: "10rem", height: "10rem", objectFit:"contain"}} 
                src={avatar.preview}
              />
              {
              avatar.error &&(
                <Typography m ={".5rem"}color='error' variant="caption">
                  {avatar.error}
                </Typography>
              )
            }
              <IconButton sx={{ position: "absolute", bottom: -1, right: "6rem" ,}}  component="label" >
                <>
                <CameraAlt />
                <HiddenInput type="file" accept="image/*" onChange={avatar.changeHandler}/>
               </>

              </IconButton>
            </Stack>
            <TextField required fullWidth label="Name" margin="normal" variant='outlined' 
              value={name.value}
              onChange={name.changeHandler}
            />
            <TextField required fullWidth label="Email" type="email" margin="normal" variant='outlined' 
              value={email.value}
              onChange={email.changeHandler}
            />
            <TextField required fullWidth label="Username" margin="normal" variant='outlined' 
              value={username.value}
              onChange={username.changeHandler}
            />
            {
              username.error &&(
                <Typography color='error' variant="caption">
                  {username.error}
                </Typography>
              )
            }
            <TextField required fullWidth label="Password" type="password" margin="normal" variant='outlined' 
              value={password.value}
              onChange={password.changeHandler}
            />
            {
              password.error &&(
                <Typography color='error' variant="caption">
                  {password.error}
                </Typography>
              )
            }

              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>Sign Up</Button>
              <Typography textAlign={'center'} m={"1rem"}>OR</Typography>
              <Button variant="text" color="secondary" fullWidth onClick={ifLogin}>Login</Button>
            </form>
          </>
    }

    </Paper>

  </Container>
  )
}

export default Login;