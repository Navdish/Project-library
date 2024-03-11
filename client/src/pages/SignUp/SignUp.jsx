import * as React from 'react';
import './SignUp.css'
import Box from '@mui/system/Box';
import { InputLabel, Link, Typography } from '@mui/material';
import PasswordAdornments from '../../components/PasswordInput/PasswordInput'
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux' 
import {useNavigate} from 'react-router-dom';
import { createUser } from '../../features/auth/auth.action';

export default function Signup(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoading = useSelector((state)=> state.isLoading);
    const error = useSelector((state)=> state.error);

    const [emailError, setEmailError] = useState("");
    const [nameError, setNameError] = useState("");
    const [checkName, setCheckName] = useState(false);
    const [checkEmail, setCheckEmail] = useState(false);
    const [checkPass, setCheckPass] = useState(false);


    const handleEmail = (e) => {
        setEmail(e.target.value)
        let regex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
        if (!regex.test(e.target.value)) {
            setEmailError("Invalid email address");
            setCheckEmail(false)
        } else {
            setEmailError("");
            setCheckEmail(true)
        };
    };
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(checkEmail, checkPass, checkName);
        if(!(checkEmail &&checkPass && checkName)){
            alert('Enter Valid Credentials')
        }
        else{
            dispatch(createUser({name, email, password})).then((response)=> {
                if(response.payload) navigate("/Login");
            });
        }
    };   
    
    const handleName = async(e) => {
        setName(e.target.value);
        if(e.target.value === "")
        {
            setCheckName(false);
            setNameError("Please enter something");
        }
        else {
            setCheckName(true);
            setNameError("");
        }
    }
    
    return (
        <Box className='outside' sx={{display:"flex", minHeight:'100vh', backgroundColor:"#EEEEEE"}} >
            
            <Box className='outside2'>
                <Box className='signup'>
                    <Box sx={{width: "100%", mb:"10px"}}>
                        <InputLabel htmlFor="outlined-name">Name</InputLabel>
                        <OutlinedInput id="outlined-name"  variant="outlined" value={name} onChange={(e)=> handleName(e)}  sx={{width:'100%'}}/>
                    </Box>
                    {nameError && <Typography sx={{color:'red', mt:"-12px", mb:"-12px"}}>{nameError}</Typography>}
                    <Box sx={{width: "100%", mb:"10px"}}>
                        <InputLabel htmlFor="outlined-email">Email</InputLabel>
                        <OutlinedInput id="outlined-email"  variant="outlined" value={email} onChange={(e)=> handleEmail(e)}  sx={{width:'100%'}}/>
                    </Box>
                    {emailError && <Typography sx={{ color: "red", mt:"-12px", mb:"-12px"}}>{emailError}</Typography>}
                    <Box sx={{width: "100%"}}>
                        <PasswordAdornments password = {password} setPassword = {setPassword} checkPass={checkPass} setCheckPass={setCheckPass}/>
                    </Box>
                    <Button onClick={(e)=> handleSubmit(e)} variant="contained"  disableFocusRipple={true} disableRipple={true} sx={{mt:"20px", textTransform:"unset", width: "100%", borderRadius: "25px", paddingTop:"12px", paddingBottom:"12px", paddingLeft:"24px", paddingRight:"24px", fontSize:"16px", fontWeight:"600", backgroundColor:"black"}}>Sign Up</Button>
                    <Link sx={{mt:'20px', fontSize:"16px",}} fontWeight={600} underline='none' color="black" href="/Login">Sign in</Link>
                </Box>
                
                
            </Box>
            </Box>
    );
}
