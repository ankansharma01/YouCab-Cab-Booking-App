import React from "react";
import { Routes, Route } from "react-router-dom";
import UserLogin from "./pages/UserLogin";
import UserLogout from "./pages/UserLogout";
import Home from "./pages/Home";
import UserSignup from "./pages/UserSignUp";
import CaptainSignup from "./pages/CaptainSignUp";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainHome from "./pages/CaptainHome";
import UserProtectedWrapper from "./pages/UserProtectedWrapper";
import CaptainProtectedWrapper from "./pages/CaptainProtectedWrapper";
import Start from "./pages/Start";
import CaptainLogout from "./pages/CaptainLogout";
import Riding from "./pages/Riding";
import CaptainRiding from "./pages/CaptainRiding";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route path="/riding" element={<Riding />} />
        <Route path="/captain-riding" element={<CaptainRiding />} />

        <Route
          path="/home"
          element={
            <UserProtectedWrapper>
              <Home />
            </UserProtectedWrapper>
          }
        />
        <Route
          path="/user/logout"
          element={
            <UserProtectedWrapper>
              <UserLogout />
            </UserProtectedWrapper>
          }
        />
        <Route
          path="/captain-home"
          element={
            <CaptainProtectedWrapper>
              <CaptainHome />
            </CaptainProtectedWrapper>
          }
        />
        <Route
          path="/captain/logout"
          element={
            <CaptainProtectedWrapper>
              <CaptainLogout />
            </CaptainProtectedWrapper>
          }
        />
      </Routes>
    </div>
  );
};

export default App;