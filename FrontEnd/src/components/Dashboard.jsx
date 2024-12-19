import React, {useState, useEffect} from "react";

const Dashboard = () => {


const [currentUser, setCurrentUser] = useState(null) 
  // we'll partially track the signed in user using state


async function check_session() {
  const response = await fetch('./api/check_session')
  if (response.status === 200) {
    const data = await response.json()
    setCurrentUser(data)

  }
  
}

useEffect(()=>{
  check_session()
},[])

if (!currentUser) { // Signup & Login if no currentUser

  return (
      
      <div className="flex-row">

        <SignUp setCurrentUser={setCurrentUser} />

      </div>
  
  )
} else { // UserDetails if currentUser
      
  return (
    
    <div className="bg-gray-100 font-sans p-5">
      {/* Top Row: Profile and preferences */}
      <div className="flex gap-5 mb-5">
            {/* User */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex-1 min-h-[300px]">
          <div className="flex items-center gap-4 mb-4">
            { /* Avatar */ }
            <img src="/src/assets/default_av.png" width={150} height={150} alt="Default Avatar"/>
          </div>
          { /* Username */ }
          <h3 className="text-lg font-semibold">Profile</h3>
          <p className="text-sm text-gray-500 mb-4">Username</p>
          <p className="text-gray-500 font-medium mb-2">Career path:</p>
          <p className="text-gray-500 font-medium mb-2">Commitment time:</p>
          <p className="text-gray-500 font-medium mb-2">Mood</p>

        </div>
      </div>

        {/* Progress Update */}
      <div className="flex gap-5 mb-5">
      <div className="bg-white p-6 rounded-lg shadow-lg flex-1">
        <h3 className="text-lg font-semibold">Progress Update</h3>
        <p className="text-sm text-gray-500 mb-4">Start date - End date</p>
        <p className="text-gray-500 font-medium mb-2">Progression</p>
        <ProgressBar title="Progress 1" value="100" percentage={80} />
        <ProgressBar title="Progress 2" value="100" percentage={40} />
        <ProgressBar title="Progress 3" value="100" percentage={20} />
      </div>

        {/* Goals */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex-1">
          <h3 className="text-lg font-semibold">Goals</h3>
          <p className="text-sm text-gray-500 mb-4">Start date - End date</p>
          <ScheduleCard time="01:00" text="Task 1" />
          <ScheduleCard time="10:30" text="Task 2" />
        </div>
      </div>

      {/* Bottom Row */}
      <div className="flex gap-5">
        {/* Bottom Row: Calendar */}
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm flex-1">
          <h3 className="text-lg font-semibold mb-4">Calendar</h3>
          <div className="h-32 bg-gray-200 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Calendar Placeholder</p>
          </div>
        </div>

        {/* Bottom Row: AI Guide */}
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm flex-1">
          <h3 className="text-lg font-semibold mb-4">AI Guide</h3>
          <div className="h-32 bg-gray-200 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">AI Guide Placeholder</p>
          </div>
        </div>
      </div>

        {/* Alert Button */}
      <div className="relative min-h-screen bg-gray-100">
        <button className="absolute top-5 right-5 bg-red-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:bg-red-600 focus:outline-none"
    onClick={() => alert('This is an alert!')}>Alert</button>
      </div>

    </div>
  );
};


      {/* Variables */}
      
    }
    
    
    
    
    const ProgressBar = ({ title, value, percentage }) => (
      <div className="mb-4">
        <p className="text-sm font-medium mb-1">
          {title} - {value}
        </p>
        <div className="w-full bg-gray-300 rounded-full h-2">
          <div
            className="h-2 bg-blue-500 rounded-full"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    );
    
    const ScheduleCard = ({ time, text }) => (
      <div className="bg-red-50 p-3 rounded-lg mb-2">
        <span className="text-sm text-red-500 font-semibold">{time}</span>
        <p className="text-sm text-gray-600">{text}</p>
      </div>
    );
    
    export default Dashboard;
    