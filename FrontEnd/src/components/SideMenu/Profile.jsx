import React from 'react'

function Profile() {

  function handleLogout() {
    setCurrentUser(null) // set current user to null to clear them out of state
    fetch('./api/logout',{
      method: 'DELETE'
    })
  }


  return (
    
    <div class="px-4 sm:mx-2 w-full py-2.5 mt-3 sm:mt-0 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Profile