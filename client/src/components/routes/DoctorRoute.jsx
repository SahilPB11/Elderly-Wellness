import { useState, useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";
import Spinner from "./Spinner";
import { UserContext } from "../../../context/UserContext";

export default function DoctorRoute() {
  const [ok, setOk] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    // Check if the user type is Doctor
    if (user && user.type === "doctor") {
      setOk(true); // Set ok to true to render the Outlet
    } else {
      setOk(false); // Set ok to false to display the Spinner or handle differently based on your requirement
    }
  }, [user]); // Re-run the effect when the user object changes

  return ok ? <Outlet /> : <Spinner path="" />;
}
