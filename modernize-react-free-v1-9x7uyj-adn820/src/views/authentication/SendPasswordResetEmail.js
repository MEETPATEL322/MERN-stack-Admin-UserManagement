import { Grid, TextField, Button, Box, Alert, Card } from "@mui/material";
import { useState } from 'react';
import { useSendPasswordResetEmailMutation } from "../../services/userAuthApi";
import React from 'react';
import { Link } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import Logo from 'src/layouts/full/shared/logo/Logo';


const Resetpassword = () => {
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: ""
  })
  const [sendPasswordResetEmail, { isLoading }] = useSendPasswordResetEmailMutation()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      email: data.get('email'),
    }
    if (actualData.email) {
      const res = await sendPasswordResetEmail(actualData)
      if (res.data.status === "success") {
        document.getElementById('password-reset-email-form').reset()
        setError({ status: true, msg: "Password Reset Email Sent. Check Your Email !!", type: 'success' })
      }
      if (res.data.status === "failed") {
        setError({ status: true, msg: res.data.message, type: 'error' })
      }
    } else {
      setError({ status: true, msg: "Please Provide Valid Email", type: 'error' })
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
        <h2>Sendingmail Functionality</h2>
        <Box component='form' noValidate sx={{ mt: 1 }} id='password-reset-email-form' onSubmit={handleSubmit}>
          <TextField margin='normal' required fullWidth id='email' name='email' label='Email Address' />
          <Box textAlign='center'>
          {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''}
            <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5 }}>Send</Button>
          </Box>
        </Box>
      </Card>
      </Grid>
    </Grid>
    </Box>
    </PageContainer>
  </>;
};

export default Resetpassword;