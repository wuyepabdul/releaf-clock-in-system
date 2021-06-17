import React from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";

import HomePage from "./screens/HomePage";
import Header from "./components/nav/Header";
import Login from "./screens/auth/Login";
import Register from "./screens/auth/Register";

const App = () => {
  return (
    <>
      <Header />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />{" "}
      <Toaster />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/" component={HomePage} />
        <Route exact path="/" component={HomePage} />
      </Switch>
    </>
  );
};

export default App;
