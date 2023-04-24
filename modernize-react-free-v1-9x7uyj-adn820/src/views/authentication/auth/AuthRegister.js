// import { TextField, FormControlLabel, Checkbox, Button, Box, Alert } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from 'src/services/userAuthApi';
import { TextField, Button, Box, Alert } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { storeToken } from 'src/services/LocalStorageService';
import 'react-toastify/dist/ReactToastify.css';
// import { getToken }

const AuthRegister = ({ subtitle }) => {
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: ""
  })


  const [inpval, setInpval] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  });

  // console.log("value",inpval);

  const setVal = (e) => {
    // console.log(e.target.value);

    const { name, value } = e.target;

    setInpval(() => {
      return {
        ...inpval,
        [name]: value
      }
    })
  }

  const navigate = useNavigate();
  const [registerUser] = useRegisterUserMutation()

  const addUser = async (e) => {
    e.preventDefault();


    const { name, email, password, password_confirmation } = inpval;

    if (name === "") {
      toast.error("Name is Required !")
    }
    else if (email === "") {
      toast.error("Email is Required !")
    }
    else if (!email.includes("@")) {
      toast.error("Valid email is Required !")
    }
    else if (password === "") {
      toast.error("Password is Required !")
    }
    else if (password.length < 6) {
      toast.error("Password must 6 word is Required !")
    }
    else if (password_confirmation === "") {
      toast.error("Confirm Password is Required !")
    }
    else if (password_confirmation.length < 6) {
      toast.error("Confirm Password must 6 word is Required !")
    }
    else if (password !== password_confirmation) {
      toast.error("Password and Confirm Password is Not Match !")
    }
    else {
      // console.log("User Registartion successfully done..");

      const data = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          name, email, password, password_confirmation
        })
      });

      const res = await data.json();
      console.log("res", res);

      if (res.status == 201) {
        navigate("/auth/login")
        // alert("user registration");
        setInpval({ ...inpval, name: "", email: "", password: "", password_confirmation: "" });
      }
    }


  }


  // const handleSubmit = async  (e) => {
  //   e.preventDefault();
  //   const data = new FormData(e.currentTarget);
  //   const actualData = {
  //     name: data.get('name'),
  //     email: data.get('email'),
  //     password: data.get('password'),
  //     password_confirmation: data.get('password_confirmation'),
  //   }
  //   if (actualData.name && actualData.email && actualData.password && actualData.password_confirmation) {
  //       if (actualData.password === actualData.password_confirmation) {
  //           const res = await registerUser(actualData)
  //           console.log(res)
  //           if (res.data.status === "success") {
  //               storeToken(res.data.token)
  //               navigate('/dashboard')  
  //           // alert("hyy")
  //           }
  //           if (res.data.status === "failed") {
  //             setError({ status: true, msg: res.data.message, type: 'error' })
  //           }
  //         } else {
  //           setError({ status: true, msg: "Password and Confirm Password Doesn't Match", type: 'error' })
  //         }
  //       } else {
  //         setError({ status: true, msg: "All Fields are Required", type: 'error' })
  //       }
  // }
  return <>
    <Box component='form' id='registration-form'>
      <TextField margin='normal' fullWidth id='name' onChange={setVal} value={inpval.name} name='name' label='Name' />
      <TextField margin='normal' fullWidth id='email' onChange={setVal} value={inpval.email} name='email' label='Email Address' />
      <TextField margin='normal' fullWidth id='password' onChange={setVal} value={inpval.password} name='password' label='Password' type='password' />
      <TextField margin='normal' fullWidth id='password_confirmation' onChange={setVal} value={inpval.password_confirmation} name='password_confirmation' label='Confirm Password' type='password' />
      {/* {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''} */}
      <Box textAlign='center'>
        <Button type='submit' onClick={addUser} variant='contained' sx={{ mt: 3, mb: 2, px: 5 }}>Join</Button>
      </Box>
    </Box>
    {subtitle}
    <ToastContainer position="top-right" />
  </>;
};

export default AuthRegister;