import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

export default function ButtonAppBar() {

    const [anchorEl, setAnchorEl] = useState(null);
    const user = useSelector((state)=> state.user.user);
  const location = useLocation();
  const navigate = useNavigate();
  if(location.pathname === "/SignUp" || location.pathname === "/Login") {
    return null
  }


  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 , cursor:"pointer"}} onClick={(e)=> navigate('/Home')}  >
            Online Library
          </Typography>
          
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={(e) => {navigate('/Profile'); handleClose()}}>Profile</MenuItem>
                {user.role === 'LIBRANIAN' && (
                    <MenuItem onClick={(e) => {navigate('/AdminDashboard'); handleClose();}}>Libranian dashboard</MenuItem>
                )}
                <MenuItem onClick={(e) => { localStorage.removeItem('persist:root');handleClose(); navigate('/SignUp');}}>Logout</MenuItem>
              </Menu>
            </div>
        
        </Toolbar>
      </AppBar>
    </Box>
  );
}