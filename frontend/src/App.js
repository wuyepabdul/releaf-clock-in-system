import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import UserListScreen from "./screens/UserListScreen/UserListScreen";
import UserRoute from "./components/Routes/UserRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <ToastContainer />
      <main>
        <UserRoute exact path="/" component={HomeScreen} />
        <Route exact path="/login" component={LoginScreen} />
        <Route exact path="/register" component={RegisterScreen} />
        <UserRoute exact path="/profile" component={ProfileScreen} />
        <UserRoute exact path="/staff/list" component={UserListScreen} />
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
