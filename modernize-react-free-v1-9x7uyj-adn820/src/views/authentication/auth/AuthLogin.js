import { TextField, Button, Box, Alert, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
// import { useLoginUserMutation } from '../../services/userAuthApi';
// import { getToken, storeToken } from '../../services/LocalStorageService';
// import { useDispatch } from 'react-redux';
// import { setUserToken } from '../../features/authSlice';
import { useLoginUserMutation } from 'src/services/userAuthApi';
import React from 'react';
import { getToken, storeToken } from 'src/services/LocalStorageService';
import { useDispatch } from 'react-redux';
import { setUserToken } from 'src/features/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthLogin = ({subtitle}) => {
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: ""
  })
  
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginUserMutation()


  const [inpval,setInpval] = useState({
    email:"",
    password:"",
  });

  console.log("login",inpval);

  const setVal = (e) =>{
    // console.log(e.target.value);
  
    const {name,value} = e.target;
  
    setInpval(()=>{
      return{
        ...inpval,
        [name]:value
      }
    })
  }
  const login = async(e) =>{
  e.preventDefault();

  const {  email, password } = inpval;

  if  (email === "") {
    toast.error("Email is Required !")
  }
  else if(!email.includes("@")){
    toast.error("Valid Email is Required !")
  }
  else if(password === ""){
    toast.error("Password is Required !")
  }
  else if(password.length< 6){
    toast.error("Password is must 6 words Required !")
  }
  else{
    // console.log("User Login Successfully Done..");

    const data = await fetch("http://localhost:8000/login",{
        method:"POST",
        headers:{
          "Content-type":"application/json"
        },
        body:JSON.stringify({
           email, password
        })
      });

      const res = await data.json();
      // console.log(res);

      if(res.status == 201){
        localStorage.setItem("usersdatatoken",res.result.token);
        navigate("/dashboard")
        // alert("user registration");
        setInpval({ ...inpval, email: "", password: "" });
      }
  }

  }
  
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const data = new FormData(e.currentTarget);
  //   const actualData = {
  //     email: data.get('email'),
  //     password: data.get('password'),
  //   }
  //   if (actualData.email && actualData.password) {
  //     const res = await loginUser(actualData)
  //     console.log(res);
  //     if (res.data.status === "success") {
  //       // storeToken(res.data.token)
  //       storeToken(res.data.token)
  //       navigate('/dashboard')
  //     }
  //     if (res.data.status === "failed") {
  //       setError({ status: true, msg: res.data.message, type: 'error' })
  //     }
  //   } else {
  //     setError({ status: true, msg: "All Fields are Required", type: 'error' })
  //   }
  // }

// let token = getToken('token')
//   const dispatch = useDispatch()
//   useEffect(() => {
//     dispatch(setUserToken({ token: token }))
//   }, [token, dispatch])

  return <>
    <Box component='form' noValidate sx={{ mt: 1 }} id='login-form' >
      <TextField margin='normal' required fullWidth id='email' onChange={setVal} name='email' value={inpval.email} label='Email Address' />
      <TextField margin='normal' required fullWidth id='password' onChange={setVal} name='password' value={inpval.password} label='Password' type='password' />
      {error.status ? <Alert severity={error.type} sx={{ mt: 3 }}>{error.msg}</Alert> : ''}
      <NavLink to='/auth/SendPasswordResetEmail' >Forgot Password ?</NavLink>
      <Box textAlign='center'>
        {isLoading ? <CircularProgress /> : <Button type='submit' onClick={login} variant='contained' sx={{ mt: 3, mb: 2, px: 5 }}>Login</Button>}
      </Box>
    </Box>
    {subtitle}
    <ToastContainer position="top-right"/>
  </>;
};

export default AuthLogin;