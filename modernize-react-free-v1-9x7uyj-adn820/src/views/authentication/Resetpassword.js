import { Grid, TextField, Button, Box, Alert, Card } from "@mui/material";
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useResetPasswordMutation } from "src/services/userAuthApi";
import React from 'react';
import { Link } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import Logo from 'src/layouts/full/shared/logo/Logo';



const ResetPassword = () => {
  const navigate = useNavigate()
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: ""
  })
  const [resetPassword, {}] = useResetPasswordMutation()
  const { id, token } = useParams()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      password: data.get('password'),
      password_confirmation: data.get('password_confirmation'),
    }
    if (actualData.password && actualData.password_confirmation) {
      if (actualData.password === actualData.password_confirmation) {
        const res = await resetPassword({ actualData, id, token })
        console.log(res)
        if (res.data.status === "success") {
          document.getElementById('password-reset-form').reset()
          setError({ status: true, msg: "Password Reset Successfully. Redirecting to Login Page...", type: 'success' })
          setTimeout(() => {
            navigate("/auth/login")
          }, 3000)
        }
        if (res.data.status === "failed") {
          setError({ status: true, msg: res.data.message, type: 'error' })
        }
      } else {
        setError({ status: true, msg: "Password and Confirm Password Doesn't Match", type: 'error' })
      }
    } else {
      setError({ status: true, msg: "All Fields are Required", type: 'error' })
    }
  }
  return <>
  <PageContainer title="Login" description="this is Login page">
  <Box
        sx={{
          position: 'relative',
          '&:before': {
            content: '""',
            background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
            backgroundSize: '400% 400%',
            animation: 'gradient 15s ease infinite',
            position: 'absolute',
            height: '100%',
            width: '100%',
            opacity: '0.3',
          },
        }}
      >
    <Grid container spacing={0} justifyContent='center' sx={{ height: '100vh' }}>
    <Grid
            item
            xs={12}
            sm={12}
            lg={4}
            xl={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '500px' }}>
              <Box display="flex" alignItems="center" justifyContent="center">
                  <Logo />
              </Box>
        <h1>Reset Password</h1>
        <Box component='form' noValidate sx={{ mt: 1 }} id='password-reset-form' onSubmit={handleSubmit}>
          <TextField margin='normal' required fullWidth id='password' name='password' label='New Password' type='password' />
          <TextField margin='normal' required fullWidth id='password_confirmation' name='password_confirmation' label='Confirm New Password' type='password' />
          <Box textAlign='center'>
          {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''}
            <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5 }}>Save</Button>
          </Box>
        </Box>
        </Card>
      </Grid>
    </Grid>
    </Box>
    </PageContainer>
  </>;
};

export default ResetPassword;