import React from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import DocterRoute from "./components/routes/DoctorRoute";
import PatientRoute from "./components/routes/PatientRoute";
import DoctorHome from "./pages/Doctor/DoctorHome";
const App = () => {
  axios.defaults.baseURL = import.meta.env.VITE_APP_SERVER_URL;
  axios.defaults.withCredentials = true;
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/dashBoard" element={<DocterRoute />}>
          <Route path="/home" element={<DoctorHome />} />
        </Route>
        <Route path="/dashBoard" element={<PatientRoute />}>

        </Route>
      </Routes>
    </>
  );
};

export default App;
