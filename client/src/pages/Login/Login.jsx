import { Button, Divider, FormControl, Input, InputAdornment, InputLabel, Link, MenuItem, OutlinedInput, Select, Stack, TextField, Typography } from "@mui/material";
import './Login.css'
import Box from '@mui/system/Box';
import PasswordAdornments from "../../components/PasswordInput/PasswordInput";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { login } from '../../features/auth/auth.action';
import { useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import * as React from 'react';

function Login(){
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [open, setOpen] = useState(false);
    const [checkPass, setCheckPass] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoading = useSelector((state)=> state.isLoading);
    const error = useSelector((state)=> state.error);
    const [role, setRole] = useState('STUDENT')

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };

    const action = (
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
    );

    const handleSubmit = async(e) => {
        dispatch(login({email, password, role})).then((response)=> {
            if(!response.payload) {
                console.log(response.error.message,'error');
                setEmail("");
                setPassword("");
                // add snackbar showing wrong credentials
                setOpen(true);

                navigate("/Login");
            }
            else {
                localStorage.setItem("token", response.payload.user.token);
                navigate('/Home');
            }
        });
        if(isLoading) return "Loading....";
    }

    return (
        <Box  sx={{display:"flex", justifyContent:"center", alignItems:"center", height:"100vh", backgroundColor:"grey"}}>
            
                <Stack className="signin-form" sx={{mb:"20px"}}>
                    <Stack
                    direction="column"
                    sx={{display:'flex', flexDirection:"column"}}
                    justifyContent="space-between"
                    alignItems="center"
                    className="login-form"
                    >
                    <Typography
                        align="center"
                        sx={{
                        width: "100%",
                        mb:"20px",
                        fontWeight: "600",
                        fontSize: "40px",
                        }}
                    >
                        Sign in
                    </Typography>
                    
                    <Box sx={{width:"100%"}}>
                    <InputLabel htmlFor="outlined-adornment-password">Email</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type="text"
                        sx={{width:"100%",
                        "& .MuiFilledInput-root": {
                        height: '52px',
                        background: "white",
                        border: "1px solid black",
                        mb:"20px",
                        '&.Mui-focused fieldset': {
                            border: 'none',
                            },
                        '&:hover fieldset': {
                            border: 'none',
                        },
                        }
                        }}
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                    />
                    </Box>
                    <PasswordAdornments password = {password} setPassword = {setPassword} setCheckPass ={setCheckPass}/>
                    

                    <Button
                        variant="contained"
                        sx={{
                        textTransform: "capitalize",
                        width: "100%",
                        boxShadow: "none",
                        height: "min-content",
                        minHeight: "48px",
                        borderRadius: "28px",
                        padding: "10px 24px 10px 24px",
                        textAlign: "center",
                        fontSize: "16px",
                        fontWeight: 500,
                        marginTop: "20px",
                        backgroundColor: "black",
                        }}
                        type="submit"
                        onClick={(e)=> handleSubmit(e)}
                    >
                        Sign in
                    </Button>
                        <FormControl >
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={role}
                            onChange={(e)=> setRole(e.target.value)}
                            sx={{mt:"20px"}}
                        >
                            <MenuItem value={'STUDENT'}>STUDENT</MenuItem>
                            <MenuItem value={'LIBRANIAN'}>LIBRANIAN</MenuItem>
                        </Select>
                        </FormControl>
                    </Stack>
                </Stack>
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={handleClose}
                    message="Invalid credentials"
                    action={action}
                />
           

        </Box>
    );
}

export default Login;