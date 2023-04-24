import React, { useContext } from 'react';
import PageContainer from 'src/components/container/PageContainer';

// components
import SalesOverview from './components/SalesOverview';
import YearlyBreakup from './components/YearlyBreakup';
import RecentTransactions from './components/RecentTransactions';
import ProductPerformance from './components/ProductPerformance';
import Blog from './components/Blog';
import MonthlyEarnings from './components/MonthlyEarnings';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, CssBaseline,Grid, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getToken,removeToken  } from 'src/services/LocalStorageService';
import { useGetLoggedUserQuery } from 'src/services/userAuthApi';
import { unsetUserInfo,setUserInfo } from 'src/features/userSlice';
import { unsetUserToken } from 'src/features/authSlice';
import { LoginContext } from 'src/components/context/ContextProvider';


const Dashboard = () => {
  const navigate = useNavigate()
  

  const token = getToken()
  const { data, isSuccess } = useGetLoggedUserQuery(token)

  const [userData, setUserData] = useState({
    email: "",
    name: ""
  })

  const  {logindata,setLoginData} = useContext(LoginContext)
  // console.log(logindata.ValidUserOne);

  const logoutUser = async() =>{

    let token = localStorage.getItem("usersdatatoken");
    console.log("token",token);

    const res = await fetch("http://localhost:8000/logout", {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          "Authorization": token,
          Accept: "application/json"
      },
      credentials: "include"
  });

  const data = await res.json();
  // console.log("data",data);

  if (data.status !== 201) {
    // navigate("*");
    console.log("error");
} else {
    console.log("user logout");
    localStorage.removeItem("usersdatatoken");
    setLoginData(false)
    navigate("/dashboard");
}


  }

  const DashboardValid = async() =>{
    let token = localStorage.getItem("usersdatatoken");
    // console.log("token",token);

    const res = await fetch("http://localhost:8000/validuser", {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          "Authorization": token
      }
  });

  const data = await res.json();
  // console.log("data",data);

  if (data.status == 401 || !data) {
    navigate("/auth/login");
} else {
    console.log("user verify");
    setLoginData(data)
    navigate("/dashboard");
}
  }

  useEffect(()=>{
    DashboardValid();
  },[])

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid container>
            <Grid item sm={4}>
              <h1>Dashboard</h1>
              <Typography variant='h5'>Email:{logindata ? logindata.ValidUserOne.email : ""}</Typography>
              <Typography variant='h6'>Name: {logindata ? logindata.ValidUserOne.name : ""}</Typography>
            </Grid>
          </Grid>
          {/* <Grid item xs={12} lg={8}>
            <SalesOverview />
          </Grid> */}
          {/* <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <YearlyBreakup />
              </Grid>
              <Grid item xs={12}>
                <MonthlyEarnings />
              </Grid>
            </Grid>
          </Grid> */}
          {/* <Grid item xs={12} lg={4}>
            <RecentTransactions />
          </Grid> */}
          {/* <Grid item xs={12} lg={8}>
            <ProductPerformance />
          </Grid> */}
          <Grid item xs={12}>
            <Blog />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
