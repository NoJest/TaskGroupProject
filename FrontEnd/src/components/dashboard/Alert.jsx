import React from 'react'

function Alert() {
  return (
    <div> 
    <div className="relative min-h-screen bg-gray-100">
    <button className="absolute top-5 right-5 bg-red-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:bg-red-600 focus:outline-none"
onClick={() => alert('This is an alert!')}>Alert</button>
  </div>
  </div>
  )
}

export default Alert