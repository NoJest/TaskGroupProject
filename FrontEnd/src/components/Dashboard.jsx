import React, {useState, useEffect} from "react";
import App, { UserContext } from './App'
import {useContext} from 'react'


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
    
    // add Joyce data Here when merging
  )

}
}
    export default Dashboard;
    
