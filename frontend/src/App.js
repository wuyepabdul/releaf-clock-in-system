import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import UserListScreen from "./screens/UserListScreen/UserListScreen";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {}, [userInfo]);

  return (
    <BrowserRouter>
      <Header />
      <ToastContainer />
      <Routes>
        {userInfo && <>
          <Route
          exact
          path="/"
          element={ <HomeScreen /> }
        />
        <Route exact path="/profile" element={<ProfileScreen />} />
        <Route exact path="/staff/list" element={<UserListScreen />} />

        </>}
        
        <Route exact path="/login" element={<LoginScreen />} />
        <Route exact path="/register" element={<RegisterScreen />} />
        
        <Route path='*' element={<Navigate to={userInfo ? '/' : 'login' } />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
