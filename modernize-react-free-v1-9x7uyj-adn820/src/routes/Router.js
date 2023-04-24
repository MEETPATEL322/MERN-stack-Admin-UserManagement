import React, { lazy } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';

// import { useSelector } from 'react-redux';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const Dashboard = Loadable(lazy(() => import('../views/dashboard/Dashboard')))
const SamplePage = Loadable(lazy(() => import('../views/sample-page/SamplePage')))
const Icons = Loadable(lazy(() => import('../views/icons/Icons')))
const TypographyPage = Loadable(lazy(() => import('../views/utilities/TypographyPage')))
const Shadow = Loadable(lazy(() => import('../views/utilities/Shadow')))
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Register = Loadable(lazy(() => import('../views/authentication/Register')));
const Login = Loadable(lazy(() => import('../views/authentication/Login')));
const SendResetPassword = Loadable(lazy(()=> import('../views/authentication/SendPasswordResetEmail')))
const ResetPassword = Loadable(lazy(()=>import('../views/authentication/Resetpassword')))
const ChangePassword = Loadable(lazy(()=>import('../views/authentication/Changepassword')))
const AddData = Loadable(lazy(()=>import('../views/User/AddData')))
const Editdata = Loadable(lazy(()=>import('../views/User/EditData')))
const List = Loadable(lazy(()=> import('../views/User/ListData')))
const ReadData = Loadable(lazy(()=> import('../views/User/ReadData')))


// const { token } = useSelector(state=>state.auth)
const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/dashboard" /> },
      { path: '/dashboard', exact: true, element: <Dashboard /> },
      { path: '/sample-page', exact: true, element: <SamplePage /> },
      { path: '/Changepassword', element: <ChangePassword /> },
      { path: '/icons', exact: true, element: <Icons /> },
      { path: '/ui/typography', exact: true, element: <TypographyPage /> },
      { path: '/ui/shadow', exact: true, element: <Shadow /> },
      { path: '/Add', exact: true, element: <AddData /> },
      { path: '/Edit/:id', exact: true, element: <Editdata /> },
      { path: '/List', exact: true, element: <List /> },
      { path: '/Read/:id', exact: true, element: <ReadData /> },
      { path: '/Read', exact: true, element: <ReadData /> },

      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      { path: '/auth/register', element: <Register /> },
      { path: '/auth/login', element: <Login /> },
      { path: '/auth/SendPasswordResetEmail', element: <SendResetPassword /> },
      { path: '/auth/ResetPassword/:id/:token', element: <ResetPassword /> },
      

      
      // <Route path="api/user/reset/:id/:token" element={<ResetPassword />} />

      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
