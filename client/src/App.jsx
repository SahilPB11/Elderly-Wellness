import React from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
const App = () => {
  axios.defaults.baseURL = import.meta.env.VITE_APP_SERVER_URL;
  axios.defaults.withCredentials = true;
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="dashBoard" >
          
        </Route>
        <Route path="dashBoard" >

        </Route>
      </Routes>
    </>
  );
};

export default App;
