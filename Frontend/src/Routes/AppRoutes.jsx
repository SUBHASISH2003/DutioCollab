import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Login } from "../Screens/Login";
import { SignUp } from "../Screens/SignUp";
import AuthenticationBox from "../Screens/AuthenticationBox";
import UserContextProvider from "../context/UserContextProvider";
import OtpVerification from "../Screens/OtpVerification";
import ResetPassword from "../Screens/ResetPassword";
import ManagerDashMain from '../Screens/ManagerDashboard/ManagerDashMain'
import EmpDashMain from '../Screens/EmployeeDashBoard/EmpDashMain'
const AppRoutes = () => {
  return (
    <React.StrictMode>
      <UserContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AuthenticationBox />}>
              <Route index element={<SignUp />} />
              <Route path="login" element={<Login />} />
            </Route>
            <Route path="/otpverification" element={<OtpVerification/>}/>
            <Route path="/password/reset" element={<ResetPassword/>}/>
            <Route path="/Manager/dashboard" element={<ManagerDashMain/>}></Route>
            <Route path="/Employee/dashboard" element={<EmpDashMain/>}></Route>
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </React.StrictMode>
  );
};

export default AppRoutes;
