
import React, {useState, useEffect} from "react";
import App, { UserContext } from './App'
import {useContext} from 'react'
import Profile from "./Profile";
import SideMenu from "./SideMenu";
import Calendar from "./dashboard/Calendar";
import ProgressUpdate from "./dashboard/ProgressUpdate";
import Goal from "./dashboard/Goal";
import AiBot from "./dashboard/AiBot"
import AlertButton from "./dashboard/AlertButton"
import DB from "./DB";

const Dashboard = () => {


  const { currentUser, setCurrentUser } = useContext(UserContext);
  // we'll partially track the signed in user using state

if (!currentUser) { // Signup & Login if no currentUser

  return (
      
      <div className="flex-row">

        <App />

      </div>
  
  )
} else { // UserDetails if currentUser
      
  return (
    
    <div className="bg-gray-100 font-sans p-5 min-h-screen">
      {/* Main Container */}
      <div className="flex flex-row gap-6">
        {/* Sidebar */}
        <div className="w-1/4">
          <SideMenu />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col gap-6">
        <Profile />
          {/* Top Row */}
          <div className="flex flex-row gap-6">
          <div className="flex-1">
              <ProgressUpdate />
            </div>
            <div className="flex-1">
              <Goal />
            </div>
          </div>
      {/* <AlertButton /> */}
           
          <div className="flex flex-row gap-6">
            <Calendar className="flex-1" />
             <AiBot className="flex-1" />
          </div>

          <DB />
          <div>
          </div>
        </div>
      </div>
    </div>
  );
};
}
export default Dashboard;

