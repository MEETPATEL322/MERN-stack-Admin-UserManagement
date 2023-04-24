import React, { useEffect,useState,useContext } from 'react';
import { useDispatch } from 'react-redux';
import { unsetUserToken } from 'src/features/authSlice';
import { useNavigate } from 'react-router-dom';
import { getToken, removeToken } from 'src/services/LocalStorageService';
import { useGetLoggedUserQuery } from 'src/services/userAuthApi';
import { unsetUserInfo,setUserInfo } from 'src/features/userSlice';
import { Link } from 'react-router-dom';



import { LoginContext } from 'src/components/context/Context'

import {
  Avatar,
  Box,
  Menu,
  Button,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';

import { IconListCheck, IconMail, IconUser } from '@tabler/icons';

import ProfileImg from 'src/assets/images/profile/user-1.jpg';

const Profile = () => {

  const { logindata, setLoginData } = useContext(LoginContext);
  // console.log(logindata);

  const navigate = useNavigate()




  const [anchorEl2, setAnchorEl2] = useState(null);
  const handleClick2 = (event) => {
    // alert("logout")
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const token = getToken
  const { data, isSuccess } = useGetLoggedUserQuery(token)
  // console.log("data",data);



  const logoutUser = async () =>{

    let token = localStorage.getItem("usersdatatoken");
    // console.log("token",token);

    const res = await fetch("http://localhost:8000/logout", {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          "Authorization": token,
         Accept:"application/json"
      }
  });

  const data = await res.json();
  console.log("data",data);

  if (data.status == 201) {
    
    // navigate("/auth/login");

    console.log("user logout");
    localStorage.removeItem("usersdatatoken");
    setLoginData(false)
    navigate("/auth/login");
} else {
  console.log("error");
}
  }

  const goError = () => {
    navigate("*")
}

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === 'object' && {
            color: 'primary.main',
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src={ProfileImg}
          alt={ProfileImg}
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        sx={{
          '& .MuiMenu-paper': {
            width: '200px',
          },
        }}
      >
       
     
          <>
          <Button onClick={logoutUser} variant="outlined" color="primary" fullWidth>
            Logout
          </Button>
          </>
        
       
        
      </Menu>
    </Box>
  );
};

export default Profile;
