import React from "react";
import Profile from "./Profile";
import SideMenu from "./SideMenu";
import DB from "./DB.JSX";
import Calendar from "./dashboard/Calendar";
import ProgressUpdate from "./dashboard/ProgressUpdate";

const Dashboard = () => {
  return (
    
    <div className="bg-gray-100 font-sans p-5">
      <SideMenu />
      <ProgressUpdate/>
      <DB/>
      <Profile  />
      <Calendar/>
     
    </div>
  );
};


export default Dashboard;
