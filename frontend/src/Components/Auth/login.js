import React, {useEffect} from "react";
import  { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import  {makeStyles}  from '@material-ui/core/';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import  {useState} from "react";

const useStyles= makeStyles({
    button1: {
        width:200,
        height:50,
        fontSize: 20
      }
})

export default function Login() {
    const [email, setEmail]= useState('')
    const [password, setPassword]= useState('')
    const [error, setError]= useState('');
    const history = useNavigate();
    // dhruvi@gmail.com
    // pas:12345
    async function login(){
        fetch(`http://localhost:8000/api/UserRoute/login`,{
            method:'POST',
            headers:{"Content-type": "application/json"},
            body: JSON.stringify({
                email:email,
                password:password
            })})
            .then(res => res.json())
        .then(data => {
            console.log("data ",data);
            setError(data.message)
            history('/')
        })
    }


    const Classes = useStyles()
    return(
        <Container>
        <div>
            
        <Grid
            container
            spacing={2}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh' }}
            >
            <Grid item xs={3}>
            <img src="https://i.pinimg.com/originals/c8/88/89/c8888942b5d00fc30ad2aa19fd45280b.gif" alt='' width="300" height="120" />
            <br/>
            </Grid>  
            <Grid item xs={3}> 
            <Typography variant="h4">Welcome back</Typography>
            </Grid>
            <Grid item xs={3}> 
            <Typography>Sign in with your Email</Typography>
            <Typography color="red">{error}</Typography>
            </Grid>
            <Box sx={{width:500}} >
            <Grid item > 
            
            <TextField fullWidth id="outlined-basic" label="Email ID" 
            onChange={(e)=>{setEmail(e.target.value)}}
            variant="outlined" />
            <br/><br/>
            <TextField type="password"
             fullWidth id="outlined-basic" label="Password" 
            onChange={(e)=>{setPassword(e.target.value)}}
            variant="outlined" />
            </Grid>
            </Box>
            <Grid item>
            <Button onClick={login} className={Classes.button1} variant="contained" color="primary">
                Login
            </Button>
            </Grid>
            <Link to='/signup'>
            <Typography variant='overline'>
                New to Hotels.com? Create an account.
            </Typography>
            </Link>
        </Grid> 
                        
        </div>
        </Container>
    )
}