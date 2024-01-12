import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import UserInfoCard from "../../components/UserInfoCard";
import HealthDataForm from "../../components/Patient/HealthDataForm";
import { UserContext } from "../../../context/UserContext";
import HealthDataSlider from "../../components/Doctor/HealthDataSlider";
import axios from "axios";

const PatientHome = () => {
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState([]);

  async function getAll() {
    try {
      const res = await axios.get(`/patient/getpatient/${user?._id}`);
      setUserData(res?.data?.user);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAll();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="md:col-span-2 lg:col-span-2">
            <UserInfoCard user={userData} show={false} />
          </div>

          <div className="md:col-span-1 lg:col-span-1">
            <HealthDataSlider id={user?._id} />
          </div>
        </div>
        <div className="mt-8">
          <HealthDataForm userId={user?._id} className="w-full" />{" "}
        </div>
      </div>
    </div>
  );
};

export default PatientHome;
