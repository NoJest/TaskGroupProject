import React, {useContext} from 'react'
import avatar4 from '../assets/avatar4.png'
import { UserContext } from './App'



function Profile() {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  function handleLogout() {
    setCurrentUser(null) // set current user to null to clear them out of state
    fetch('./api/logout',{
      method: 'DELETE'
    })
  }

  return (
    <div className="absolute top-4 left-60 ransform -translate-x-1/2 z-5 flex justify-center items-start w-full px-4">
  <div className="gap-5 mt-5 max-w-lg">
    {/* User */}
    <div className="bg-white/30 p-6 rounded-lg shadow-lg flex-1 min-h-[700px]">
      <div className="flex items-center gap-4 mb-4">
        {/* Avatar */}
        <div className="flex items-center gap-x-2">
          <img
            className="object-cover w-12 h-12 rounded-full"
            src={avatar4}
            alt="avt"
          />
          <div>
            <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">Sebas Fenelon</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">miajohn@merakiui.com</p>
          </div>
        </div>
      </div>
      {/* Username */}
      <h3 className="text-lg font-semibold">Profile</h3>
      <p className="text-sm text-gray-500 mb-4">Username</p>
      <p className="text-gray-500 font-medium mb-2">Career path:</p>
      <p className="text-gray-500 font-medium mb-2">Commitment time:</p>
      <p className="text-gray-500 font-medium mb-2">Mood:</p>

      <div className="px-4 py-2.5 w-36 mt-5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  </div>
</div>

  )
}

export default Profile