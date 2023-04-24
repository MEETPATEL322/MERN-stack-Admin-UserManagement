import React from 'react';
import { Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';

import { Box, TextField, Button, Alert } from '@mui/material';
import { useState } from 'react';
import { useChangeUserPasswordMutation } from 'src/services/userAuthApi';
import { getToken } from 'src/services/LocalStorageService';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Changepassword = () => {
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: ""
  });

const navigate = useNavigate();
const [changeUserPassword] = useChangeUserPasswordMutation()
const token = getToken('token')

const handleSubmit = async (event) => {

  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const actualData = {
    password: data.get('password'),
    password_confirmation: data.get('password_confirmation'),
  }

  if (actualData.password && actualData.password_confirmation) {
    if (actualData.password === actualData.password_confirmation) {
      const res = await changeUserPassword({ actualData, token })
      if (res.data.status === "success") {
        document.getElementById("password-change-form").reset();
        setError({ status: true, msg: "Password Changed Successful", type: "success" });
        navigate('/auth/login')
      }
      if (res.data.status === "failed") {
        setError({ status: true, msg: res.data.message, type: "error" });
      }
    } else {
      setError({ status: true, msg: "Password and Confirm Password Doesn't Match", type: "error" })
    }
  } else {
    setError({ status: true, msg: "All Fields are Required", type: "error" })
  }
};

// Getting User Data from Redux Store
const myData = useSelector(state => state.user)
console.log("Change Password", myData)


  return (
    <PageContainer title="Sample Page" description="this is Sample page">

      <DashboardCard>
      <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', maxWidth: 600, mx: 4 }}>
      <h1>Change Password</h1>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} id="password-change-form">
        <TextField margin="normal" required fullWidth name="password" label="New Password" type="password" id="password" />
        <TextField margin="normal" required fullWidth name="password_confirmation" label="Confirm New Password" type="password" id="password_confirmation" />
        <Box textAlign='center'>
          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, px: 5 }}> Update </Button>
        </Box>
        {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ""}
      </Box>
    </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default Changepassword;
